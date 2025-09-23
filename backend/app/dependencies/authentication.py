from typing import Annotated, Any, Dict

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.utils import JWTManager


class AuthenticationRequired:
    def __init__(
        self,
        request: Request,
        credentials: Annotated[HTTPAuthorizationCredentials, Depends(HTTPBearer(auto_error=False))],
    ) -> None:
        if not credentials:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

        jwt_manager = JWTManager()

        try:
            payload: Dict[str, Any] = jwt_manager.verify_token(credentials.credentials)
            request.state.user = {
                "uuid": payload.get("sub"),
            }
        except Exception:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
