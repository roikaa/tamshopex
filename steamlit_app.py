import streamlit as st
import requests
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import json
import os
from typing import Dict, List, Optional

# Configuration
class Config:
    NEXTJS_API_BASE = os.getenv('NEXTJS_API_BASE', 'http://localhost:3000/api')
    STREAMLIT_TITLE = "TamShopEx Analytics Dashboard"
    
# Initialize session state
if 'authenticated' not in st.session_state:
    st.session_state.authenticated = False
if 'user_data' not in st.session_state:
    st.session_state.user_data = None

class APIClient:
    """Client for interacting with Next.js API endpoints"""
    
    def __init__(self, base_url: str):
        self.base_url = base_url
    
    def get_products(self, params: Dict = None) -> Dict:
        """Fetch products from the Next.js API"""
        try:
            url = f"{self.base_url}/products"
            response = requests.get(url, params=params or {})
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            st.error(f"Error fetching products: {str(e)}")
            return {"products": [], "total": 0}
    
    def get_categories(self) -> List[Dict]:
        """Fetch categories from the Next.js API"""
        try:
            url = f"{self.base_url}/category"
            response = requests.get(url)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            st.error(f"Error fetching categories: {str(e)}")
            return []
    
    def get_orders(self, user_id: int) -> List[Dict]:
        """Fetch orders from the Next.js API"""
        try:
            url = f"{self.base_url}/orders"
            response = requests.get(url, params={"userId": user_id})
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            st.error(f"Error fetching orders: {str(e)}")
            return []

# Initialize API client
api_client = APIClient(Config.NEXTJS_API_BASE)

def main():
    st.set_page_config(
        page_title=Config.STREAMLIT_TITLE,
        page_icon="🏺",
        layout="wide",
        initial_sidebar_state="expanded"
    )
    
    st.title("🏺 TamShopEx Analytics Dashboard")
    st.markdown("*Cultural Products E-commerce Analytics from Tamanrasset, Algeria*")
    
    # Sidebar navigation
    with st.sidebar:
        st.header("Navigation")
        page = st.selectbox(
            "Choose a section:",
            ["Dashboard Overview", "Product Analytics", "Category Management", "Order Analytics", "Cultural Insights"]
        )
        
        st.markdown("---")
        st.header("Filters")
        
        # Global filters
        date_range = st.date_input(
            "Date Range",
            value=(datetime.now() - timedelta(days=30), datetime.now()),
            key="date_filter"
        )
    
    # Main content based on selected page
    if page == "Dashboard Overview":
        show_dashboard_overview()
    elif page == "Product Analytics":
        show_product_analytics()
    elif page == "Category Management":
        show_category_management()
    elif page == "Order Analytics":
        show_order_analytics()
    elif page == "Cultural Insights":
        show_cultural_insights()

def show_dashboard_overview():
    """Display main dashboard overview"""
    st.header("📊 Dashboard Overview")
    
    # Fetch data
    products_data = api_client.get_products({"limit": "1000"})
    categories_data = api_client.get_categories()
    
    products = products_data.get("products", [])
    total_products = len(products)
    
    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Total Products", total_products)
    
    with col2:
        total_categories = len(categories_data)
        st.metric("Categories", total_categories)
    
    with col3:
        if products:
            avg_price = sum(p.get("price", 0) for p in products) / len(products)
            st.metric("Avg Price", f"${avg_price:.2f}")
        else:
            st.metric("Avg Price", "$0.00")
    
    with col4:
        in_stock_products = sum(1 for p in products if p.get("stock", 0) > 0)
        st.metric("In Stock", in_stock_products)
    
    st.markdown("---")
    
    # Charts
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Products by Category")
        if products and categories_data:
            # Create category distribution chart
            category_counts = {}
            category_names = {cat["id"]: cat["name"] for cat in categories_data}
            
            for product in products:
                cat_id = product.get("categoryId")
                cat_name = category_names.get(cat_id, "Unknown")
                category_counts[cat_name] = category_counts.get(cat_name, 0) + 1
            
            if category_counts:
                fig = px.pie(
                    values=list(category_counts.values()),
                    names=list(category_counts.keys()),
                    title="Product Distribution by Category"
                )
                st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No products data available")
    
    with col2:
        st.subheader("Price Distribution")
        if products:
            prices = [p.get("price", 0) for p in products if p.get("price") is not None]
            if prices:
                fig = px.histogram(
                    x=prices,
                    title="Product Price Distribution",
                    labels={"x": "Price ($)", "y": "Number of Products"}
                )
                st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No pricing data available")

def show_product_analytics():
    """Display detailed product analytics"""
    st.header("📦 Product Analytics")
    
    # Fetch products
    search_term = st.text_input("Search Products", placeholder="Enter product name...")
    
    params = {"limit": "1000"}
    if search_term:
        params["search"] = search_term
    
    products_data = api_client.get_products(params)
    products = products_data.get("products", [])
    
    if not products:
        st.warning("No products found")
        return
    
    # Convert to DataFrame for easier manipulation
    df = pd.DataFrame(products)
    
    # Product table with filters
    st.subheader("Product Inventory")
    
    col1, col2, col3 = st.columns(3)
    with col1:
        min_price = st.number_input("Min Price", min_value=0.0, value=0.0)
    with col2:
        max_price = st.number_input("Max Price", min_value=0.0, value=1000.0)
    with col3:
        show_out_of_stock = st.checkbox("Include Out of Stock")
    
    # Filter DataFrame
    filtered_df = df[
        (df['price'] >= min_price) & 
        (df['price'] <= max_price)
    ]
    
    if not show_out_of_stock:
        filtered_df = filtered_df[filtered_df['stock'] > 0]
    
    # Display filtered products
    if not filtered_df.empty:
        # Select columns to display
        display_columns = ['name', 'price', 'stock', 'category']
        available_columns = [col for col in display_columns if col in filtered_df.columns]
        
        st.dataframe(
            filtered_df[available_columns],
            use_container_width=True,
            height=400
        )
        
        # Download option
        csv = filtered_df.to_csv(index=False)
        st.download_button(
            label="Download Product Data as CSV",
            data=csv,
            file_name="tamshopex_products.csv",
            mime="text/csv"
        )
    else:
        st.info("No products match the current filters")
    
    # Low stock alerts
    st.subheader("⚠️ Low Stock Alerts")
    low_stock_threshold = st.slider("Low Stock Threshold", 1, 50, 10)
    
    low_stock_products = filtered_df[
        (filtered_df['stock'] <= low_stock_threshold) & 
        (filtered_df['stock'] > 0)
    ]
    
    if not low_stock_products.empty:
        st.warning(f"Found {len(low_stock_products)} products with low stock!")
        st.dataframe(low_stock_products[['name', 'stock', 'price']], use_container_width=True)
    else:
        st.success("All products have sufficient stock!")

def show_category_management():
    """Display category management interface"""
    st.header("🏷️ Category Management")
    
    # Fetch categories
    categories = api_client.get_categories()
    
    if not categories:
        st.warning("No categories found")
        return
    
    # Categories overview
    st.subheader("Categories Overview")
    
    # Convert to DataFrame
    cat_df = pd.DataFrame(categories)
    
    # Display categories with product counts
    if '_count' in cat_df.columns:
        cat_df['product_count'] = cat_df['_count'].apply(lambda x: x.get('products', 0) if isinstance(x, dict) else 0)
    else:
        cat_df['product_count'] = 0
    
    display_cats = cat_df[['name', 'description', 'product_count']].copy()
    display_cats.columns = ['Category Name', 'Description', 'Product Count']
    
    st.dataframe(display_cats, use_container_width=True)
    
    # Category analytics
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Products per Category")
        if not cat_df.empty and 'product_count' in cat_df.columns:
            fig = px.bar(
                cat_df,
                x='name',
                y='product_count',
                title="Number of Products by Category"
            )
            fig.update_xaxis(tickangle=45)
            st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("Category Distribution")
        if not cat_df.empty and 'product_count' in cat_df.columns:
            fig = px.pie(
                cat_df,
                values='product_count',
                names='name',
                title="Category Product Distribution"
            )
            st.plotly_chart(fig, use_container_width=True)

def show_order_analytics():
    """Display order analytics (placeholder - requires user authentication)"""
    st.header("📈 Order Analytics")
    
    st.info("Order analytics requires user authentication. This section would display:")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Sample Metrics")
        st.metric("Total Orders", "247")
        st.metric("Revenue This Month", "$12,450")
        st.metric("Avg Order Value", "$67.34")
        st.metric("Top Selling Category", "Traditional Jewelry")
    
    with col2:
        st.subheader("Sample Charts")
        # Sample data for demonstration
        sample_dates = pd.date_range('2024-01-01', periods=30, freq='D')
        sample_orders = pd.DataFrame({
            'date': sample_dates,
            'orders': [10 + i % 15 for i in range(30)],
            'revenue': [500 + (i % 15) * 100 for i in range(30)]
        })
        
        fig = px.line(sample_orders, x='date', y='orders', title='Daily Orders (Sample)')
        st.plotly_chart(fig, use_container_width=True)

def show_cultural_insights():
    """Display cultural insights and heritage information"""
    st.header("🏺 Cultural Insights - Tamanrasset Heritage")
    
    st.markdown("""
    ### About TamShopEx Cultural Mission
    
    TamShopEx is dedicated to preserving and promoting the rich cultural heritage of Tamanrasset, Algeria. 
    Our platform showcases authentic cultural products from local artisans.
    """)
    
    # Cultural categories insights
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("🎨 Traditional Craft Categories")
        cultural_categories = [
            "Traditional Jewelry",
            "Berber Crafts", 
            "Desert Artifacts",
            "Cultural Textiles",
            "Ceremonial Items",
            "Local Artwork"
        ]
        
        for category in cultural_categories:
            st.write(f"• {category}")
    
    with col2:
        st.subheader("🌍 Cultural Impact Metrics")
        st.metric("Artisan Partners", "42")
        st.metric("Cultural Products", "156")
        st.metric("Heritage Categories", "6")
        st.metric("Tourist Customers", "78%")
    
    # Cultural map placeholder
    st.subheader("🗺️ Tamanrasset Cultural Map")
    st.info("Interactive map showing cultural sites and artisan locations would be displayed here")
    
    # Cultural calendar
    st.subheader("📅 Cultural Events Calendar")
    st.info("Upcoming cultural events and festivals in Tamanrasset region")

if __name__ == "__main__":
    main()
