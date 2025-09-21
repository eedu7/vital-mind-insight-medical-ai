from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import User
from app.repositories import UserRepository


class UserService:
    def __init__(self) -> None:
        self.repository = UserRepository(model=User)

    async def get_by_uuid(self, uuid: UUID, session: AsyncSession) -> User:
        try:
            user = await self.repository.get_by_uuid(uuid, session)
        except SQLAlchemyError:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch user")
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        return user
