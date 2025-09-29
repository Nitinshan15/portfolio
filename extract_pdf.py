import fitz  # PyMuPDF
import sys
import os

def extract_text_from_pdf(pdf_path):
    try:
        # Open the PDF file
        doc = fitz.open(pdf_path)
        text_content = []
        
        # Extract text from each page
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text = page.get_text()
            text_content.append(f"=== Page {page_num + 1} ===\n{text}\n")
        
        doc.close()
        return "\n".join(text_content)
    
    except Exception as e:
        return f"Error reading PDF: {str(e)}"

if __name__ == "__main__":
    pdf_path = "NitinshanFredrick_CV.pdf"
    if os.path.exists(pdf_path):
        content = extract_text_from_pdf(pdf_path)
        print(content)
    else:
        print(f"PDF file not found: {pdf_path}")