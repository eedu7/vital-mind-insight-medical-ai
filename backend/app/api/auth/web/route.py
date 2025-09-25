from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.auth import AuthService
from app.utils.auth_cookies import AuthCookieManager

router = APIRouter()


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(
    response: Response,
    data: RegisterRequest,
    auth_service: Annotated[AuthService, Depends(AuthService)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    auth_response = await auth_service.register(
        str(data.email),
        data.password,
        session=session,
    )

    AuthCookieManager(response=response).set_cookies(auth_response.token)

    return auth_response.user


@router.post(
    "/login",
)
async def login_user(
    response: Response,
    data: LoginRequest,
    auth_service: Annotated[AuthService, Depends(AuthService)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    auth_response = await auth_service.login(
        str(data.email),
        data.password,
        session=session,
    )
    AuthCookieManager(response=response).set_cookies(auth_response.token)

    return auth_response.user


@router.post("/refresh")
async def refresh_token(
    request: Request,
    response: Response,
    auth_service: Annotated[AuthService, Depends(AuthService)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No token found")

    token = await auth_service.refresh_token(refresh_token, session)
    AuthCookieManager(response=response).set_cookies(token)
