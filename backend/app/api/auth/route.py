from fastapi import APIRouter

from .mobile import mobile_router
from .web import web_router

router = APIRouter()

router.include_router(mobile_router, prefix="/mobile", tags=["Mobile Authentication"])
router.include_router(web_router, prefix="/web", tags=["Web Authentication"])
