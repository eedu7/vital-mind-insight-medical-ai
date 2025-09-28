from sqlalchemy.ext.asyncio import AsyncSession

from app.models.conversation import Conversation

from .base import BaseRepository


class ConversationRepository(BaseRepository[Conversation]):
    """
    Repository for handling Conversation-specific database operations.
    """

    async def create_conversation(self, title: str, session: AsyncSession) -> Conversation:
        return await self.create({"title": title}, session)
