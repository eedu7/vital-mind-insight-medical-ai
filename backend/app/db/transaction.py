from collections.abc import Callable
from functools import wraps
from typing import cast

from sqlalchemy.ext.asyncio import AsyncSession


class Transaction:
    def __call__(self, func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            session = cast(AsyncSession | None, kwargs.get("session", None))
            if session is None:
                raise ValueError("Missing 'session' keyword argument for transaction function")
            try:
                result = await func(*args, **kwargs)
                await session.commit()
                return result
            except Exception:
                await session.rollback()
                raise

        return wrapper
