from api.route import router
from fastapi import FastAPI


def create_app() -> FastAPI:
    app_ = FastAPI(title="Backend API")

    app_.include_router(router)

    return app_


app: FastAPI = create_app()
