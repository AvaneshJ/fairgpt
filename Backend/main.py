from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from google import genai
from google.genai import types
from rag_engine import generate_hybrid_rag_news 
import asyncio
app = FastAPI(title="FairGPT Unbiased News API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini Client for Vision
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class NewsQuery(BaseModel):
    query: str

@app.post("/api/search")
async def search_news(data: NewsQuery):
    api_key = os.getenv("API_KEY")
    result = generate_hybrid_rag_news(data.query, api_key)
    return result

# 🟢 NEW: MULTIMODAL MEDIA VERIFICATION ENDPOINT
@app.post("/api/verify-media")
async def verify_media(file: UploadFile = File(...)):
    try:
        # 🟢 FIX: Set a hard 60-second limit for the entire AI process
        return await asyncio.wait_for(process_media_logic(file), timeout=60.0)
    except asyncio.TimeoutError:
        raise HTTPException(status_code=504, detail="AI processing took too long.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def process_media_logic(file):
    await file.seek(0)
    file_bytes = await file.read()
    
    # 🟢 2026 ACTIVE MODELS: Replaces retired 1.5 versions
    models_to_try = [
        "gemini-3-flash-preview", # Newest 2026 model
        
    ]
    
    extraction_prompt = (
            "You are an expert news analyst. Read the text in this image. "
            "Identify the main news claim. Output ONLY a 1-sentence search query. "
            "CRITICAL: The entire response MUST be under 300 characters."
        )
    
    for model_name in models_to_try:
        try:
            print(f"🤖 Scanning with {model_name}...")
            response = client.models.generate_content(
                model=model_name,
                contents=[
                    types.Part.from_bytes(data=file_bytes, mime_type=file.content_type),
                    extraction_prompt
                ]
            )
            extracted_query = response.text.strip()
            if extracted_query:
                # 🟢 PROCEED TO RAG: Use your existing generate_hybrid_rag_news here
                verification_data = generate_hybrid_rag_news(extracted_query, os.getenv("API_KEY"))
                verification_data["extractedQuery"] = extracted_query
                return verification_data
        except Exception as e:
            if "429" in str(e):
                print(f"⚠️ {model_name} Quota Full, trying next...")
                continue
            if "404" in str(e):
                print(f"⚠️ {model_name} Retired or Not Found.")
                continue
            raise e
    return {"status": "FAIL", "summary": "All models exhausted."}
@app.get("/")
def home():
    return {"message": "FairGPT Backend is Live!"}