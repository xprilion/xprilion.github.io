# Building YouTube Shopping AI with Gemini 3 Flash

If you like shopping research but hate *tab debt*, this project is for you: **search YouTube, pick a handful of videos, then ask questions and generate a course-like buying guide**.

You can try the deployed version here:[ yt-shopping-ai.xprilion.com.](https://yt-shopping-ai.xprilion.com)

This post is intentionally *not* a step-by-step beginner tutorial. It’s a build note about the decisions: **why these choices**, what they buy you, what they cost you, and when you’d pick the alternatives in real projects.

## The Problem

Shopping content on YouTube is great… and also chaotic:
- The best advice is often buried at minute 14:37 after three sponsor segues.
- Different creators disagree (sometimes loudly) and the truth is in the overlap.
- You don’t want “a summary”. You want **a decision**: what to buy, why, and the tradeoffs.

So the product goal becomes:

> *Turn a messy pile of video opinions into a compact, source-backed guide that helps a human choose.*

## **What you’re building**

A Next.js App that:
- searches for YouTube videos via Google’s search stack
- lets you select videos
- generates a structured “course outline”
- extracts transcript-like summaries with timestamps
- answers questions with sources back to timestamps

And yes, it’s “bring your own keys” (BYOK), but that’s more of an operational choice than the main character.

## Run it locally (minimal)

If you already live in the Next.js ecosystem, you know the drill. Clone the repo, install deps, start dev.

If you *don’t* (or you’re rusty), here are the canonical references:
- Node install: [https://nodejs.org](https://nodejs.org)
- pnpm: [https://pnpm.io/installation](https://pnpm.io/installation)

Now, let's explore some of the decision making that went into building this project.

## **Decision 1: Search is a product feature, not a backend detail**

The first fork: **how do you find videos?**

You have options:
- YouTube Data API (structured, quota rules, extra auth story)
- Scraping (fast to start, high-maintenance, questionable vibes)
- “Search powered by Google” (good relevance, simple mental model)

This project uses **Google Programmable Search Engine** (PSE) API because:
- **Relevance is the whole game**: for shopping queries, Google’s ranking usually beats anything you can DIY in a weekend.
- **Control is “good enough”**: you can restrict results to `youtube.com` and further tweak the engine by user demographics - location, age, language, etc., if you wish to utilize those.
- **The UI stays simple**: a text box, results, pick what you want.
If you’re new to PSE, start here: G[oogle Programmable Search Engine overview](https://programmablesearchengine.google.com/about/).

### **Pros**

Great general relevance and “it just works” UX. You can constrain to a site (YouTube) without building search infra.

### Cons

Result metadata isn’t as rich as a dedicated YouTube API model. You cannot grab comments, channel details, etc using the search API alone. But hey, that's a problem for another day.

### How to pick
- Choose **YouTube Data API** if you need: channels, playlists, publish dates, analytics-ish metadata, or a “video-first” product where precision beats convenience.
- Choose **PSE** if you want: fast iteration, broad query coverage, and you can live with “I guide others to treasures I cannot possess” (I guide others to results I cannot produce/store).

## Decision 2: “Transcript” doesn’t have to mean “verbatim”

The next fork: **how do you get the content of the video into a model?**

You could chase perfect transcripts. Or you can treat transcripts as a means to an end: **retrieval and citation**.

YT Shopping AI uses Gemini to generate a **timestamped transcript summary**.

That’s a deliberate trade:
- The UI needs “good-enough grounding” to answer questions.
- The user needs **source points** (timestamps) more than raw text walls.

### Pros
- It’s fast to read and useful for Q&A.
- Timestamped sections make citations feel real (“go to 08:12”) instead of vibes.

### Cons
- It’s not verbatim; nuance can get compressed.
- Models can hallucinate if the input is weak or the prompt is too confident.

### How to pick
- If you’re building **compliance** tooling (legal, medical, finance): you want verbatim transcripts and strict provenance.
- If you’re building **consumer decision support**: summaries with timestamps are often the sweet spot.

## **Decision 3: Multi-video is the antidote to creator bias**

Single-video assistants feel smart until you realize they’ve just become a fan account for whoever you watched last.

We force a more honest workflow:
- search broadly
- pick multiple videos
- answer questions across them

The structure matters because shopping decisions are inherently comparative:
- “Battery life” isn’t a number; it’s a trade vs weight, thermals, price.
- “Best” changes when you add constraints: budget, region, availability, returns.

### Pros
- You get triangulation: overlap across creators is usually the truth.
- You can surface disagreements explicitly (“Video A says X, Video B says Y”).
- You get over the bias that could have been introduced by sponsored videos.

### Cons
- More compute, more latency.
- More chances for contradiction, which means you need better prompting and UX.

### How to pick
- If you’re building a “video companion” product (one creator, one long tutorial), single-source is simpler and often better.
- If you’re building “what should I buy?”, multi-source is almost mandatory.

## Decision 4: Separate “course outline” from “Q&A”

Don’t ask the model to do everything in one shot.

The app splits:
- Outline generation: produce a stable structure (“Before you buy”, “Alternatives”, “Reviews”…)
- Q&A: answer targeted questions with sources

### Why?
- Outlines anchor the session. They reduce the “blank page” problem.
- Q&A becomes more surgical. Users ask better questions when they see a map.

### **Pros**
- Better UX: users feel guided, not dumped into a chat void.
- Better model behavior: each call has a tight, obvious job.

### **Cons**
- More endpoints, more moving pieces.
- You have to reconcile when the outline suggests topics not covered in the selected videos.

## Architecture

Here’s the big picture:
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/12/diagram.png)
### UI layer

The UI drives the workflow:
- **Search**: query → results
- **Select**: choose videos worth trusting
- **Extract**: generate transcript-like summaries with timestamps
- **Ask**: ask questions across selected videos, get sources back
- **Generate**: create a structured “course-like” outline for the shopping topic

### API routes

The server is intentionally “dumb”: it turns requests into upstream calls.

Endpoints:
- `/api/search-videos`: calls Google’s Custom Search JSON API endpoint (powered by your PSE CX)
- `/api/get-transcript`: uses Gemini to extract a detailed, timestamped transcript summary from a video URL
- `/api/ask-videos`: uses Gemini to answer questions and returns source timestamps
- `/api/generate-course`: uses Gemini to generate the shopping “course outline” JSON

## A note on keys

Keys are stored in the browser and sent per request. It’s not “the point”, but it does make the deployment story clean:
- **Pros**: no billing headache for me, no secret storage, fewer infra obligations, easier open-source demo.
- **Cons**: users manage keys; you can’t do server-side caching/shared quotas as easily. Sometimes, they may not have access to the required models.

If you were productizing this, you’d likely add first-party auth + server-side key management for UX and reliability, and greater speeds. Probably slap on your own pricing model and make it a business!

## Conclusion

Next upgrades I’d do if this were a real product:
- A “confidence” UI: show when sources disagree, not just the answer.
- A “budget + constraints” panel so the model stops guessing your life.
- Make it a business?