import sys
import easyocr
from word_filter import clean_and_select_words

def extract_text_from_image(image_path):
    reader = easyocr.Reader(['en'])
    result = reader.readtext(image_path, detail=0)
    return " ".join(result)

if __name__ == "__main__":
    if len(sys.argv) < 2:

        sys.exit(1)

    image_path = sys.argv[1]


    full_text = extract_text_from_image(image_path)


    filtered_words = clean_and_select_words(full_text)
