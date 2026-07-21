import sys
import argparse
from pathlib import Path

# Force UTF-8 encoding for stdout on Windows terminals
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn
from rich.table import Table

from config import DEFAULT_STORE_URL, OUTPUT_DIR, IMAGES_DIR, FRONTEND_DATA_DIR
from scraper.shopify_scraper import ShopifyScraper
from scraper.perfume_enricher import PerfumeEnricher
from scraper.exporter import DataExporter
from scraper.image_downloader import ImageDownloader

console = Console()

def print_banner():
    banner = """
    ===============================================================
       SHOPIFY PERFUME SCRAPER & CATALOG ENRICHER v1.0
       Target: Lattafa USA (https://www.lattafa-usa.com/)
    ===============================================================
    """
    console.print(Panel(banner, style="bold magenta", expand=False))

def main():
    parser = argparse.ArgumentParser(description="Professional Shopify Perfume Web Scraper & Catalog Extractor")
    parser.add_argument("--url", type=str, default=DEFAULT_STORE_URL, help="Target Shopify store URL")
    parser.add_argument("--pages", type=int, default=None, help="Maximum number of pages to scrape")
    parser.add_argument("--download-images", action="store_true", help="Download product images in parallel")
    parser.add_argument("--format", type=str, choices=["all", "excel", "csv", "json"], default="all", help="Output format")
    
    args = parser.parse_args()
    print_banner()

    console.print(f"[bold cyan][+] Initializing Scraper for store:[/bold cyan] {args.url}")
    scraper = ShopifyScraper(base_url=args.url)

    if not scraper.test_connection():
        console.print(f"[bold red][!] Error: Could not connect to Shopify JSON endpoint at {args.url}[/bold red]")
        sys.exit(1)

    console.print("[bold green][OK] Connection successful! Reachable Shopify Storefront.[/bold green]\n")

    # Step 1: Scraping Products
    raw_products = []
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TaskProgressColumn(),
        console=console
    ) as progress:
        task = progress.add_task("[cyan]Fetching product pages...", total=None)

        def progress_cb(page: int, total_accumulated: int):
            progress.update(task, description=f"[cyan]Scraped Page {page} | {total_accumulated} products found...")

        raw_products = scraper.fetch_all_products(max_pages=args.pages, progress_callback=progress_cb)

    if not raw_products:
        console.print("[bold yellow][!] No products extracted from store.[/bold yellow]")
        sys.exit(0)

    console.print(f"\n[bold green][OK] Total raw products fetched: {len(raw_products)}[/bold green]")

    # Step 2: Enriching Perfume Metadata
    console.print("[bold cyan][+] Enriching perfume notes, gender classification, and price analytics...[/bold cyan]")
    enriched_products = []
    for raw in raw_products:
        enriched = PerfumeEnricher.process_product(raw, base_url=scraper.base_url)
        enriched_products.append(enriched)

    # Step 3: Exporting Data
    console.print(f"[bold cyan][+] Exporting data to '{OUTPUT_DIR}'...[/bold cyan]")
    exporter = DataExporter(output_dir=OUTPUT_DIR)

    exported_files = []
    if args.format in ["all", "excel"]:
        excel_path = exporter.export_excel(enriched_products)
        exported_files.append(("Excel Workbook", excel_path))

    if args.format in ["all", "csv"]:
        csv_path = exporter.export_csv(enriched_products)
        exported_files.append(("CSV Catalog", csv_path))

    if args.format in ["all", "json"]:
        json_path = exporter.export_json(enriched_products)
        DataExporter(output_dir=FRONTEND_DATA_DIR).export_json(enriched_products)
        exported_files.append(("JSON Dataset", json_path))

    # Step 4: Download Images (Optional)
    if args.download_images:
        console.print("[bold cyan][+] Downloading product high-res images...[/bold cyan]")
        img_downloader = ImageDownloader(images_dir=IMAGES_DIR)
        stats = img_downloader.download_product_images(enriched_products)
        console.print(f"[bold green][OK] Image download completed: {stats['success']}/{stats['total']} downloaded.[/bold green]")

    # Summary Table
    console.print("\n[bold gold1]================ EXECUTION SUMMARY =================[/bold gold1]")
    summary_table = Table(show_header=True, header_style="bold magenta")
    summary_table.add_column("File Type", style="cyan")
    summary_table.add_column("Destination Path", style="green")

    for file_type, path in exported_files:
        summary_table.add_row(file_type, str(path))

    console.print(summary_table)
    console.print("\n[bold green][SUCCESS] Scraping & Catalog Enrichment finished successfully![/bold green]")

if __name__ == "__main__":
    main()
