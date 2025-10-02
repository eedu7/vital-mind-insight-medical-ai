from app.models import Message
from app.repositories import MessageRepository


class MessageService:
    def __init__(self) -> None:
        self.repository = MessageRepository(model=Message)
