from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest
from app.schemas.token import RefreshTokenRequest, Token
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


@router.post("/refresh", response_model=Token)
async def refresh_token(
    data: RefreshTokenRequest,
    auth_service: Annotated[AuthService, Depends(AuthService)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    return await auth_service.refresh_token(data.refresh_token, session)


@router.post("/logout")
async def logout():
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Not Implemented")
