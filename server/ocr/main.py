# server/ocr/main.py
import os
import json
import sys
import nltk

# Download required NLTK resources
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('wordnet')

from ocr_extract import extract_text_from_image
from word_filter import clean_and_select_words
from word_info import batch_get_word_info

def main(image_path):

    full_text = extract_text_from_image(image_path)




    filtered_words = clean_and_select_words(full_text)



    word_infos = batch_get_word_info(filtered_words)

    # Save the result as a JSON file
    output_path = os.path.join(os.path.dirname(__file__), "ocr_word_info.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(word_infos, f, ensure_ascii=False, indent=2)
    


    return word_infos

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python main.py <image_path>")
    else:
        image_path = sys.argv[1]
        if not os.path.exists(image_path):
            print(f"File not found: {image_path}")
        else:
            main(image_path)
