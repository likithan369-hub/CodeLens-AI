from pathlib import Path


ALLOWED_EXTENSIONS = {".py", ".java", ".js"}


def validate_file_extension(filename: str) -> bool:
    """
    Validate whether the uploaded file has an allowed source-code extension.
    """

    if not filename:
        return False

    filename = filename.strip()
    extension = Path(filename).suffix.lower()

    return extension in ALLOWED_EXTENSIONS