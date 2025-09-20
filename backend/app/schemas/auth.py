from pydantic import BaseModel, EmailStr

from .token import Token
from .user import UserResponse


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    user: UserResponse
    token: Token
