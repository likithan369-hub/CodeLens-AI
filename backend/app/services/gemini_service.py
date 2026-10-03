from google import genai
import os
import json
from dotenv import load_dotenv


load_dotenv()


API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY is not configured.")


client = genai.Client(api_key=API_KEY)


def generate_ai_review(code):

    prompt = f"""
You are an expert software engineer performing a detailed code review.

Analyze the following source code.

Return ONLY valid JSON.
Do not use markdown.
Do not add ```json or ``` around the response.

Use exactly this structure:

{{
    "summary": "Short overall assessment",
    "bugs": [
        {{
            "problem": "What is wrong",
            "why_it_matters": "Why it matters",
            "how_to_improve": "How to improve it"
        }}
    ],
    "security": [
        {{
            "problem": "Security issue",
            "why_it_matters": "Why it matters",
            "how_to_improve": "How to improve it"
        }}
    ],
    "performance": [
        {{
            "problem": "Performance issue",
            "why_it_matters": "Why it matters",
            "how_to_improve": "How to improve it"
        }}
    ],
    "code_quality": [
        "Code quality issue"
    ],
    "maintainability": [
        "Maintainability issue"
    ],
    "suggestions": [
        "Specific actionable suggestion"
    ],
    "score": 0
}}

Rules:
- score must be an integer between 0 and 100.
- If there are no issues in a category, return an empty array.
- Do not invent problems.
- Be practical and specific.
- Return ONLY JSON.

Source code:

{code}
"""

    try:
        interaction = client.interactions.create(
            model="gemini-3.5-flash-lite",
            input=prompt
        )

        response_text = interaction.output_text.strip()

        # Remove accidental markdown code fences
        if response_text.startswith("```"):
            response_text = response_text.replace("```json", "", 1)
            response_text = response_text.replace("```", "", 1)
            response_text = response_text.strip()

        review = json.loads(response_text)

        # Ensure the expected fields exist
        required_fields = [
            "summary",
            "bugs",
            "security",
            "performance",
            "code_quality",
            "maintainability",
            "suggestions",
            "score"
        ]

        for field in required_fields:
            if field not in review:
                review[field] = [] if field != "summary" and field != "score" else (
                    "" if field == "summary" else 0
                )

        return review

    except json.JSONDecodeError:
        return {
            "summary": "Gemini returned an invalid structured response.",
            "bugs": [],
            "security": [],
            "performance": [],
            "code_quality": [],
            "maintainability": [],
            "suggestions": [],
            "score": 0
        }

    except Exception as error:
        return {
            "summary": "Unable to generate AI review at this time.",
            "bugs": [],
            "security": [],
            "performance": [],
            "code_quality": [],
            "maintainability": [],
            "suggestions": [],
            "score": 0,
            "error": str(error)
        }