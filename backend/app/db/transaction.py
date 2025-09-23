from collections.abc import Callable
from functools import wraps
from typing import Awaitable, ParamSpec, TypeVar, cast

from sqlalchemy.ext.asyncio import AsyncSession

P = ParamSpec("P")
R = TypeVar("R")


class Transaction:
    def __call__(self, func: Callable[P, Awaitable[R]]) -> Callable[P, Awaitable[R]]:
        @wraps(func)
        async def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
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
