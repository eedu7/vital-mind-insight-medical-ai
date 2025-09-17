from pydantic import BaseModel


class Health(BaseModel):
    api_version: str
    title: str
    description: str
