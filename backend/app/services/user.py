from app.models import User
from app.repositories import UserRepository


class UserService:
    def __init__(self) -> None:
        self.repository = UserRepository(model=User)
