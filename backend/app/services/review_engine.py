def generate_review(analysis):

    review_comments = []

    if analysis["empty_lines"] > 3:
        review_comments.append(
            "Too many empty lines. Consider improving formatting."
        )

    if analysis["todo_count"] > 0:
        review_comments.append(
            "Resolve TODO comments before production deployment."
        )

    if analysis["function_count"] == 0:
        review_comments.append(
            "No functions detected. Consider modularizing code."
        )

    if analysis["comment_lines"] == 0:
        review_comments.append(
            "Add comments for better code readability."
        )

    if analysis["total_lines"] > 100:
        review_comments.append(
            "Large file detected. Consider splitting into modules."
        )

    if len(review_comments) == 0:
        review_comments.append(
            "Code structure looks clean."
        )

    return review_comments