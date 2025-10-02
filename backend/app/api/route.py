from fastapi import APIRouter

from .auth import auth_router
from .chat import chat_router
from .conversations import conversation_router
from .health import health_router
from .message import message_router
from .user import user_router

router = APIRouter()


router.include_router(health_router, tags=["Health"])
router.include_router(
    auth_router,
    prefix="/auth",
)
router.include_router(user_router, prefix="/user", tags=["User Management"])
router.include_router(chat_router, tags=["Chat Learning"])
router.include_router(conversation_router, prefix="/conversation", tags=["Conversation"])
router.include_router(message_router, prefix="/message", tags=["Message"])
