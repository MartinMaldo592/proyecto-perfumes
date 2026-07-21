import os
from pathlib import Path

# Base Paths
BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
OUTPUT_DIR = BASE_DIR / "output"
IMAGES_DIR = OUTPUT_DIR / "images"
FRONTEND_DATA_DIR = ROOT_DIR / "public" / "data"

# Ensure directories exist
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
FRONTEND_DATA_DIR.mkdir(parents=True, exist_ok=True)

# Scraper Settings
DEFAULT_STORE_URL = "https://www.lattafa-usa.com"
PRODUCTS_LIMIT_PER_PAGE = 250
REQUEST_TIMEOUT = 15
MAX_RETRIES = 3
DELAY_BETWEEN_PAGES = 0.5  # Seconds to wait between requests

DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
}

# Fragrance Classification Keywords
GENDER_KEYWORDS = {
    "Unisex": ["unisex", "unisex fragrance", "unisex perfume", "for men and women", "men & women"],
    "Men": ["men", "pour homme", "for men", "masculine", "him"],
    "Women": ["women", "pour femme", "for women", "feminine", "her"],
}

CONCENTRATION_PATTERNS = [
    "Eau De Parfum", "Eau de Parfum", "EDP",
    "Eau De Toilette", "Eau de Toilette", "EDT",
    "Extrait De Parfum", "Extrait de Parfum", "Parfum",
    "Body Spray", "Attar", "Perfume Oil"
]
