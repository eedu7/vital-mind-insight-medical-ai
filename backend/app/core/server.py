from fastapi import FastAPI

from app.api.route import router
from app.middlewares import init_middlewares


def create_app() -> FastAPI:
    app_ = FastAPI(
        title="VitalMind Insight Medical AI",
        description="Backend service powering an AI-driven medical chatbot with advanced healthcare insights.",
        middleware=init_middlewares(),
    )

    app_.include_router(router)

    return app_


app: FastAPI = create_app()
