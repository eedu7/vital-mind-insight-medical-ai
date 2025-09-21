from typing import Annotated
from uuid import UUID

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models import User
from app.services import UserService


async def get_current_user(
    request: Request,
    user_service: Annotated[UserService, Depends(UserService)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> User:
    user_state = getattr(request.state, "user", None)

    if not user_state or "uuid" not in user_state:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    try:
        user_uuid = UUID(user_state["uuid"])
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid UUID")

    return await user_service.get_by_uuid(uuid=user_uuid, session=session)
