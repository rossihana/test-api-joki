import httpx
from fastapi import HTTPException
from config import settings

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

async def generate_ai_response(prompt: str) -> str:
    if not settings.OPENROUTER_API_KEY or not settings.OPENROUTER_MODEL:
        raise HTTPException(status_code=500, detail="OpenRouter API key or model not configured.")

    headers = {
        "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": settings.OPENROUTER_MODEL,
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(OPENROUTER_API_URL, headers=headers, json=payload, timeout=30.0)
            response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
            
            response_data = response.json()
            if "choices" in response_data and len(response_data["choices"]) > 0:
                return response_data["choices"][0]["message"]["content"]
            else:
                raise HTTPException(status_code=500, detail="Invalid response format from OpenRouter API.")
        except httpx.RequestError as exc:
            raise HTTPException(status_code=500, detail=f"An error occurred while requesting OpenRouter API: {exc}")
        except httpx.HTTPStatusError as exc:
            raise HTTPException(status_code=exc.response.status_code, detail=f"Error from OpenRouter API: {exc.response.text}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
