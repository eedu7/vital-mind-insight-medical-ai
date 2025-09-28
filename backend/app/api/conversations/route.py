from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.schemas.conversation import ConversationCreate, ConversationOut
from app.services.conversation import ConversationService

router = APIRouter()


@router.post("/", response_model=ConversationOut)
async def create_conversation(
    data: ConversationCreate,
    service: Annotated[ConversationService, Depends(ConversationService)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    return await service.create_conversation(data.title, session=session)
