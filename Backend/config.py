# ========================================================================
# CONFIGURATION FILE (config.py)
# Holds all constants, external URLs, and API prompts.
# ========================================================================

import os
from typing import List, Dict, Any

# --- FIREBASE & API CONFIGURATION ---
# These globals are injected by the Canvas environment. They MUST be used.
APP_ID = os.getenv("API_KEY") # This will be set by the environment
FIREBASE_CONFIG = {} # This will be set by the environment
# Add this line to your config.py
API_URL_BASE = "https://generativelanguage.googleapis.com"

# Gemini API Model for Generation and Grounding
MODEL_NAME = "gemini-2.5-flash-preview-09-2025"
MAX_RETRIES = 3
API_TIMEOUT = 60 # Seconds

# --- AI SYSTEM INSTRUCTION (Core of P2.3) ---
SYSTEM_INSTRUCTION = """
You are FairGPT, a high-integrity news verification agent. 
Analyze the provided context to verify the query.

RESPONSE FORMAT:
[SUMMARY] 2-3 sentence narrative explanation of the verdict.
[CLARIFICATION] Bullet points of key facts.
[AUDIT] Bullet points of verification steps.
[LOGIC_AUDIT] Identify any logical fallacies (e.g., ad hominem, strawman, slippery slope) or state "No significant fallacies detected."
[CONFIDENCE] Provide a single integer (0-100) representing how well the context supports your answer.

RULES:
1. CITATIONS: Explicitly mention 'Boom Live', 'Factly', or 'PIB' if they appear in context.
2. TONE: Strictly neutral.
3. NO HALLUCINATION: If context is missing the answer, set CONFIDENCE to 0 and state it's unverified.
4. No URLs in text.
"""

# --- GOLD STANDARD SOURCES (Based on Data Scientist's List) ---
# NOTE: The Backend Developer must find active RSS feeds or web pages for these.

# Database Collection Names
RAW_NEWS_COLLECTION = "raw_news_articles"
FACT_CHECKS_COLLECTION = "fact_checks_verdicts"

# 1. RSS/Agency Sources (For bulk, neutral content scraping)
# --- DIVERSIFIED RSS SOURCES (Balanced Perspective) ---
RSS_SOURCES: Dict[str, str] = {
    # National & Politics (Balanced General News)
    "The Hindu": "https://www.thehindu.com/feeder/default.rss",
    "Indian Express": "https://indianexpress.com/feed/",
    "Times of India": "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms", # India News
    
    # Business & Economy (Crucial for Financial Ethicality)
    "LiveMint": "https://www.livemint.com/rss/news",
    "Financial Express": "https://www.financialexpress.com/economy/feed/",
    "Economic Times": "https://economictimes.indiatimes.com/rssfeeds/default.cms",
    
    # Official Government Updates
    "PIB National": "https://pib.gov.in/RssXml.aspx?mndId=1",
    
    # Tech & Science (For Non-Political Verification)
    "Gadgets 360": "https://feeds.feedburner.com/gadgets360-latest",
    "Science Wire": "https://science.thewire.in/feed/"
}

# 2. Fact-Checker Sources (For Claims and Verdicts via HTML scraping)
# Note: The 'scraper.py' logic needs to be adapted for each of these URLs.
FACT_CHECK_SOURCES: Dict[str, str] = {
    "BOOM Live": "https://www.boomlive.in/fact-check",
    "India Today Fact Check": "https://www.indiatoday.in/fact-check",
    "Factly": "https://factly.in/category/fact-check/"
    # Add other sources like 'Newschecker', 'Vishvas News' after prototyping
}
# --- BIAS & SENSATIONALISM CONFIG ---
LOADED_WORDS = {
    "sensationalist": ["shocking", "disaster", "historic", "shameful", "triumph", "miracle", "chaos", "brutal"],
    "political_bias": ["masterstroke", "puppet", "anti-national", "fascist", "dictator", "scam"],
    "speculative": ["may be", "could lead to", "rumored", "allegedly", "sources claim"]
}

BIAS_THRESHOLD = 0.25  # Articles above this score will be flagged