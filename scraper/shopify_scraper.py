import time
import requests
import logging
from urllib.parse import urlparse
from typing import List, Dict, Any, Optional, Callable

from config import DEFAULT_STORE_URL, PRODUCTS_LIMIT_PER_PAGE, REQUEST_TIMEOUT, MAX_RETRIES, DELAY_BETWEEN_PAGES, DEFAULT_HEADERS

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class ShopifyScraper:
    """
    High-performance, resilient scraper for Shopify storefronts.
    Uses Shopify's native JSON APIs to fetch complete catalog datasets.
    """

    def __init__(self, base_url: str = DEFAULT_STORE_URL):
        self.base_url = self._clean_url(base_url)
        self.session = requests.Session()
        self.session.headers.update(DEFAULT_HEADERS)

    @staticmethod
    def _clean_url(url: str) -> str:
        """Ensures valid http/https schema and removes trailing slashes."""
        url = url.strip()
        if not url.startswith(("http://", "https://")):
            url = f"https://{url}"
        parsed = urlparse(url)
        return f"{parsed.scheme}://{parsed.netloc}"

    def test_connection(self) -> bool:
        """Tests if the target URL is a reachable Shopify store."""
        endpoint = f"{self.base_url}/products.json?limit=1"
        try:
            res = self.session.get(endpoint, timeout=REQUEST_TIMEOUT)
            if res.status_code == 200 and "products" in res.json():
                return True
        except Exception as e:
            logging.error(f"Connection test failed for {self.base_url}: {e}")
        return False

    def fetch_page(self, page: int = 1, limit: int = PRODUCTS_LIMIT_PER_PAGE) -> List[Dict[str, Any]]:
        """
        Fetches a single page of products from Shopify JSON endpoint with retry logic.
        """
        endpoint = f"{self.base_url}/products.json?limit={limit}&page={page}"
        
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                response = self.session.get(endpoint, timeout=REQUEST_TIMEOUT)
                
                if response.status_code == 200:
                    data = response.json()
                    return data.get("products", [])
                
                elif response.status_code == 429:
                    wait_time = attempt * 2
                    logging.warning(f"Rate limited (429). Retrying in {wait_time}s... (Attempt {attempt}/{MAX_RETRIES})")
                    time.sleep(wait_time)
                else:
                    logging.warning(f"HTTP {response.status_code} on page {page}. Attempt {attempt}/{MAX_RETRIES}")
                    time.sleep(1)
            except requests.RequestException as e:
                logging.warning(f"Request error on page {page}: {e}. Attempt {attempt}/{MAX_RETRIES}")
                time.sleep(1)
                
        return []

    def fetch_all_products(
        self,
        max_pages: Optional[int] = None,
        progress_callback: Optional[Callable[[int, int], None]] = None
    ) -> List[Dict[str, Any]]:
        """
        Iterates over all pages until no more products are returned or max_pages is reached.
        """
        all_products = []
        page = 1
        
        logging.info(f"Starting product extraction from {self.base_url}...")

        while True:
            if max_pages and page > max_pages:
                logging.info(f"Reached user-specified max_pages limit: {max_pages}")
                break

            products = self.fetch_page(page=page)
            if not products:
                logging.info(f"No more products found on page {page}. Scraping finished.")
                break

            all_products.extend(products)
            count = len(products)
            total = len(all_products)
            logging.info(f"Page {page}: Fetched {count} products. Total accumulated: {total}")

            if progress_callback:
                progress_callback(page, total)

            page += 1
            time.sleep(DELAY_BETWEEN_PAGES)

        return all_products

    def fetch_collections(self) -> List[Dict[str, Any]]:
        """Fetches public store collections if available."""
        endpoint = f"{self.base_url}/collections.json"
        try:
            res = self.session.get(endpoint, timeout=REQUEST_TIMEOUT)
            if res.status_code == 200:
                return res.json().get("collections", [])
        except Exception as e:
            logging.warning(f"Could not fetch collections: {e}")
        return []
