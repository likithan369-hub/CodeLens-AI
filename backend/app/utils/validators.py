ALLOWED_EXTENSIONS = [".py", ".java", ".js"]


def validate_file_extension(filename):

    for extension in ALLOWED_EXTENSIONS:

        if filename.endswith(extension):
            return True

    return False