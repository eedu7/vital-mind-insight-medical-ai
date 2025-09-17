from fastapi import APIRouter

from app.schemas.health import Health

router = APIRouter()


@router.get("/")
async def health() -> Health:
    return Health(api_version="1.0.0", title="VitalMind Insight Health AI", description="VitalMind Insight Health AI")
