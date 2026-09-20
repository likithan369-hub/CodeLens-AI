def analyze_code(content):

    lines = content.split("\n")

    total_lines = len(lines)

    empty_lines = 0
    comment_lines = 0
    todo_count = 0
    function_count = 0

    for line in lines:

        stripped = line.strip()

        # Empty lines
        if stripped == "":
            empty_lines += 1

        # Comments
        if stripped.startswith("#"):
            comment_lines += 1

        # TODO detection
        if "TODO" in stripped:
            todo_count += 1

        # Function detection
        if stripped.startswith("def "):
            function_count += 1

    return {
        "total_lines": total_lines,
        "empty_lines": empty_lines,
        "comment_lines": comment_lines,
        "todo_count": todo_count,
        "function_count": function_count
    }