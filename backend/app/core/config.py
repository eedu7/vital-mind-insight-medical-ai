from enum import StrEnum
from pathlib import Path

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

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE),
        extra="ignore",
    )


config = Config()
