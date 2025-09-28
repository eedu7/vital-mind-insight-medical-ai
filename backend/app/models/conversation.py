from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base
from app.db.mixins import PKUUIDMixin, TimeStampMixin


class Conversation(Base, PKUUIDMixin, TimeStampMixin):
    __tablename__ = "conversations"

    title: Mapped[str] = mapped_column(String, unique=False, nullable=False, index=True)

    def __repr__(self) -> str:
        return f"<User uuid={self.uuid}>"
