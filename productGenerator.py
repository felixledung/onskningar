import json
import random
import string
import os

# Load products from the JSON file
def load_products(filename="json/products.json"):
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as file:
            return json.load(file)
    return []

# Save products to the JSON file
def save_products(products, filename="json/products.json"):
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(products, file, indent=4, ensure_ascii=False)

# Generate a wishID automatically if not provided
def generate_wish_id(title):
    base_id = ''.join([word[:3].upper() for word in title.split() if word.isalpha()])
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"{base_id}-{suffix}"

# Create a product box HTML (function remains the same)
def create_product_box(product):
    wish_id = product.get("wishID") or generate_wish_id(product["title"])

    sliding_img_html = ""
    if "slidingImg" in product and product["slidingImg"]:
        sliding_img_html = f'<div class="sliding-images">'
        for img in product["slidingImg"]:
            image_copy = product.get("imageCopy", "No Image")  
            sliding_img_html += f'<img src="{img}" alt="{image_copy}">'
        sliding_img_html += "</div>"
    
    product_html = f"""
    <div class="product-box" id="{wish_id}">
        <div class="product-title">{product["title"]}</div>
        <div class="product-description">{product["description"]}</div>
        <div class="product-price">{product["price"]}</div>
        {sliding_img_html}
        <div class="source-icon">{product["source-icon"]}</div>
    </div>
    """
    return product_html

# Function to add a new product via CLI
def add_new_product(products):
    title = input("Enter product title: ")
    description = input("Enter product description: ")
    price = input("Enter product price: ")
    source_icon = input("Enter source URL (leave blank if none): ")
    source_icon_html = f"<a href='{source_icon}' target='_blank'><i class='fa-solid fa-link'></i></a>" if source_icon else ""
    
    sliding_img = []
    while True:
        img = input("Enter image URL (or 'done' to finish): ")
        if img.lower() == "done":
            break
        sliding_img.append(img)
    
    product = {
        "title": title,
        "description": description,
        "price": price,
        "source-icon": source_icon_html,
        "slidingImg": sliding_img,
        "wishID": generate_wish_id(title)
    }

    products.append(product)
    print(f"Product '{title}' added successfully!")
    save_products(products)

# Main function to run the CLI
def main():
    products = load_products()

    while True:
        print("\nProduct Management CLI")
        print("1. Add new product")
        print("2. Exit")
        choice = input("Choose an option: ")

        if choice == "1":
            add_new_product(products)
        elif choice == "2":
            print("Exiting...")
            break
        else:
            print("Invalid choice, please try again.")

if __name__ == "__main__":
    main()