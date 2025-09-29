import pypdf
import sys
import os

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = pypdf.PdfReader(file)
            text_content = []
            
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                text_content.append(f"=== Page {page_num + 1} ===\n{text}\n")
            
            return "\n".join(text_content)
    
    except Exception as e:
        return f"Error reading PDF: {str(e)}"

if __name__ == "__main__":
    pdf_path = "NitinshanFredrick_CV.pdf"
    if os.path.exists(pdf_path):
        content = extract_text_from_pdf(pdf_path)
        print(content)
        
        # Save to a text file for easier reading
        with open("cv_extracted.txt", "w", encoding="utf-8") as f:
            f.write(content)
        print("\n\nContent also saved to cv_extracted.txt")
    else:
        print(f"PDF file not found: {pdf_path}")