import asyncio

from alembic import context
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine

from app.core.config import config as settings
from app.models import Base

# Alembic Config object
config = context.config

# Metadata for autogeneration
target_metadata = Base.metadata

# Database
DATABASE_URL: str = settings.DATABASE_URL


def run_migration_offline() -> None:
    """
    Run migrations in 'offline' mode (no DB Connection).
    """
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    """
    Helper for running migrations with a connection.
    """
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """
    Run migrations in 'online' mode (with DB Connection).
    """
    engine: AsyncEngine = create_async_engine(DATABASE_URL, poolclass=pool.NullPool, future=True)

    async with engine.connect() as conn:
        await conn.run_sync(do_run_migrations)

    await engine.dispose()


if context.is_offline_mode():
    run_migration_offline()
else:
    asyncio.run(run_migrations_online())
