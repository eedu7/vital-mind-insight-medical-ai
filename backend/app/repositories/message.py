from app.models import Message
from app.repositories.base import BaseRepository


class MessageRepository(BaseRepository[Message]):
    """
    Repository for handling Message-specific database operations.
    """

    pass
