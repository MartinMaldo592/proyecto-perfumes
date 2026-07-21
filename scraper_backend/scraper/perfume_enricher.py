import re
from bs4 import BeautifulSoup
from typing import Dict, List, Any, Optional
from config import GENDER_KEYWORDS, CONCENTRATION_PATTERNS, DEFAULT_STORE_URL

class PerfumeEnricher:
    """
    Enriches raw Shopify product records with perfume-specific metadata:
    - Olfactory Pyramid (Top, Middle, Base Notes)
    - Target Gender (Unisex, Men, Women)
    - Concentration (EDP, EDT, Extrait, etc.)
    - Volume / Size (ml, oz)
    - Pricing, Discounts, and Stock Status
    - Flattened Variants & Image Collections
    """

    @staticmethod
    def clean_html(html_content: Optional[str]) -> str:
        """Converts HTML description to clean plain text."""
        if not html_content:
            return ""
        soup = BeautifulSoup(html_content, "html.parser")
        text = soup.get_text(separator="\n").strip()
        # Clean multiple blank lines
        return re.sub(r"\n\s*\n", "\n", text)

    @classmethod
    def extract_notes(cls, text: str) -> Dict[str, str]:
        """
        Parses Top, Heart/Middle, and Base notes from product text.
        """
        notes = {
            "top_notes": "",
            "heart_notes": "",
            "base_notes": "",
            "all_notes_raw": ""
        }
        
        if not text:
            return notes

        # Regex patterns for notes
        top_match = re.search(r"(?:Top|Head|Salida)\s*Notes?\s*:?\s*([^\n\.]+)", text, re.IGNORECASE)
        heart_match = re.search(r"(?:Heart|Middle|Coraz[óo]n)\s*Notes?\s*:?\s*([^\n\.]+)", text, re.IGNORECASE)
        base_match = re.search(r"(?:Base|Bottom|Fondo)\s*Notes?\s*:?\s*([^\n\.]+)", text, re.IGNORECASE)

        if top_match:
            notes["top_notes"] = top_match.group(1).strip()
        if heart_match:
            notes["heart_notes"] = heart_match.group(1).strip()
        if base_match:
            notes["base_notes"] = base_match.group(1).strip()

        # Fallback: Search for general Fragrance Notes line
        if not (notes["top_notes"] or notes["heart_notes"] or notes["base_notes"]):
            frag_match = re.search(r"(?:Fragrance Notes|Notes|Notas)\s*:?\s*([^\n\.]+)", text, re.IGNORECASE)
            if frag_match:
                notes["all_notes_raw"] = frag_match.group(1).strip()

        return notes

    @classmethod
    def detect_gender(cls, title: str, tags: List[str], description: str) -> str:
        """Determines target gender classification."""
        search_space = f"{title} {' '.join(tags)} {description}".lower()
        
        for gender, keywords in GENDER_KEYWORDS.items():
            for kw in keywords:
                if re.search(rf"\b{re.escape(kw)}\b", search_space):
                    return gender
                    
        return "Unisex"  # Default fallback for lattafa fragrances

    @classmethod
    def detect_concentration(cls, title: str, tags: List[str], description: str) -> str:
        """Extracts perfume concentration type."""
        search_space = f"{title} {' '.join(tags)} {description}"
        
        for conc in CONCENTRATION_PATTERNS:
            if re.search(rf"\b{re.escape(conc)}\b", search_space, re.IGNORECASE):
                return conc
                
        return "Eau De Parfum"  # Common default for Lattafa

    @classmethod
    def extract_volume(cls, title: str, tags: List[str], description: str) -> str:
        """Extracts bottle volume/size (e.g. 100ml / 3.4 oz)."""
        search_space = f"{title} {' '.join(tags)} {description}"
        
        match_ml = re.search(r"(\d+(?:\.\d+)?)\s*(?:ml|ML|Ml)\b", search_space)
        match_oz = re.search(r"(\d+(?:\.\d+)?)\s*(?:oz|OZ|Oz|fl\.?\s*oz)\b", search_space, re.IGNORECASE)

        results = []
        if match_ml:
            results.append(f"{match_ml.group(1)} ml")
        if match_oz:
            results.append(f"{match_oz.group(1)} oz")

        return " / ".join(results) if results else "N/A"

    @classmethod
    def process_product(cls, raw: Dict[str, Any], base_url: str = DEFAULT_STORE_URL) -> Dict[str, Any]:
        """
        Transforms raw Shopify product dictionary into an enriched, structured record.
        """
        title = raw.get("title", "")
        handle = raw.get("handle", "")
        vendor = raw.get("vendor", "Lattafa")
        product_type = raw.get("product_type", "")
        tags = raw.get("tags", [])
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(",") if t.strip()]

        raw_body = raw.get("body_html", "")
        plain_desc = cls.clean_html(raw_body)
        
        # Perfume attributes
        notes = cls.extract_notes(plain_desc)
        gender = cls.detect_gender(title, tags, plain_desc)
        concentration = cls.detect_concentration(title, tags, plain_desc)
        volume = cls.extract_volume(title, tags, plain_desc)

        # Product URL
        product_url = f"{base_url}/products/{handle}"

        # Process Variants
        variants = raw.get("variants", [])
        prices = []
        compare_prices = []
        is_available = False
        flattened_variants = []

        for v in variants:
            price = float(v.get("price", 0) or 0)
            comp = float(v.get("compare_at_price", 0) or 0) if v.get("compare_at_price") else None
            available = bool(v.get("available", True))
            
            prices.append(price)
            if comp:
                compare_prices.append(comp)
            if available:
                is_available = True

            flattened_variants.append({
                "variant_id": v.get("id"),
                "variant_title": v.get("title"),
                "sku": v.get("sku", ""),
                "price": price,
                "compare_at_price": comp or "",
                "available": available,
                "weight_g": v.get("grams", 0),
                "barcode": v.get("barcode", "")
            })

        min_price = min(prices) if prices else 0.0
        max_price = max(prices) if prices else 0.0
        min_compare = min(compare_prices) if compare_prices else None
        
        discount_percent = 0.0
        if min_compare and min_compare > min_price:
            discount_percent = round(((min_compare - min_price) / min_compare) * 100, 1)

        # Images
        images_raw = raw.get("images", [])
        image_urls = [img.get("src") for img in images_raw if img.get("src")]
        main_image = image_urls[0] if image_urls else ""

        return {
            "id": raw.get("id"),
            "title": title,
            "handle": handle,
            "vendor": vendor,
            "product_type": product_type,
            "gender": gender,
            "concentration": concentration,
            "volume": volume,
            "top_notes": notes["top_notes"],
            "heart_notes": notes["heart_notes"],
            "base_notes": notes["base_notes"],
            "all_notes_raw": notes["all_notes_raw"],
            "min_price": min_price,
            "max_price": max_price,
            "compare_at_price": min_compare or "",
            "discount_percent": discount_percent,
            "is_available": is_available,
            "total_variants": len(variants),
            "url": product_url,
            "main_image": main_image,
            "all_images": image_urls,
            "tags": ", ".join(tags),
            "created_at": raw.get("created_at", ""),
            "published_at": raw.get("published_at", ""),
            "description_plain": plain_desc,
            "description_html": raw_body,
            "variants": flattened_variants
        }
