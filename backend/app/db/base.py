from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# Imports all the models here so Alembic can see them
