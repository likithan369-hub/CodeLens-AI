from app.services.gemini_service import generate_ai_review

code = """
def add(a, b):
    return a + b
"""

result = generate_ai_review(code)

print(result)

