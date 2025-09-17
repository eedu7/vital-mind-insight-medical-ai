from fastapi import APIRouter

from .chat import chat_router
from .health import health_router

router = APIRouter()


router.include_router(health_router, tags=["Health"])
router.include_router(chat_router, tags=["Chat"])
