# 74% better Hindi for IBM Granite 4.1 on a Laptop GPU

I've been on a bit of a small-model kick lately. Between the OpenAI Parameter Golf challenge and building browser agents with sub-1B models, I've developed a mild obsession with squeezing everything possible out of tiny GPUs. So when IBM dropped [Granite 4.1 3B model](https://huggingface.co/ibm-granite/granite-4.1-3b) with genuinely good multilingual pretraining - I had one question: can I make it speak Hindi on my RTX 3070 Laptop?

> Spoiler: yes. But the road there involved two CUDA OOMs, one broken checkpoint resume, a GGUF export that refused to build, and a lot of `nvidia-smi` staring.

## The Setup

Here's what I was working with:
- **GPU**: NVIDIA RTX 3070 Laptop (8 GB VRAM)
- **Base model**: `ibm-granite/granite-4.1-3b` (3.5B params, Apache 2.0). [Link](https://huggingface.co/ibm-granite/granite-4.1-3b)
- **Dataset**: `FreedomIntelligence/evol-instruct-hindi` — ~59K Hindi instruction samples in ShareGPT format. [Link](https://huggingface.co/datasets/FreedomIntelligence/evol-instruct-hindi)
- **Method**: QLoRA (4-bit NF4 quantization + LoRA adapters)
- **Framework**: Unsloth + SFTTrainer (TRL)

The constraint was hard: 8 GB VRAM. 

## Attempt #1: CUDA Go Brrr

I started with what felt like conservative hyperparams:

```python
max_seq_length = 1024
per_device_train_batch_size = 2
lora_r = 16, lora_alpha = 32
```

CUDA laughed at me. OOM within seconds.

Full fine-tuning a 3B model needs ~25 GB VRAM in fp16. Even with 4-bit QLoRA, the math isn't free - activations, optimizer states, and gradients all want their share. The 1024-token context length was the biggest memory hog; attention scales quadratically.

## The VRAM Tetris

Here's what actually worked after three rounds of tuning:

| Parameter | Initial (OOM) | Final (Stable) |
| --- | --- | --- |
| max_seq_length | 1024 | **512** |
| per_device_batch | 2 | **1** |
| gradient_accumulation | 4 | **8** |
| LoRA rank (r) | 16 | **8** |
| LoRA alpha | 32 | **16** |
| Peak VRAM | 💥 | ~5.8 GB |

Effective batch size stayed at 8. The other tricks that helped:
- `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True` - prevented fragmentation OOMs
- `gradient_checkpointing=True` - traded compute for memory
- `optim="adamw_8bit"` — 8-bit optimizer states
- Disabled `torch.compile` — saved 1-2 GB and avoided some Unsloth compatibility issues

Here's the final training config:

```python
from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="ibm-granite/granite-4.1-3b",
    max_seq_length=512
)

model = FastLanguageModel.get_peft_model(
    model,
    r=8, lora_alpha=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    use_gradient_checkpointing="unsloth",
)
```

## Why 400 steps? Why not 500?

First real training run: 400 steps, loss dropped from **1.28 → 0.53**. Nice curve, no divergence. I ran perplexity eval on a held-out Hindi set:

| Metric | Base Granite 4.1 | Fine-Tuned |
| --- | --- | --- |
| Perplexity | 7.30 | **1.85** |
| Training Loss | 1.28 | **0.53** |

74.7% reduction in perplexity. The model was actually generating coherent Hindi and answering factual questions, writing poetry, explaining Python loops. It retained its English and code abilities too, which is the whole point of LoRA.

I figured: *let's push it to 500 steps, see if we can squeeze out a bit more.*

So I tried to resume from the checkpoint. And hit this gem:

> RuntimeError: torch.load with weights_only=True requires torch 2.6+

Transformers 5.5 introduced a security fix that broke checkpoint loading on my PyTorch 2.5 install. The checkpoint was perfectly valid -  I just couldn't load it without upgrading half my stack, which would have likely broken Unsloth's compiled kernels.

Fine. Restart from scratch with `--max_steps 500`.

The second run followed almost the exact same loss curve. By step 400, loss was at ~0.57. By step 500, it plateaued at **0.56**. The model had saturated - pushing further wouldn't have helped.

## What Failed (And Why It's Fine)

### GGUF Export

Unsloth's `model.save_pretrained_gguf()` needs to compile llama.cpp from source. That needs `libssl-dev`, `libcurl4-openssl-dev`, and a bunch of other `-dev` packages. My environment didn't have sudo. I could've set up a Docker container or used a cloud VM, but honestly, the merged 16-bit safetensors model works perfectly with Transformers and loads in 4-bit with bitsandbytes. The GGUF would've been nice for Ollama/llama.cpp, but it wasn't blocking anything.

### 8B Model: Not Happening

I briefly considered trying the same recipe on Granite 8B. The math: even with 4-bit QLoRA at `seq_len=512`, it'd push ~10.5 GB VRAM. My 8 GB card said no. That's a cloud GPU job for another day.

### torch.compile

Unsloth + torch.compile had some weird interactions on my CUDA 12.1 setup. Disabling it was simpler and only cost a few percentage points of throughput. On an 8 GB card doing QLoRA, you're bottlenecked by memory bandwidth anyway, not compilation overhead.

## What Actually Worked

### Unsloth ✨

**Unsloth is genuinely magic.** It handled all the 4-bit loading, LoRA patching, and gradient checkpointing with a couple lines of code. The `FastLanguageModel.get_peft_model()` call auto-detects the architecture and sets up efficient kernels. Training throughput was ~0.6 samples/second, which got me through 500 steps in about 1.8 hours.

### Dataset choice

**The dataset matters more than hyperparams.** `FreedomIntelligence/evol-instruct-hindi` has 59K diverse instructions - factual QA, creative writing, code explanation, translation. The diversity meant the model learned Hindi *generation* rather than just Hindi *memorization*. I tried a smaller dataset initially and got word-salad output.

## Wandb 💛

**W&B tracking saved my sanity.** I logged every 5 steps with `report_to="wandb"`. Being able to watch the loss curve in real-time (and notice it plateauing at step 400) meant I didn't waste hours training a saturated model.

## The Model in Practice

After merging the LoRA adapter into the base model, I uploaded it to HuggingFace at [https://huggingface.co/xprilion/granite-4.1-3b-hindi-lora](https://huggingface.co/xprilion/granite-4.1-3b-hindi-lora). Loading it is straightforward:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained(
    "xprilion/granite-4.1-3b-hindi-lora",
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained("xprilion/granite-4.1-3b-hindi-lora")

prompt = "मुझे पायथन में फॉर लूप समझाओ"
inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=1000, temperature=0.7)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

Qualitatively, it handles:
- Factual QA: "भारत की राजधानी क्या है?" → correct, natural Hindi
- Code explanation: Explains Python concepts in Hindi with code examples
- Creative writing: Generates poetry, stories in Hindi
- English retention: Still answers English prompts correctly

It's not perfect. Complex multi-turn reasoning can drift, and very domain-specific Hindi (legal, medical) sometimes produces mixed-language output. But for a 3B model trained in under 2 hours on a laptop GPU? I'll take it.

## Conclusion

Turns out your humble 8GB laptop GPU isn’t useless - it just has a very strong personality and demands compromises. With the right tricks, you can absolutely teach an old monkey a few new tricks 3B model new languages… just don’t expect it to handle too many tokens.. In the end, it’s less “brute force AI” and more “carefully negotiated truce with VRAM.”

---

The model is up on HuggingFace if you want to try it: [https://huggingface.co/xprilion/granite-4.1-3b-hindi-lora](https://huggingface.co/xprilion/granite-4.1-3b-hindi-lora).

Colab notebook - [https://xpri.dev/6cti](https://xpri.dev/6cti)