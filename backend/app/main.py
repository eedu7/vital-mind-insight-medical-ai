import uvicorn
from core.config import Environment, config

if __name__ == "__main__":
    uvicorn.run(
        "core.server:app",
        host=config.HOST,
        port=config.PORT,
        reload=True if config.ENVIRONMENT == Environment.DEVELOPMENT else False,
    )
