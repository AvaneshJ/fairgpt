import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

load_dotenv()

def initialize_firebase():
    # 1. Try to get the JSON string from .env
    config_json_str = os.getenv("__firebase_config")
    
    if not config_json_str:
        print("❌ FATAL: FIREBASE_CONFIG_JSON not found in environment.")
        return None

    try:
        # 2. Parse string to dict
        config_dict = json.loads(config_json_str)
        
        # 3. Validation Check: Ensure 'type' exists
        if config_dict.get("type") != "service_account":
            print("❌ FATAL: JSON is missing 'type': 'service_account'. Check your .env formatting.")
            return None

        # 4. Initialize
        if not firebase_admin._apps:
            cred = credentials.Certificate(config_dict)
            firebase_admin.initialize_app(cred)
            print("✅ Firebase initialized successfully using .env credentials.")
        
        return firestore.client()

    except json.JSONDecodeError:
        print("❌ FATAL: Failed to parse .env string as JSON. Check for quotes/syntax.")
        return None
    except Exception as e:
        print(f"❌ FATAL: Unexpected Error: {e}")
        return None

# Create the global instance used by the pipeline
DB = initialize_firebase()