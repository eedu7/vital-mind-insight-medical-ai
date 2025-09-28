from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base
from app.db.mixins import PKUUIDMixin, TimeStampMixin


class Conversation(Base, PKUUIDMixin, TimeStampMixin):
    __tablename__ = "conversations"

    title: Mapped[str] = mapped_column(String(255), unique=False, nullable=False, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    def __repr__(self) -> str:
        return f"<User uuid={self.uuid}>"
