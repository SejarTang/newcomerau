import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string


def clean_and_select_words(text):


    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text)


    filtered_words = []
    seen = set()
    for word in words:
        word = word.lower()
        if word in stop_words:
            continue
        if word in string.punctuation or not word.isalpha():
            continue
        if word not in seen:
            seen.add(word)
            filtered_words.append(word)


    return filtered_words
