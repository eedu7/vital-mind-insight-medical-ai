from fastapi import APIRouter
from schemas.health import Health

router = APIRouter(tags=["Health"])


@router.get("/")
async def health() -> Health:
    return Health(API_VERSION="1.0.0", TITLE="VitalMind Insight Health AI", DESCRIPTION="VitalMind Insight Health AI")
