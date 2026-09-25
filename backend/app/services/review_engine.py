def generate_review(analysis):

    review_comments = []

    # Formatting checks
    if analysis["empty_lines"] > 3:
        review_comments.append(
            "Too many empty lines. Consider improving formatting."
        )

    # TODO checks
    if analysis["todo_count"] > 0:
        review_comments.append(
            "Resolve TODO comments before production deployment."
        )

    # Function/modularity checks
    if analysis["function_count"] == 0:
        review_comments.append(
            "No functions detected. Consider modularizing code."
        )

    # Documentation checks
    if analysis["comment_lines"] == 0:
        review_comments.append(
            "Add comments for better code readability."
        )

    # File size checks
    if analysis["total_lines"] > 100:
        review_comments.append(
            "Large file detected. Consider splitting into smaller modules."
        )

    # Maintainability checks
    if analysis["function_count"] > 15:
        review_comments.append(
            "Many functions detected. Consider organizing related functions "
            "into separate modules or classes."
        )

    # Overall result
    if not review_comments:
        review_comments.append(
            "Code structure looks clean."
        )

    return review_comments