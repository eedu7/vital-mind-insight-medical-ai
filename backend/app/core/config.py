from enum import StrEnum
from pathlib import Path
from typing import List

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent

ENV_FILE = BASE_DIR / ".env"


class Environment(StrEnum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"
    TESTING = "testing"


class Config(BaseSettings):
    PORT: int = 8080
    HOST: str = "localhost"
    ENVIRONMENT: Environment = Environment.DEVELOPMENT

    # Database
    POSTGRES_USER: str = "postgres_user"
    POSTGRES_PASSWORD: str = "postgres_password"
    POSTGRES_DB: str = "postgres_db"
    POSTGRES_DB_PORT: int = 5432
    POSTGRES_DB_HOST: str = "localhost"

    # CORS
    ALLOWED_ORIGINS: str = "*"
    ALLOWED_METHODS: str = "*"
    ALLOWED_HEADERS: str = "*"
    ALLOW_CREDENTIALS: bool = True

    @property
    def DATABASE_URL(self) -> str:
        return str(
            PostgresDsn.build(
                scheme="postgresql+asyncpg",
                username=self.POSTGRES_USER,
                password=self.POSTGRES_PASSWORD,
                host=self.POSTGRES_DB_HOST,
                port=self.POSTGRES_DB_PORT,
                path=self.POSTGRES_DB,
            )
        )

    @property
    def CORS_ALLOWED_ORIGINS(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(sep=",") if origin.strip()]

    @property
    def CORS_ALLOWED_METHODS(self) -> List[str]:
        return [method.strip() for method in self.ALLOWED_METHODS.split(sep=",") if method.strip()]

    @property
    def CORS_ALLOWED_HEADERS(self) -> List[str]:
        return [header.strip() for header in self.ALLOWED_HEADERS.split(sep=",") if header.strip()]

    @property
    def CORS_ALLOW_CREDENTIALS(self) -> bool:
        return self.ALLOW_CREDENTIALS

    model_config = SettingsConfigDict(
        env_file=ENV_FILE if ENV_FILE.exists() else None,
        extra="ignore",
    )


config = Config()
