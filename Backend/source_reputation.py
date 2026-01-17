# source_reputation.py
from urllib.parse import urlparse

SOURCE_METADATA = {
    "pib.gov.in": {
        "name": "Press Information Bureau",
        "type": "Official Government",
        "reliability": "Highest (Official)",
        "focus": "Government Policy & Official Clarifications",
        "certified": True
    },
    "boomlive.in": {
        "name": "Boom Live",
        "type": "Fact-Checker",
        "reliability": "High (Verified)",
        "focus": "Social Media & Viral Misinformation",
        "certified": True,
        "badge": "IFCN Member"
    },
    "factly.in": {
        "name": "Factly",
        "type": "Fact-Checker",
        "reliability": "High (Verified)",
        "focus": "Data-Driven Fact Checking",
        "certified": True,
        "badge": "IFCN Member"
    },
    "thehindu.com": {
        "name": "The Hindu",
        "type": "Major Media",
        "reliability": "High (Editorial)",
        "focus": "National News & Policy Analysis",
        "certified": False
    },
    "indianexpress.com": {
        "name": "Indian Express",
        "type": "Major Media",
        "reliability": "High (Editorial)",
        "focus": "Investigative Journalism",
        "certified": False
    }
}

def get_source_profile(url):
    """Extracts domain and returns reputation data."""
    try:
        domain = urlparse(url).netloc.replace("www.", "")
        # Always return the full object shape even for unknown domains
        return SOURCE_METADATA.get(domain, {
            "name": domain if domain else "External Source",
            "type": "Web Source",
            "reliability": "Standard",
            "focus": "General Content",
            "certified": False,
            "badge": None
        })
    except:
        return {
            "name": "External Source",
            "type": "Web Source",
            "reliability": "Unverified",
            "focus": "General Content",
            "certified": False,
            "badge": None
        }