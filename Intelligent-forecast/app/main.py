from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from .routers import sqlmain

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sqlmain.router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
