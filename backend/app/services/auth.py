from fastapi import HTTPException, status
from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import Transaction
from app.models import User
from app.repositories import UserRepository


class AuthService:
    def __init__(self) -> None:
        self.repository = UserRepository(model=User)

    @Transaction()
    async def register(self, email: EmailStr, password: str, *, session: AsyncSession):
        user = await self.repository.get_by_email(str(email), session)

        if user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists.")

        return await self.repository.create_user(email=str(email), hashed_password=password, session=session)
