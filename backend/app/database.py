from collections.abc import AsyncIterator

from fastapi import Request
from pymongo.asynchronous.database import AsyncDatabase


async def get_database(request: Request) -> AsyncIterator[AsyncDatabase]:
    yield request.app.state.database
