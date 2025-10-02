from typing import List, cast
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.transaction import Transaction
from app.models import Conversation
from app.repositories.conversation import ConversationRepository


class ConversationService:
    def __init__(self) -> None:
        self.repository = ConversationRepository(model=Conversation)

    @Transaction()
    async def create_conversation(self, title: str, user_id: int, *, session: AsyncSession):
        try:
            return await self.repository.create_conversation(title, user_id, session)
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error on creating conversation: {exc}"
            )

    async def get_all_conversations(self, user_id: int, session: AsyncSession) -> List[Conversation]:
        try:
            conversations = await self.repository.get_all_conversations(user_id=user_id, session=session)

        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error on fetching conversation by id: {exc}"
            )

        if not conversations:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Error conversations not found.")
        return cast(List[Conversation], conversations)

    async def get_by_uuid(self, uuid: UUID, user_id: int, session: AsyncSession) -> List[Conversation]:
        try:
            conversations = await self.repository.get_by_uuid(uuid=uuid, user_id=user_id, session=session)

        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error on fetching conversation by id: {exc}"
            )

        if not conversations:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Error conversation with uuid {uuid} not found."
            )
        return cast(List[Conversation], conversations)
