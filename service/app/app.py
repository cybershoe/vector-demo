from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from os import getenv
from json import loads
from logging import getLogger
from embed import embedString
from search import searchVector, searchMovie

origins = loads(getenv('CORS_ORIGINS', '["http://localhost", "http://localhost:1234", "http://127.0.0.1", "http://127.0.0.1:1234"]'))

log = getLogger('uvicorn')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmbedRequest(BaseModel):
    text: str

class Vector(BaseModel):
    vector: list[float]

@app.get("/")
async def root():
    return {"message": f"Hello world"}

@app.post("/embed")
async def embed(req: EmbedRequest):
    return embedString(req.text)

@app.post("/search")
async def search(req: Vector):
    return await searchVector(req.vector)

@app.get("/movie/{id}")
async def movie(id: str):
    result = await searchMovie(id)
    if not result:
        return {"error": "Movie not found"}
    return result