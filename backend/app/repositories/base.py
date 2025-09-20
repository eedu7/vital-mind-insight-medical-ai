from collections.abc import Sequence
from typing import Any, Dict, Generic, Type, TypeVar

from sqlalchemy import ColumnElement, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm.attributes import InstrumentedAttribute

from app.models import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType]) -> None:
        self.model = model

    async def get_by_id(self, _id: int, session: AsyncSession) -> ModelType | None:
        """
        Retrieve a record by primary key.
        """
        return await session.get(self.model, _id)

    async def get_all(self, session: AsyncSession) -> Sequence[ModelType]:
        """
        Fetch all records.
        """
        stmt = select(self.model)
        result = await session.execute(stmt)
        return result.scalars().all()

    async def get_one_by_column(
        self, column: InstrumentedAttribute, value: Any, session: AsyncSession
    ) -> ModelType | None:
        if not hasattr(self.model, column.key):
            raise ValueError(f"{column.key} is not a valid column of {self.model.__name__}.")

        stmt = select(self.model).where(column == value)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    async def find(
        self, *conditions: ColumnElement[bool], session: AsyncSession, unique: bool = False
    ) -> Sequence[ModelType] | ModelType | None:
        stmt = select(self.model).where(*conditions)
        result = await session.execute(stmt)
        if unique:
            return result.scalars().first()
        return result.scalars().all()

    async def create(self, data: Dict[str, Any], session: AsyncSession) -> ModelType:
        """
        Insert a new record.
        """
        invalid_keys = set(data) - set(self.model.__table__.columns.keys())
        if invalid_keys:
            raise ValueError(f"Invalid columns: {invalid_keys}")

        instance = self.model(**data)
        session.add(instance)
        await session.flush()
        await session.refresh(instance)
        return instance

    async def update(self, instance: ModelType, data: Dict[str, Any], session: AsyncSession) -> ModelType:
        """
        Update an existing record.
        """
        invalid_keys = set(data) - set(self.model.__table__.columns.keys())
        if invalid_keys:
            raise ValueError(f"Invalid columns: {invalid_keys}")
        for field, value in data.items():
            setattr(instance, field, value)

        session.add(instance)
        await session.flush()
        await session.refresh(instance)
        return instance

    async def delete(self, instance: ModelType, session: AsyncSession) -> None:
        """
        Delete a record.
        """
        await session.delete(instance)
        await session.flush()

    async def refresh(self, instance: ModelType, session: AsyncSession) -> ModelType:
        """
        Refresh instanceect state from DB.
        """
        await session.refresh(instance)
        return instance

    async def commit(self, session: AsyncSession) -> None:
        """
        Commit current transaction.
        """
        await session.commit()

    async def rollback(self, session: AsyncSession) -> None:
        """
        Rollback current transaction.
        """
        await session.rollback()
