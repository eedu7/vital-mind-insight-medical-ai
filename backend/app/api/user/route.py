from typing import Annotated

from fastapi import APIRouter, Depends

from app.dependencies import AuthenticationRequired, get_current_user
from app.models import User
from app.schemas.user import UserResponse

router = APIRouter(dependencies=[Depends(AuthenticationRequired)])


@router.get("/", response_model=UserResponse)
async def user(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user
