from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ConversationCreate(BaseModel):
    title: str


class ConversationOut(BaseModel):
    uuid: UUID
    title: str

    model_config = ConfigDict(from_attributes=True)
