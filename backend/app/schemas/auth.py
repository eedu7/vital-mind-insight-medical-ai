from pydantic import BaseModel, EmailStr, Field

from .token import Token
from .user import UserResponse


class Base(BaseModel):
    email: EmailStr = Field(..., examples=["john.doe@example.com"])
    password: str = Field(..., examples=["Password@123"])


class RegisterRequest(Base):
    pass


class LoginRequest(Base):
    pass


class AuthResponse(BaseModel):
    user: UserResponse
    token: Token
