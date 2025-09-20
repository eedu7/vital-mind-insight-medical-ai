from typing import cast
from uuid import UUID

from argon2.exceptions import HashingError
from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import Transaction
from app.models import User
from app.repositories import UserRepository
from app.schemas.auth import AuthResponse
from app.schemas.token import Token
from app.schemas.user import UserResponse
from app.utils import PasswordManager
from app.utils.jwt_manager import JWTManager


class AuthService:
    def __init__(self) -> None:
        self.repository = UserRepository(model=User)
        self.jwt_manager = JWTManager()

    def _generate_token(self, user: User) -> Token:
        """
        Generate access and refresh tokens for a given user.
        """
        try:
            access_token = self.jwt_manager.create_access_token(str(user.uuid))
            refresh_token = self.jwt_manager.create_refresh_token(str(user.uuid))
            return Token(access_token=access_token, refresh_token=refresh_token)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to generate authentication tokens."
            )

    @Transaction()
    async def register(self, email: str, password: str, *, session: AsyncSession) -> AuthResponse:
        user = await self.repository.get_by_email(email, session)

        if user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists.")

        try:
            hashed_password = PasswordManager.hash_password(password)
        except HashingError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal error while hashing password."
            )
        try:
            new_user = await self.repository.create_user(
                email=str(email), hashed_password=hashed_password, session=session
            )
        except IntegrityError:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists.")
        except Exception:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create user.")

        token = self._generate_token(new_user)
        return AuthResponse(token=token, user=UserResponse(uuid=new_user.uuid, email=new_user.email))

    async def login(self, email: str, password: str, session: AsyncSession) -> AuthResponse:
        user = await self.repository.get_by_email(email=email, session=session)

        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        try:
            if not PasswordManager.verify_password(user.hashed_password, password):
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        except HashingError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal error while verifying password"
            )
        token = self._generate_token(user)
        return AuthResponse(token=token, user=UserResponse(uuid=user.uuid, email=user.email))

    async def refresh_token(self, refresh_token: str, session: AsyncSession) -> Token:
        try:
            payload = self.jwt_manager.decode_token(refresh_token)
        except Exception as exc:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc))

        if payload.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str("Invalid token type"))

        user_uuid = cast(UUID | None, payload.get("sub", None))

        if not user_uuid:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str("Invalid token payload"))

        user = await self.repository.get_by_uuid(user_uuid, session)

        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str("User not found"))

        return self._generate_token(user)
