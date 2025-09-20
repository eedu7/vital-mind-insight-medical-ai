from datetime import UTC, datetime, timedelta
from typing import Any, Dict

import jwt
from jwt import (
    DecodeError,
    ExpiredSignatureError,
    ImmatureSignatureError,
    InvalidAlgorithmError,
    InvalidAudienceError,
    InvalidIssuerError,
    InvalidSignatureError,
    InvalidTokenError,
    MissingRequiredClaimError,
    PyJWTError,
)

from app.core.config import config


class JWTManager:
    def __init__(self) -> None:
        self.algorithm = config.JWT_ALGORITHM
        self.issuer = config.JWT_ISSUER
        self.audience = config.JWT_AUDIENCE
        self.private_key = config.JWT_PRIVATE_KEY
        self.public_key = config.JWT_PUBLIC_KEY
        self.access_expire_minutes = config.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
        self.refresh_expire_minutes = config.JWT_REFRESH_TOKEN_EXPIRE_MINUTES

    def create_access_token(self, subject: str, extra_claims: Dict[str, Any] | None = None) -> str:
        now = datetime.now(UTC)
        expire = (now + timedelta(minutes=self.access_expire_minutes)).timestamp()

        payload: Dict[str, Any] = {"sub": subject, "iss": self.issuer, "aud": self.audience, "iat": now, "exp": expire}
        if extra_claims:
            payload.update(extra_claims)
        return jwt.encode(payload, self.private_key, algorithm=self.algorithm)

    def create_refresh_token(self, subject: str) -> str:
        now = datetime.now(UTC)
        expire = (now + timedelta(minutes=self.refresh_expire_minutes)).timestamp()

        payload: Dict[str, Any] = {
            "sub": subject,
            "iss": self.issuer,
            "aud": self.audience,
            "iat": now,
            "exp": expire,
            "type": "refresh",
        }
        return jwt.encode(payload, self.private_key, algorithm=self.algorithm)

    def decode_token(self, token: str) -> Dict[str, Any]:
        return jwt.decode(token, options={"verify_signature": False})

    def verify_token(self, token: str) -> Dict[str, Any]:
        try:
            return jwt.decode(
                token, self.public_key, algorithms=[self.algorithm], issuer=self.issuer, audience=self.audience
            )
        except ExpiredSignatureError:
            raise ValueError("Token has expired")
        except InvalidSignatureError:
            raise ValueError("Invalid signature - token may be tampered")
        except InvalidAudienceError:
            raise ValueError("Invalid audience")
        except InvalidIssuerError:
            raise ValueError("Invalid issuer")
        except ImmatureSignatureError:
            raise ValueError("Invalid or expired token")
        except InvalidAlgorithmError:
            # logger.warning("JWT verification failed: Invalid algorithm used")
            raise ValueError("Invalid or expired token")
        except MissingRequiredClaimError:
            raise ValueError("Invalid or expired token")
        except DecodeError:
            raise ValueError("Invalid or expired token")
        except InvalidTokenError:
            raise ValueError("Invalid token")
        except PyJWTError:
            raise ValueError("Invalid token")
