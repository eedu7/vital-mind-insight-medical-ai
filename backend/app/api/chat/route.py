import asyncio

from fastapi import APIRouter, WebSocket
from fastapi.responses import StreamingResponse

from .data import data

router = APIRouter()


@router.post("/chat")
async def chat():
    return {"essay": data}


@router.post("/chat/stream")
async def stream_chat():
    async def event_generator():
        for ele in data:
            yield f"{ele}"
            await asyncio.sleep(1)

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@router.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    for ele in data:
        yield f"{ele}\n\n"
        await asyncio.sleep(1)
    await ws.close()
