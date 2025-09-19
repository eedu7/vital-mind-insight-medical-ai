import uvicorn

from app.core.config import Environment, config

if __name__ == "__main__":
    uvicorn.run(
        "app.core.server:app",
        host=config.HOST,
        port=config.PORT,
        reload=True if config.ENVIRONMENT == Environment.DEVELOPMENT else False,
    )
