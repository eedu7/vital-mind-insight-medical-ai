from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.dependencies.authentication import AuthenticationRequired
from app.dependencies.current_user import get_current_user
from app.models.user import User
from app.schemas.conversation import ConversationCreate, ConversationOut
from app.services.conversation import ConversationService

router = APIRouter(dependencies=[Depends(AuthenticationRequired)])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ConversationOut)
async def create_conversation(
    data: ConversationCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[ConversationService, Depends(ConversationService)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    return await service.create_conversation(data.title, current_user.id, session=session)
