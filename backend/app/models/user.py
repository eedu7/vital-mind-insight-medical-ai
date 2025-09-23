from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base
from app.db.mixins import PKUUIDMixin, TimeStampMixin


class User(Base, PKUUIDMixin, TimeStampMixin):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(322), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=True)

    def __repr__(self) -> str:
        return f"<User uuid={self.uuid}, email={self.email}>"
