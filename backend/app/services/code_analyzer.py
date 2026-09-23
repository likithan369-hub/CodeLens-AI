import re


def analyze_code(source_code: str) -> dict:
    """
    Analyze source code and return basic code-quality metrics.
    """

    lines = source_code.splitlines()

    total_lines = len(lines)

    empty_lines = sum(
        1 for line in lines
        if not line.strip()
    )

    comment_lines = sum(
        1 for line in lines
        if line.strip().startswith(("#", "//", "/*", "*"))
    )

    todo_count = len(
        re.findall(r"\bTODO\b", source_code, re.IGNORECASE)
    )

    function_count = len(
        re.findall(
            r"^\s*(?:def\s+\w+|(?:public|private|protected|static|\s)*"
            r"\w+\s+\w+\s*\([^;]*\)\s*\{|function\s+\w+\s*\()",
            source_code,
            re.MULTILINE
        )
    )

    return {
        "total_lines": total_lines,
        "empty_lines": empty_lines,
        "comment_lines": comment_lines,
        "todo_count": todo_count,
        "function_count": function_count
    }