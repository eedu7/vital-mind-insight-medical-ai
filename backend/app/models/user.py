from uuid import UUID, uuid4

from sqlalchemy import UUID as PG_UUID
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    uuid: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        default=uuid4,
        index=True,
        unique=True,
        nullable=False,
    )
    email: Mapped[str] = mapped_column(String(322), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=True)

    def __repr__(self) -> str:
        return f"<User uuid={self.uuid}, email={self.email}>"
