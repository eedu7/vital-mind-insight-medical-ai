from fastapi import Response

from app.core.config import config
from app.schemas.token import Token


class AuthCookieManager:
    def __init__(self, response: Response) -> None:
        self.response = response

    def _set_cookie(self, key: str, value: str, max_age: int) -> None:
        self.response.set_cookie(
            key=key,
            value=value,
            httponly=True,
            max_age=max_age,
            samesite="lax",
            secure=True,
        )

    def set_cookies(self, token: Token) -> None:
        self._set_cookie("access_token", token.access_token, config.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
        self._set_cookie("refresh_token", token.access_token, config.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
