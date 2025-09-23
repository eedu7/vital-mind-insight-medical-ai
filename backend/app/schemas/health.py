from pydantic import BaseModel


class Health(BaseModel):
    status: str
    api_version: str
    title: str
    description: str
    timestamp: str
    db_status: bool
    db_latency_ms: int
