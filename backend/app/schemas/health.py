from pydantic import BaseModel


class Health(BaseModel):
    API_VERSION: str
    TITLE: str
    DESCRIPTION: str
