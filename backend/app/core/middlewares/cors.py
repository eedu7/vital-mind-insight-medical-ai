from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import config


def cors_middleware() -> Middleware:
    return Middleware(
        cls=CORSMiddleware,
        allow_origins=config.CORS_ALLOWED_ORIGINS,
        allow_credentials=config.CORS_ALLOW_CREDENTIALS,
        allow_methods=config.CORS_ALLOWED_METHODS,
        allow_headers=config.CORS_ALLOWED_HEADERS,
    )
