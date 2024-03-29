import sys
import pytesseract
from PIL import Image
import io
import fitz

# Get PDF file path from command-line arguments
pdf_path = sys.argv[1]

# Open PDF file
pdf_document = fitz.open(pdf_path)

# Iterate over each page in the PDF
for page_number in range(pdf_document.page_count):
    # Get the page
    page = pdf_document.load_page(page_number)

    # Render the page to a Pixmap
    pixmap = page.get_pixmap()

    # Convert Pixmap to bytes
    img_bytes = pixmap.samples

    # Convert bytes to PIL Image
    pil_image = Image.frombytes("RGB", [pixmap.width, pixmap.height], img_bytes)

    # Perform OCR using pytesseract
    ocr_result = pytesseract.image_to_string(pil_image)

    # Print OCR result
    print(ocr_result)
