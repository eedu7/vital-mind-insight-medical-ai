from typing import Sequence
from uuid import UUID

from sqlalchemy import and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.conversation import Conversation

from .base import BaseRepository


class ConversationRepository(BaseRepository[Conversation]):
    """
    Repository for handling Conversation-specific database operations.
    """

    async def get_all_conversations(
        self,
        user_id: int,
        session: AsyncSession,
    ) -> Sequence[Conversation] | Conversation | None:
        return await self.find(
            Conversation.user_id == user_id,
            session=session,
        )

    async def get_by_uuid(
        self,
        uuid: UUID,
        user_id: int,
        session: AsyncSession,
        unique: bool = False,
    ) -> Sequence[Conversation] | Conversation | None:
        return await self.find(
            and_(Conversation.user_id == user_id, Conversation.uuid == uuid), session=session, unique=unique
        )

    async def create_conversation(self, title: str, user_id: int, session: AsyncSession) -> Conversation:
        return await self.create({"title": title, "user_id": user_id}, session)
