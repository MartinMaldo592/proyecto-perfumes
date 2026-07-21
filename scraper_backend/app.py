import os
import streamlit as st
import pandas as pd
from pathlib import Path

from config import DEFAULT_STORE_URL, OUTPUT_DIR, IMAGES_DIR, FRONTEND_DATA_DIR
from scraper.shopify_scraper import ShopifyScraper
from scraper.perfume_enricher import PerfumeEnricher
from scraper.exporter import DataExporter
from scraper.image_downloader import ImageDownloader

st.set_page_config(
    page_title="Lattafa Shopify Perfume Scraper & Analytics",
    page_icon="🧴",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS styling
st.markdown("""
    <style>
    .main-title {
        font-size: 2.3rem;
        font-weight: 700;
        color: #1F4E78;
        margin-bottom: 0.2rem;
    }
    .sub-title {
        font-size: 1.1rem;
        color: #555555;
        margin-bottom: 2rem;
    }
    .metric-card {
        background-color: #f8f9fa;
        border-radius: 10px;
        padding: 15px;
        border-left: 5px solid #1F4E78;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .perfume-card {
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        padding: 15px;
        background-color: #ffffff;
        margin-bottom: 15px;
        transition: transform 0.2s;
    }
    .perfume-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .badge-unisex { background-color: #6c5ce7; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.8rem; }
    .badge-men { background-color: #0984e3; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.8rem; }
    .badge-women { background-color: #e84393; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.8rem; }
    </style>
""", unsafe_allow_html=True)

st.markdown('<div class="main-title">🧴 Lattafa Shopify Perfume Scraper & Analytics</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-title">Professional Catalog Extractor, Fragrance Notes Analyzer & Excel Report Generator</div>', unsafe_allow_html=True)

# Sidebar Configuration
st.sidebar.header("⚙️ Scraper Configuration")
target_url = st.sidebar.text_input("Store URL", value=DEFAULT_STORE_URL)
max_pages = st.sidebar.number_input("Max Pages (0 = all)", min_value=0, max_value=100, value=0)
download_imgs = st.sidebar.checkbox("Download Product Images", value=False)

start_scraping = st.sidebar.button("🚀 Start Web Scraping", type="primary", use_container_width=True)

# Initialize Session State for Data Storage
if "scraped_data" not in st.session_state:
    st.session_state.scraped_data = []

if start_scraping:
    st.session_state.scraped_data = []
    scraper = ShopifyScraper(base_url=target_url)

    with st.spinner("Testing store connection..."):
        if not scraper.test_connection():
            st.error(f"Could not connect to Shopify store endpoint at {target_url}. Check URL or network.")
            st.stop()
        st.success("Connected to Shopify Storefront API!")

    progress_bar = st.progress(0)
    status_text = st.empty()

    def progress_callback(page: int, total: int):
        status_text.text(f"Scraping Page {page}... Total perfumes extracted: {total}")
        progress_bar.progress(min(page / 20, 1.0))

    pages_to_scrape = max_pages if max_pages > 0 else None
    raw_products = scraper.fetch_all_products(max_pages=pages_to_scrape, progress_callback=progress_callback)

    if raw_products:
        status_text.text("Enriching fragrance notes and processing pricing...")
        enriched = [PerfumeEnricher.process_product(p, base_url=scraper.base_url) for p in raw_products]
        st.session_state.scraped_data = enriched
        
        # Save output files
        exporter = DataExporter(OUTPUT_DIR)
        exporter.export_excel(enriched)
        exporter.export_csv(enriched)
        exporter.export_json(enriched)
        DataExporter(FRONTEND_DATA_DIR).export_json(enriched)

        if download_imgs:
            status_text.text("Downloading high-resolution product images...")
            downloader = ImageDownloader(IMAGES_DIR)
            downloader.download_product_images(enriched)

        progress_bar.progress(1.0)
        st.success(f"Scraping completed! {len(enriched)} perfumes scraped & enriched.")
    else:
        st.warning("No products found.")

# Display Scraped Data & Analytics Dashboard
if st.session_state.scraped_data:
    data = st.session_state.scraped_data
    df = pd.DataFrame(data)

    # Executive Metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Perfumes", len(df))
    with col2:
        avg_p = df["min_price"].mean() if "min_price" in df else 0
        st.metric("Average Price", f"${avg_p:.2f}")
    with col3:
        in_stock = df["is_available"].sum() if "is_available" in df else 0
        st.metric("In Stock Count", f"{in_stock} ({round(in_stock/len(df)*100, 1)}%)")
    with col4:
        disc_count = (df["discount_percent"] > 0).sum() if "discount_percent" in df else 0
        st.metric("On Sale Items", disc_count)

    st.markdown("---")

    # Export Downloads
    st.subheader("📥 Export & Downloads")
    exporter = DataExporter(OUTPUT_DIR)
    excel_path = OUTPUT_DIR / "lattafa_perfumes_catalog.xlsx"
    csv_path = OUTPUT_DIR / "lattafa_perfumes.csv"
    json_path = OUTPUT_DIR / "lattafa_perfumes.json"

    dcol1, dcol2, dcol3 = st.columns(3)
    if excel_path.exists():
        with dcol1:
            with open(excel_path, "rb") as f:
                st.download_button("📊 Download Excel Workbook (.xlsx)", f, file_name="lattafa_perfumes_catalog.xlsx", mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", use_container_width=True)

    if csv_path.exists():
        with dcol2:
            with open(csv_path, "rb") as f:
                st.download_button("📄 Download CSV Catalog (.csv)", f, file_name="lattafa_perfumes.csv", mime="text/csv", use_container_width=True)

    if json_path.exists():
        with dcol3:
            with open(json_path, "rb") as f:
                st.download_button("🌐 Download JSON Dataset (.json)", f, file_name="lattafa_perfumes.json", mime="application/json", use_container_width=True)

    st.markdown("---")

    # Interactive Filters & Search
    st.subheader("🔎 Search & Filter Perfumes")
    search_col, gender_col, price_col = st.columns([2, 1, 1])

    with search_col:
        query = st.text_input("Search by Title, Notes, or Tag", value="")
    with gender_col:
        gender_filter = st.selectbox("Gender", ["All", "Unisex", "Men", "Women"])
    with price_col:
        max_p_filter = st.slider("Max Price ($)", min_value=0, max_value=int(df["min_price"].max() or 100) + 10, value=int(df["min_price"].max() or 100) + 10)

    # Filter Logic
    filtered_df = df.copy()
    if query:
        q = query.lower()
        filtered_df = filtered_df[
            filtered_df["title"].str.lower().str.contains(q) |
            filtered_df["top_notes"].str.lower().str.contains(q) |
            filtered_df["heart_notes"].str.lower().str.contains(q) |
            filtered_df["base_notes"].str.lower().str.contains(q)
        ]
    if gender_filter != "All":
        filtered_df = filtered_df[filtered_df["gender"] == gender_filter]

    filtered_df = filtered_df[filtered_df["min_price"] <= max_p_filter]

    st.write(f"Showing {len(filtered_df)} of {len(df)} perfumes")

    # Display Options
    tab1, tab2 = st.tabs(["🎴 Visual Gallery", "📋 Data Table"])

    with tab1:
        grid_cols = st.columns(3)
        for idx, row in enumerate(filtered_df.to_dict("records")):
            col = grid_cols[idx % 3]
            with col:
                st.markdown(f"""
                <div class="perfume-card">
                    <h4>{row['title']}</h4>
                    <p><strong>Vendor:</strong> {row['vendor']} | <strong>Volume:</strong> {row['volume']}</p>
                    <p><strong>Gender:</strong> <span class="badge-{row['gender'].lower()}">{row['gender']}</span></p>
                    <p><strong>Price:</strong> <span style="font-size:1.2rem; color:#1F4E78; font-weight:bold;">${row['min_price']:.2f}</span></p>
                    <p><strong>Notes:</strong><br/>
                    • <i>Top:</i> {row['top_notes'] or 'N/A'}<br/>
                    • <i>Heart:</i> {row['heart_notes'] or 'N/A'}<br/>
                    • <i>Base:</i> {row['base_notes'] or 'N/A'}</p>
                    <a href="{row['url']}" target="_blank">🔗 View Product Page</a>
                </div>
                """, unsafe_allow_html=True)
                if row.get("main_image"):
                    st.image(row["main_image"], use_container_width=True)

    with tab2:
        st.dataframe(filtered_df[["title", "gender", "concentration", "volume", "min_price", "is_available", "top_notes", "heart_notes", "base_notes", "url"]], use_container_width=True)

else:
    st.info("👈 Use the sidebar controls to configure and run the scraper against Lattafa USA or any Shopify perfume store.")
