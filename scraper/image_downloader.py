import os
import requests
import logging
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Dict, Any
from urllib.parse import urlparse

class ImageDownloader:
    """
    Downloads high-resolution perfume images in parallel.
    Organizes output files by product handle: output/images/{product_handle}/1.jpg
    """

    def __init__(self, images_dir: Path, max_workers: int = 8):
        self.images_dir = Path(images_dir)
        self.images_dir.mkdir(parents=True, exist_ok=True)
        self.max_workers = max_workers
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        })

    def download_single_image(self, url: str, save_path: Path) -> bool:
        """Downloads a single image file if it doesn't already exist."""
        if save_path.exists():
            return True

        try:
            # Normalize CDN URLs starting with //
            if url.startswith("//"):
                url = f"https:{url}"
                
            response = self.session.get(url, timeout=15)
            if response.status_code == 200:
                save_path.parent.mkdir(parents=True, exist_ok=True)
                with open(save_path, "wb") as f:
                    f.write(response.content)
                return True
        except Exception as e:
            logging.warning(f"Failed to download image {url}: {e}")
            
        return False

    def download_product_images(self, products: List[Dict[str, Any]]) -> Dict[str, int]:
        """
        Multithreaded downloader for all product images in catalog.
        """
        tasks = []
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            for product in products:
                handle = product.get("handle", "unknown")
                images = product.get("all_images", [])
                
                for idx, img_url in enumerate(images, start=1):
                    if not img_url:
                        continue
                    
                    # Extract file extension
                    parsed_path = urlparse(img_url).path
                    ext = Path(parsed_path).suffix or ".jpg"
                    if "?" in ext:
                        ext = ext.split("?")[0]
                        
                    file_name = f"image_{idx}{ext}"
                    save_path = self.images_dir / handle / file_name
                    tasks.append(executor.submit(self.download_single_image, img_url, save_path))

        success_count = 0
        total_tasks = len(tasks)

        for future in as_completed(tasks):
            if future.result():
                success_count += 1

        logging.info(f"Downloaded {success_count}/{total_tasks} images to {self.images_dir}")
        return {"total": total_tasks, "success": success_count}
