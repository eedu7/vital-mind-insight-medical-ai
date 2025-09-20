from argon2.exceptions import HashingError
from fastapi import HTTPException, status
from pydantic import EmailStr
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import Transaction
from app.models import User
from app.repositories import UserRepository
from app.utils import PasswordManager


class AuthService:
    def __init__(self) -> None:
        self.repository = UserRepository(model=User)

    @Transaction()
    async def register(self, email: EmailStr, password: str, *, session: AsyncSession):
        user = await self.repository.get_by_email(str(email), session)

        if user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists.")

        try:
            hashed_password = PasswordManager.hash_password(password)
        except HashingError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal error while hashing password."
            )
        try:
            return await self.repository.create_user(email=str(email), hashed_password=hashed_password, session=session)
        except IntegrityError:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists.")
        except Exception:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create user.")
