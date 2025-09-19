from typing import List

from fastapi.middleware import Middleware

from .cors import cors_middleware


def init_middlewares() -> List[Middleware]:
    return [cors_middleware()]
