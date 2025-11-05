import logging
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os
from typing import Optional

load_dotenv()

class Settings(BaseSettings):
    OPENROUTER_API_KEY: str
    OPENROUTER_MODEL: str
    MIDTRANS_SERVER_KEY: Optional[str] = None
    MIDTRANS_CLIENT_KEY: Optional[str] = None
    MIDTRANS_IS_PRODUCTION: bool = False
    MIDTRANS_CALLBACK_URL: Optional[str] = None

    class Config:
        env_file = ".env"

settings = Settings()
logging.info(f"Loaded OPENROUTER_MODEL from config: {settings.OPENROUTER_MODEL}")
