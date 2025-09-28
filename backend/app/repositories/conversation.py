from sqlalchemy.ext.asyncio import AsyncSession

from app.models.conversation import Conversation

from .base import BaseRepository


class ConversationRepository(BaseRepository[Conversation]):
    """
    Repository for handling Conversation-specific database operations.
    """

    async def create_conversation(self, title: str, user_id: int, session: AsyncSession) -> Conversation:
        return await self.create({"title": title, "user_id": user_id}, session)
