from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import ai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai.router, prefix="/api/ai", tags=["AI"])

@app.get("/")
async def read_root():
    return {"message": "Welcome to Joki AI Backend!"}
