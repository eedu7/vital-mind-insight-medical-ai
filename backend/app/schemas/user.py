from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    uuid: UUID
    email: EmailStr
