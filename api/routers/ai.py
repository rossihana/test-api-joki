from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from services.openrouter_service import generate_ai_response
from models.order_models import OrderIn # This is a placeholder import for now

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/generate")
async def generate_ai_response_endpoint(request: PromptRequest):
    try:
        ai_response_content = await generate_ai_response(request.prompt)
        return {"answer": ai_response_content}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"An unexpected error occurred: {e}")
