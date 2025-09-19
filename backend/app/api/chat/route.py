import asyncio
import json

import httpx
from fastapi import APIRouter, Query, WebSocket
from fastapi.responses import StreamingResponse

router = APIRouter()

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.1:8b"


async def stream_ollama(prompt: str):
    """Generator to stream output from Ollama."""
    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream("POST", OLLAMA_URL, json={"model": MODEL_NAME, "prompt": prompt}) as response:
            async for line in response.aiter_lines():
                if not line:
                    continue
                print(line)
                try:
                    data = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if "response" in data:
                    yield data["response"]
                if data.get("done"):
                    break


@router.get("/chat")
async def chat(prompt: str = Query(..., description="Your input prompt")):
    """Return the full Ollama response (not streamed)."""
    output = ""
    async for chunk in stream_ollama(prompt):
        output += chunk
    return {"prompt": prompt, "response": output}


@router.get("/chat/stream")
async def stream_chat(prompt: str = Query(..., description="Your input prompt")):
    """Stream Ollama response as SSE."""

    async def event_generator():
        async for chunk in stream_ollama(prompt):
            yield f"data: {chunk}\n\n"
            await asyncio.sleep(0)  # let event loop breathe

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@router.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    """Stream Ollama response over WebSocket."""
    await ws.accept()
    prompt = await ws.receive_text()

    async for chunk in stream_ollama(prompt):
        await ws.send_text(chunk)
        await asyncio.sleep(0)

    await ws.close()
