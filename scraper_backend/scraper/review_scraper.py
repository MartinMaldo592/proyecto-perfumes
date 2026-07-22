import sys
import urllib.request
import json
import re
from typing import List, Dict, Any
from bs4 import BeautifulSoup

class ReviewScraper:
    """Scrapes customer reviews and customer photo URLs from Judge.me widget on Lattafa USA store."""

    def __init__(self, base_url: str = "https://www.lattafa-usa.com"):
        self.base_url = base_url.rstrip("/")

    def fetch_product_reviews(self, product_handles: List[str]) -> List[Dict[str, Any]]:
        scraped_reviews = []
        review_id = 1
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }

        for handle in product_handles:
            url = f"{self.base_url}/products/{handle}"
            try:
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req) as resp:
                    html = resp.read().decode('utf-8', errors='ignore')
                    soup = BeautifulSoup(html, "html.parser")

                    title_el = soup.find("h1")
                    product_title = title_el.get_text(strip=True) if title_el else handle.replace("-", " ").title()

                    thumb_el = soup.find("img", class_=lambda c: c and ("product" in c or "featured" in c))
                    product_thumb = thumb_el.get("src") if thumb_el else ""
                    if product_thumb and product_thumb.startswith("//"):
                        product_thumb = "https:" + product_thumb

                    rev_divs = soup.find_all("div", class_=lambda c: c and "jdgm-rev " in c)

                    for rev in rev_divs:
                        author_el = rev.find(class_=lambda c: c and "jdgm-rev__author" in c)
                        author = author_el.get_text(strip=True) if author_el else "Verified Customer"

                        rating_el = rev.find(class_=lambda c: c and "jdgm-rev__rating" in c)
                        rating = int(float(rating_el.get("data-score", 5))) if rating_el else 5

                        body_el = rev.find(class_=lambda c: c and "jdgm-rev__body" in c)
                        body = body_el.get_text(strip=True) if body_el else ""

                        photos = []
                        for a in rev.find_all("a", class_=lambda c: c and "jdgm-rev__pic-link" in c):
                            href = a.get("href")
                            if href:
                                photos.append(href)

                        for img in rev.find_all("img"):
                            src = img.get("data-master") or img.get("src")
                            if src and "judge.me" in src:
                                photos.append(src)

                        photos = list(set(photos))

                        if body and len(body) > 3:
                            scraped_reviews.append({
                                "id": review_id,
                                "author": author,
                                "verified": True,
                                "rating": rating,
                                "comment": body,
                                "productTitle": product_title,
                                "handle": handle,
                                "photos": photos,
                                "photo": photos[0] if photos else product_thumb,
                                "productThumb": product_thumb
                            })
                            review_id += 1
            except Exception as e:
                print(f"[ReviewScraper] Error fetching {url}: {e}")

        return scraped_reviews
