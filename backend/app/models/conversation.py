from typing import TYPE_CHECKING, List

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base
from app.db.mixins import PKUUIDMixin, TimeStampMixin

# Forward reference for type hints. Import is skipped at runtime
# to prevent circular import issues between Message and Conversation.
if TYPE_CHECKING:
    from .message import Message


class Conversation(Base, PKUUIDMixin, TimeStampMixin):
    __tablename__ = "conversations"

    title: Mapped[str] = mapped_column(String(255), unique=False, nullable=False, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    messages: Mapped[List["Message"]] = relationship(
        "Message",
        back_populates="conversation",
        cascade="all, delete-orphan",
        lazy="selectin",
        order_by="Message.created_at",
    )

    def __repr__(self) -> str:
        return f"<User uuid={self.uuid}>"
