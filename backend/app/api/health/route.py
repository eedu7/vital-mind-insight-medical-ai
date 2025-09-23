import time
from datetime import UTC, datetime
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.schemas.health import Health

router = APIRouter()


@router.get("/")
async def health(session: Annotated[AsyncSession, Depends(get_session)]) -> Health:
    db_ok = False
    db_latency_ms = None
    start = time.monotonic()
    try:
        await session.execute(text("SELECT 'Database OK'"))
        db_ok = True
    except SQLAlchemyError:
        db_ok = False
    finally:
        db_latency_ms = int((time.monotonic() - start) * 1000)

    now = datetime.now(UTC).isoformat()

    return Health(
        status="ok",
        api_version="1.0.0",
        title="VitalMind Insight Health AI",
        description="VitalMind Insight Health AI",
        timestamp=now,
        db_status=db_ok,
        db_latency_ms=db_latency_ms,
    )
