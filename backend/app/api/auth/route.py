from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest
from app.services.auth import AuthService

router = APIRouter()


@router.post("/register", response_model=AuthResponse)
async def register_user(
    data: RegisterRequest,
    auth_service: Annotated[AuthService, Depends(AuthService)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    return await auth_service.register(str(data.email), data.password, session=session)


@router.post("/login", response_model=AuthResponse)
async def login_user(
    data: LoginRequest,
    auth_service: Annotated[AuthService, Depends(AuthService)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    return await auth_service.login(str(data.email), data.password, session=session)
