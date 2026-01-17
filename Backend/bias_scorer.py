import os
from database_setup import DB
from config import LOADED_WORDS, RAW_NEWS_COLLECTION

app_id = os.getenv('APP_ID', 'default_app_id')

def calculate_bias_score(text: str) -> float:
    """Calculates a normalized score based on the density of loaded words."""
    if not text: return 0.0
    
    words = text.lower().split()
    total_words = len(words)
    if total_words == 0: return 0.0
    
    # Flatten the LOADED_WORDS dictionary for easy counting
    all_loaded_terms = [item for sublist in LOADED_WORDS.values() for item in sublist]
    
    found_count = sum(1 for word in words if any(term in word for term in all_loaded_terms))
    
    # Return ratio of loaded words to total words
    return round(found_count / total_words, 4)

def score_stored_articles():
    """Iterates through Firestore and updates articles with their bias scores."""
    if not DB: return

    # artifacts -> {app_id} -> public -> data -> raw_news_articles
    collection_ref = DB.collection('artifacts').document(app_id).collection('public') \
                       .document('data').collection(RAW_NEWS_COLLECTION)
    
    docs = collection_ref.get()
    print(f"🔎 Analyzing {len(docs)} articles for bias...")
    
    batch = DB.batch()
    for doc in docs:
        data = doc.to_dict()
        # Analyze both title and summary
        full_text = f"{data.get('title', '')} {data.get('summary_text', '')}"
        score = calculate_bias_score(full_text)
        
        # Update the document with the new score
        batch.update(doc.reference, {"bias_score": score})
        
    batch.commit()
    print("✅ Bias scoring complete. Firestore updated.")

if __name__ == "__main__":
    score_stored_articles()