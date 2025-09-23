from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User

from .base import BaseRepository


class UserRepository(BaseRepository[User]):
    """
    Repository for handling User-specific database operations.
    """

    async def get_by_email(self, email: str, session: AsyncSession) -> User | None:
        return await self.get_one_by_column(User.email, email, session)

    async def get_by_uuid(self, uuid: UUID, session: AsyncSession) -> User | None:
        return await self.get_one_by_column(User.uuid, uuid, session)

    async def create_user(self, email: str, hashed_password: str, session: AsyncSession) -> User:
        data = {"email": email, "hashed_password": hashed_password}
        return await self.create(data, session)
