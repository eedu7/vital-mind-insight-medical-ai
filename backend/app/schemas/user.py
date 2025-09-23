from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class UserResponse(BaseModel):
    uuid: UUID
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)
