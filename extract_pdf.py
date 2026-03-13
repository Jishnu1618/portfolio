import sys

try:
    import PyPDF2
    reader = PyPDF2.PdfReader('e:\\pORTFOLIO\\01_02_26_Software_Resume.pdf')
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    print(text)
except Exception as e:
    print(f"Failed with PyPDF2: {e}")
    try:
        import fitz  # PyMuPDF
        doc = fitz.open('e:\\pORTFOLIO\\01_02_26_Software_Resume.pdf')
        text = ""
        for page in doc:
            text += page.get_text() + "\n"
        print(text)
    except Exception as e2:
        print(f"Failed with PyMuPDF: {e2}")
