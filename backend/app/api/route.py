from fastapi import APIRouter

from .auth import auth_router
from .chat import chat_router
from .health import health_router

router = APIRouter()


router.include_router(health_router, tags=["Health"])
router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
router.include_router(chat_router, tags=["Chat"])
