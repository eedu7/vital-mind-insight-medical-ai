from uuid import UUID, uuid4

from sqlalchemy import UUID as PG_UUID
from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column


class PKUUIDMixin:
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False, autoincrement=True)
    uuid: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), default=uuid4, unique=True, nullable=False, index=True)
