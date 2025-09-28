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
