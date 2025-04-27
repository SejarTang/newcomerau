import requests
import time

def get_word_info(word):
    """
    Retrieve phonetic, pronunciation audio, definition, and example sentence for a single word.
    If the word is not found, it will be skipped.
    """
    url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
    try:
        response = requests.get(url)
        if response.status_code == 404:
            print(f"Word not found, skipped: {word}")
            return None  # Skip if the word is not found

        response.raise_for_status()
        data = response.json()

        phonetic = None
        audio = None
        meaning = None
        example = None

        phonetics = data[0].get('phonetics', [])
        for p in phonetics:
            if 'audio' in p and p['audio']:
                phonetic = p.get('text', None)
                audio = p.get('audio', None)
                break

        meanings = data[0].get('meanings', [])
        if meanings:
            definitions = meanings[0].get('definitions', [])
            if definitions:
                meaning = definitions[0].get('definition', None)
                example = definitions[0].get('example', None)

        return {
            "word": word,
            "phonetic": phonetic,
            "audio": audio,
            "meaning": meaning,
            "example": example
        }

    except requests.exceptions.RequestException as e:
        print(f"Request failed for word: {word} - {e}")
        return None

def batch_get_word_info(word_list):
    """
    Retrieve information for a list of words in batch.
    Only words with successful results will be included.
    """
    results = []
    for word in word_list:
        info = get_word_info(word)
        if info:  # Add only if the word info is retrieved successfully
            results.append(info)
        time.sleep(0.5)  # Prevent API rate limiting
    return results
