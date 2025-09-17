from fastapi import FastAPI

from app.api.route import router


def create_app() -> FastAPI:
    app_ = FastAPI(
        title="VitalMind Insight Medical AI",
        description="Backend service powering an AI-driven medical chatbot with advanced healthcare insights.",
    )

    app_.include_router(router)

    return app_


app: FastAPI = create_app()
