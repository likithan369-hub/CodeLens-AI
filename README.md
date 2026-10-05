# 🔍 CodeLens AI

### AI-Powered Code Review & Quality Analysis Platform

> **Write better code. Catch issues earlier. Build with confidence.**

CodeLens AI is a developer-focused code review platform that combines **static code analysis, rule-based quality checks, and Generative AI** to analyze source code and provide actionable feedback.

It helps developers identify potential **bugs, security concerns, performance issues, code-quality problems, and maintainability issues** before code reaches production.

---

## 🚀 Why CodeLens AI?

Traditional code analysis tools are good at detecting predefined patterns, while AI tools can provide more contextual feedback.

CodeLens AI combines both approaches:

**Static Analysis + Rule-Based Review + Gemini AI = Comprehensive Code Review**

This hybrid approach provides both measurable code metrics and intelligent recommendations.

---

## ✨ Features

| Feature                       | Description                                               |
| ----------------------------- | --------------------------------------------------------- |
| 📂 **Code Upload**            | Upload Python, Java, or JavaScript source files           |
| 📊 **Static Analysis**        | Analyzes code structure and basic quality metrics         |
| ⚙️ **Rule-Based Review**      | Detects common code-quality issues using predefined rules |
| 🤖 **Gemini AI Review**       | Uses Google Gemini to provide contextual code feedback    |
| 🐛 **Bug Detection**          | Identifies potential logical and implementation issues    |
| 🔐 **Security Analysis**      | Highlights possible security concerns                     |
| ⚡ **Performance Review**      | Detects potential performance improvements                |
| 🧹 **Code Quality**           | Reviews readability, structure, and coding practices      |
| 🏗️ **Maintainability**       | Provides suggestions for cleaner and maintainable code    |
| 📈 **Quality Score**          | Generates an overall AI-based score from 0–100            |
| 💡 **Actionable Suggestions** | Provides practical recommendations for improvement        |
| 🖥️ **Interactive Dashboard** | Displays review results in a clean developer dashboard    |
| 🔌 **REST API**               | Backend exposes an API for programmatic code review       |

---

# 🧠 How CodeLens AI Works

```text
                    Source Code
                         │
                         ▼
              File Validation & Upload
                         │
                         ▼
              Static Code Analysis
                         │
                         ▼
              Rule-Based Review Engine
                         │
                         ▼
                  Gemini AI Review
                         │
                         ▼
              Structured Review Results
                         │
                         ▼
                 Web Dashboard
```

The system follows a hybrid analysis pipeline where deterministic checks are performed first, followed by AI-powered contextual analysis.

---

# 🏗️ System Architecture

```text
┌──────────────────────────────┐
│        Frontend Dashboard    │
│       HTML / CSS / JS        │
└──────────────┬───────────────┘
               │
               │ HTTP POST /upload
               ▼
┌──────────────────────────────┐
│          FastAPI             │
│        Backend API           │
└──────────────┬───────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
┌───────────────┐  ┌─────────────────┐
│ Static Code   │  │ Rule-Based      │
│ Analyzer      │  │ Review Engine   │
└───────┬───────┘  └────────┬────────┘
        │                   │
        └─────────┬─────────┘
                  ▼
        ┌───────────────────┐
        │    Gemini AI      │
        │   Code Review     │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │ Structured Review │
        │     Response      │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │ Frontend Results  │
        │     Dashboard     │
        └───────────────────┘
```

---

# 📊 Static Code Analysis

Before sending code for AI review, CodeLens AI performs basic static analysis.

The analyzer currently calculates:

* Total number of lines
* Empty lines
* Comment lines
* TODO comments
* Number of functions
* Basic source-code statistics

These metrics provide measurable information about the structure of the submitted code.

---

# ⚙️ Rule-Based Review Engine

The rule engine performs deterministic checks against predefined conditions.

Current checks include:

* Excessive empty lines
* Unresolved `TODO` comments
* Missing comments
* No functions detected
* Large source files
* Excessive number of functions
* Basic maintainability concerns

Example:

```text
TODO comments detected
        ↓
Potential unfinished work
        ↓
Recommendation generated
```

This layer ensures that common issues can be detected without depending entirely on an AI model.

---

# 🤖 Gemini-Powered AI Code Review

After static and rule-based analysis, the source code is analyzed using the **Google Gemini API**.

The AI review evaluates:

### 🐛 Bugs

Potential logical or implementation problems.

### 🔐 Security

Potential security risks or unsafe coding practices.

### ⚡ Performance

Possible performance bottlenecks and optimization opportunities.

### 🧹 Code Quality

Readability, structure, naming, documentation, and coding practices.

### 🏗️ Maintainability

Suggestions for making the code easier to modify and maintain.

### 💡 Suggestions

Actionable recommendations for improving the submitted code.

### 📈 Quality Score

An overall score between **0 and 100** based on the AI review.

---

# 🖥️ Developer Dashboard

The frontend provides a centralized dashboard for reviewing the generated results.

It displays:

* Uploaded filename
* Detected programming language
* Source-code preview
* Total lines
* Issues found
* AI quality score
* Review summary
* Bugs
* Security findings
* Performance suggestions
* Code-quality feedback
* Maintainability feedback
* Recommended improvements

---

# 🔌 REST API

CodeLens AI exposes a FastAPI endpoint for code review.

### Endpoint

```http
POST /upload
```

### Supported Files

```text
.py
.java
.js
```

### Example Request

Upload a source-code file using multipart form data.

### Example Response

```json
{
  "filename": "example.py",
  "source_code": "def add(a, b):\n    return a + b",
  "analysis": {
    "total_lines": 2,
    "empty_lines": 0,
    "comment_lines": 0,
    "todo_count": 0,
    "function_count": 1
  },
  "rule_based_review": [
    "Add comments for better code readability."
  ],
  "gemini_review": {
    "summary": "The code is simple and readable.",
    "bugs": [],
    "security": [],
    "performance": [],
    "code_quality": [],
    "maintainability": [],
    "suggestions": [],
    "score": 90
  }
}
```

The exact AI response may vary depending on the submitted source code and model response.

---

# 📁 Project Structure

```text
CodeLens-AI/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── upload.py
│   │   │
│   │   ├── services/
│   │   │   ├── code_analyzer.py
│   │   │   ├── review_engine.py
│   │   │   └── gemini_service.py
│   │   │
│   │   ├── utils/
│   │   │   └── validators.py
│   │   │
│   │   └── main.py
│   │
│   └── test_gemini.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
├── requirements.txt
└── README.md
```

---

# 🛠️ Tech Stack

### Backend

* **Python**
* **FastAPI**
* **Uvicorn**
* **Google Gemini API**

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript**

### Development & Tools

* **Git**
* **GitHub**
* **Python Virtual Environment**
* **REST API**

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/likithan369-hub/CodeLens-AI.git
cd CodeLens-AI
```

## 2. Create a Virtual Environment

```bash
python -m venv venv
```

### Windows PowerShell

```powershell
venv\Scripts\Activate.ps1
```

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🔑 Configure Gemini API

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

The API key should **never be committed to GitHub**.

The `.gitignore` file is configured to exclude sensitive environment files and the virtual environment.

---

# ▶️ Run the Backend

From the project root:

```bash
uvicorn app.main:app --reload --app-dir backend
```

The backend will start at:

```text
http://127.0.0.1:8000
```

### FastAPI Swagger Documentation

Open:

```text
http://127.0.0.1:8000/docs
```

The Swagger interface can be used to test the `/upload` API directly.

---

# 🌐 Run the Frontend

With the backend running, open:

```text
frontend/index.html
```

in a browser.

The frontend communicates with the FastAPI backend and displays the generated code-review results.

---

# 🔐 Security & Validation

CodeLens AI includes several safeguards:

* API keys stored through environment variables
* `.env` excluded from Git
* File-extension validation
* UTF-8 source-code validation
* Structured AI response handling
* API error handling
* Controlled file upload workflow

Sensitive credentials should never be hard-coded or committed to the repository.

---

# ⚠️ Current Limitations

CodeLens AI is currently designed as a focused developer-assistance tool rather than a complete enterprise static-analysis platform.

Current limitations include:

* Supports Python, Java, and JavaScript
* Analysis is primarily file-level
* AI results depend on model availability and response quality
* No persistent review-history database
* No repository-level dependency analysis
* No automated code modification
* No authentication system yet

---

# 🔮 Future Improvements

Planned improvements include:

* 🌐 Support for additional programming languages
* 📐 Cyclomatic complexity analysis
* 🔎 Advanced code-smell detection
* 🧪 Automated unit-test generation
* 🛠️ AI-powered code-fix suggestions
* 📦 Repository-level code analysis
* 🐙 GitHub repository integration
* 🔄 CI/CD integration
* 📊 Review history and analytics
* 🔐 User authentication
* ☁️ Cloud deployment
* 📈 Advanced developer metrics

---

# 🎯 Project Goal

The goal of CodeLens AI is to create a practical developer tool that combines:

```text
Static Analysis
       +
Rule-Based Engineering Checks
       +
Generative AI
       ↓
Actionable Code Review
```

Instead of relying solely on predefined rules or purely AI-generated feedback, CodeLens AI combines both approaches to provide developers with a more useful and understandable review experience.

---

# 👩‍💻 Author

### Likitha N

**Computer Science & Engineering**

Interested in:

* Software Development
* Artificial Intelligence
* Machine Learning
* Developer Tools
* MLOps

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Repository:**
https://github.com/likithan369-hub/CodeLens-AI
