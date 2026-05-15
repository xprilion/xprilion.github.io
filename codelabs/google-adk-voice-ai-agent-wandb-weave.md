# Google ADK Voice AI Agent

## Overview

Duration: 1

Hey there! This codelab walks you through building a voice AI agent end-to-end with Google's Agent Development Kit (ADK). Also, the repository introduces you to Weights & Biases Weave and Weave Inference.

## Requirements

Duration: 2

In order to follow this codelab, you'll need the following:
- A [Google Gemini API Key](https://aistudio.google.com/apikey).
- A [Weights & Biases API Key](https://wandb.ai/authorize).
- (Optional) [Astral UV](https://docs.astral.sh/uv/) installed locally, to run pip installs faster. If not, just remove `uv` from the `uv pip` commands.
- (Optional) Nodejs installed locally, to run the UI.

## Setup

Duration: 5

Let's setup our repository for the day.

We'll be working with this repository - [https://github.com/wandb/voice-ai-agent-workshop](https://github.com/wandb/voice-ai-agent-workshop)

Clone it using:

```bash
git clone git@github.com:wandb/voice-ai-agent-workshop.git
```

There are 3 folders inside this repo - 
- ui
- api
- hello-world

Let's begin with the `hello-world` folder!

## Hello World

Duration: 10

Let's get inside this folder with:

```bash
cd hello-world
```

The remaining commands and instructions for this section are within this folder.

The two important files in this folder are - 
- main.py
- chat_agent/agent.py

### main.py

This file is mainly a setup of a Google ADK supported FastAPI server. You can observe that it starts a FastAPI server at localhost with port 8080.

### chat_agent/agent.py

This file is the meat of this folder. Let's break it down.

```python
import base64
import os
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk import trace as trace_sdk
from opentelemetry.sdk.trace.export import SimpleSpanProcessor
from opentelemetry import trace

from google.adk.agents import LlmAgent
from google.adk.models.lite_llm import LiteLlm
from dotenv import load_dotenv

load_dotenv()

```

These lines just import the required packages for this script.

Notice that, we import the following - OpenTelemetry, Google ADK and a helper for working with `.env` files.

The next block of code deals with configuration constants for OpenTelemetry connection to W&B Weave.

```python
# Configure Weave endpoint and authentication
WANDB_BASE_URL = "https://trace.wandb.ai"
PROJECT_ID = "wandb/hydpy-agent-test"  # e.g., "myteam/myproject"
OTEL_EXPORTER_OTLP_ENDPOINT = f"{WANDB_BASE_URL}/otel/v1/traces"

# Set up authentication
WANDB_API_KEY = os.getenv("WANDB_API_KEY")
AUTH = base64.b64encode(f"api:{WANDB_API_KEY}".encode()).decode()
```

Then, we setup the usage of those constants

```python
OTEL_EXPORTER_OTLP_HEADERS = {
    "Authorization": f"Basic {AUTH}",
    "project_id": PROJECT_ID,
}

# Create the OTLP span exporter with endpoint and headers
exporter = OTLPSpanExporter(
    endpoint=OTEL_EXPORTER_OTLP_ENDPOINT,
    headers=OTEL_EXPORTER_OTLP_HEADERS,
)
```

Atfer that, we setup the code to use the configuration

```python
# Create a tracer provider and add the exporter
tracer_provider = trace_sdk.TracerProvider()
tracer_provider.add_span_processor(SimpleSpanProcessor(exporter))

# Set the global tracer provider BEFORE importing/using ADK
trace.set_tracer_provider(tracer_provider)
```

And finally, we create the ADK Agent in this block

```python
# Create an LLM agent
root_agent = LlmAgent(
    name="chatai_agent",
    model=LiteLlm(model="openai/openai/gpt-oss-20b"),
    instruction=(
        "You are a helpful agent who can chat with the user."
    ),
    tools=[],
)
```

Notice the `LiteLlm(model="openai/openai/gpt-oss-20b")` line. This line instructs the ADK agent to use a custom LiteLLM OpenAI compatible endpoint with model name `openai/gpt-oss-20b`. You can explore the full list of available models on Weave Inference here - [https://wandb.ai/inference](https://wandb.ai/inference)

We're now ready to run the agent!

On a terminal, let's setup to run this file. First, we install the required packages.

```bash
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
```

But before we run the agent, we need to setup the environment file at `.env`: 

```text
# in .env file
OPENAI_API_BASE=https://api.inference.wandb.ai/v1
OPENAI_API_KEY="YOUR_WANDB_KEY_HERE"

WANDB_API_KEY="YOUR_WANDB_KEY_HERE"
```

You could choose to modify the code to avoid the duplicated `YOUR_WANDB_KEY_HERE` setup, but we set it twice for sake of clarity, in case you jump ship later. 

And then the command to bring up the dev ui of Google ADK

```bash
adk web
```

This should bring up the following UI at `http://localhost:8000`: 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/09/Screenshot-2025-09-20-at-10.49.24---AM.png)
You can start chatting with the agent right away!

## Voice AI Agent API

Duration: 10

Now, let's take a look at the `api` folder in our repo root.

```bash
cd api
```

Here, the packages installation and env setup are very similar. Run the following:

```bash
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
```

However, in this example, we're using Google's Gemini as the model. Let's set the `.env` file:

```text
# in .env file:
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
GOOGLE_GENAI_USE_VERTEXAI=false
```

Before we jump into the files, let's run this server.

```bash
uvicorn main:app --reload
```

This will make the server start listening for connections at `http://localhost:8000`. 

If you do not wish to understand what's going on inside these files, you can skip to the next section here. For the brave of heart, onwards!

There are mainly 2 files of importance in this folder.
- main.py
- google_search_agent/agent.py 

Let's dive into them!

### main.py

This file is critical, and will often be the one you're editing. 

This file is essentially a **FastAPI-based server** that connects clients (like browsers or apps) to a **Gemini-powered agent** through **streaming communication**. It lets a client open a **server-sent events (SSE)** channel to receive responses (text/audio) from the agent in real time, and also provides an endpoint to send messages back to the agent. Let’s go through it block by block.

### Imports

```python
import os, json, base64, warnings
from pathlib import Path
from dotenv import load_dotenv

```
- Standard modules for filesystem, encoding, warnings.
- `load_dotenv()` reads `.env` files so we can load API keys into environment variables.

```python
from google.genai.types import (Part, Content, Blob)
from google.adk.runners import InMemoryRunner
from google.adk.agents import LiveRequestQueue
from google.adk.agents.run_config import RunConfig
from google.genai import types

```
- These are from Google’s **ADK (Agent Development Kit)** and **GenAI** SDK.`Part` and `Content`: Represent pieces of a conversation (text, audio, etc.).
- `Blob`: For raw binary data (e.g., audio PCM).
- `InMemoryRunner`: Runs an agent in memory (no persistence).
- `LiveRequestQueue`: Manages a queue of incoming client messages for a live session.
- `RunConfig`: Configures the run (text vs audio).

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

```
- Sets up a **FastAPI app** with CORS enabled, JSON endpoints, and streaming responses.

```python
from google_search_agent.agent import root_agent

```
- Imports a prebuilt agent definition called `root_agent`. This is the AI brain.

```python
warnings.filterwarnings("ignore", category=UserWarning, module="pydantic")

```
- Suppresses pydantic warnings to avoid console noise.

---

### Config and App Name

```python
load_dotenv()
APP_NAME = "ADK Streaming example"

```
- Loads Gemini API key from `.env`.
- Defines a name for this app.

---

### Function: start_agent_session

```python
async def start_agent_session(user_id, is_audio=False):

```
- Starts a new agent session for a user.

Inside:
- Creates a runner (`InMemoryRunner`) with the agent.
- Starts a session tied to that user ID.
- Chooses the modality: `"TEXT"` or `"AUDIO"`.
- Configures it with `RunConfig`.
- Creates a `LiveRequestQueue` for streaming messages from client → agent.
- Runs the agent live (`runner.run_live`) which returns:`live_events`: async stream of events from agent.
- `live_request_queue`: the handle to send new client messages.

This function returns both, so the server can bridge them to the client.

---

### Function: agent_to_client_sse

```python
async def agent_to_client_sse(live_events):

```
- Translates agent events into **Server-Sent Events (SSE)** for the client.

Inside loop:
- If the event is **turn_complete** or **interrupted**, send a simple status message.
- Otherwise, extract the first `Part` of the content:If it’s audio (`audio/pcm`), base64 encode the raw audio and stream it out.
- If it’s partial text, send it chunk by chunk.

This ensures the client gets **real-time streaming** of text or audio.

---

### FastAPI App Setup

```python
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], ...)
active_sessions = {}

```
- Creates FastAPI app, enables CORS for all origins.
- Maintains `active_sessions` dict: maps `user_id` → `LiveRequestQueue`.

---

### Health Check Endpoint

```python
@app.get("/")
async def root():
    return JSONResponse({"status": "ok", "name": APP_NAME})

```
- Simple API health/status check.

---

### SSE Endpoint

```python
@app.get("/events/{user_id}")
async def sse_endpoint(user_id: int, is_audio: str = "false"):

```
- Opens an SSE connection for a client.

Steps:
- Calls `start_agent_session` to get `live_events` + `live_request_queue`.
- Stores queue in `active_sessions`.
- Defines cleanup to remove session when client disconnects.
- Defines `event_generator` which forwards events from `agent_to_client_sse`.
- Returns a **StreamingResponse** with `text/event-stream` headers → SSE.

This is how the agent’s responses stream into the browser.

---

### Send Message Endpoint

```python
@app.post("/send/{user_id}")
async def send_message_endpoint(user_id: int, request: Request):

```
- Lets client send text/audio back to the agent.

Steps:
- Looks up the session’s `LiveRequestQueue` from `active_sessions`.
- Reads incoming JSON: `{ mime_type, data }`.
- If it’s text → wrap in `Content` + `Part` → send to agent.
- If it’s audio PCM → decode base64 → send as `Blob`.
- Otherwise → error if unsupported mime type.

This makes it a **two-way bridge**:
- `/events/{user_id}` streams **agent → client**.
- `/send/{user_id}` sends **client → agent**.

### google_search_agent/agent.py

In this file we're simply setting up the Google ADK agent, and you'll be familiar with how this goes if you studied the `hello-world` section above.

In case you did, it defines a Google ADK agent to run with name `google_search_agent` and uses Google's Gemini API. It has a `google_search` tool with it, so it can provide latest answers by searching the web.

## UI

Duration: 5

Now, we're good to run the UI. On a new terminal (leave the `api` server running) switch to this folder:

```bash
cd ui
```

Now, considering you have NodeJS and `pnpm` installed, run the following

```bash
pnpm i
pnpm dev
```

This will spin up the UI on `http://localhost:3000`. 

You should see a web app like this:
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/09/Screenshot-2025-09-20-at-11.05.12---AM.png)
In case your connection state is not in the green, you may need to set the correct URL by clicking gear icon (settings) on the top right. 

If it still doesn't work, your server might have error logs.

Click the `Start Audio` button to start talking to the voice AI agent - that can perform Google Search for you, so maybe ask about the chess match played 2 days ago!

## Conclusion

Duration: 2

Congratulations on making it here! 🎉

How easy was that!? Its just a few commands with a lot of defaults to build voice agents with Google ADK! On top of that, you got an introduction to using ADK with Weave Inference, that provides you free credits every month to keep playing!

## What's Next?

Duration: 1

You can explore the entire codebase here: 
[GitHub - wandb/voice-ai-agent-workshopContribute to wandb/voice-ai-agent-workshop development by creating an account on GitHub.![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/icon/pinned-octocat-093da3e6fa40.svg)GitHubwandb![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/thumbnail/voice-ai-agent-workshop)](https://github.com/wandb/voice-ai-agent-workshop)
If you found this codelab fun and useful, share it with someone who can benefit from this!

Further, read more about Weights & Biases here - https://wandb.ai.