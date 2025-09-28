from uuid import UUID

from pydantic import BaseModel


class ConversationCreate(BaseModel):
    title: str


class ConversationOut(BaseModel):
    uuid: UUID
    title: str
