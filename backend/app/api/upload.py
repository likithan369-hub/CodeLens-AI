from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils.validators import validate_file_extension
from app.services.code_analyzer import analyze_code
from app.services.review_engine import generate_review
from app.services.gemini_service import generate_ai_review

router = APIRouter()


@router.post("/upload")
async def upload_code(file: UploadFile = File(...)):

    # 1. Validate file type
    if not validate_file_extension(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only .py, .java, and .js files are allowed."
        )

    # 2. Read uploaded file
    content = await file.read()

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )

    # 3. Decode source code
    try:
        decoded_content = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Unable to read the file. Please upload a UTF-8 encoded source file."
        )

    # 4. Perform static code analysis
    analysis = analyze_code(decoded_content)

    # 5. Generate rule-based review
    review = generate_review(analysis)

    # 6. Generate AI-powered review
    ai_review = generate_ai_review(decoded_content)

    # 7. Return complete review
    return {
        "filename": file.filename,
        "source_code": decoded_content,
        "analysis": analysis,
        "ai_review": review,
        "gemini_review": ai_review
    }