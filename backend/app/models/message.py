from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Enum, ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base
from app.db.mixins import PKUUIDMixin, TimeStampMixin

if TYPE_CHECKING:
    from .conversation import Conversation


class Role(StrEnum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"


class Message(PKUUIDMixin, TimeStampMixin, Base):
    __tablename__: str = "messages"

    conversation_id: Mapped[int] = mapped_column(Integer, ForeignKey("conversations.id", ondelete="CASCADE"))
    role: Mapped[Role] = mapped_column(Enum(Role), default=Role.USER)
    content: Mapped[str] = mapped_column(Text, nullable=False)

    conversation: Mapped["Conversation"] = relationship("Conversation", back_populates="messages")
