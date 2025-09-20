from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.services.auth import AuthService

router = APIRouter()


@router.post("/register")
async def register_user(
    data: RegisterRequest,
    auth_service: Annotated[AuthService, Depends(AuthService)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    user: User = await auth_service.register(data.email, data.password, session=session)
    return user
