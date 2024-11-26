document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".product-container");
    const jsonPath = "./json/products.json";  // Path to your JSON file

    // Function to fetch product data from JSON file
    const fetchProductData = async () => {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error("Kunde inte läsa filen.");
            const data = await response.json();
            renderProducts(data);
        } catch (error) {
            console.error("Fel vid hämtning av produkter:", error);
        }
    };

    // Function to render the products inside the container
    const renderProducts = (products) => {
        // Track already rendered products to avoid duplicates
        const existingProducts = Array.from(productContainer.children).map((product) => product.querySelector('.product-title').textContent);

        // Loop through each product and render it if not already rendered
        products.forEach((product) => {
            if (!existingProducts.includes(product.title)) {
                const productBox = createProductBox(product);
                productContainer.appendChild(productBox);
            }
        });
    };

    // Function to create a product box element from the product data
    const createProductBox = (product) => {
        const box = document.createElement("div");
        box.classList.add("product-box");

        // Get the image path or default to empty if not present
        const imagePath = product.images && product.images[0] ? product.images[0] : '';

        // Get the source icon, default to empty string if not present
        const sourceIcon = product['source-icon'] ? product['source-icon'] : '';

        // Check if recommended text exists
        const recommendedText = product.recommended ? `<div class="recommended">${product.recommended}</div>` : '';

        // Build the product box HTML structure
        box.innerHTML = `
            <img src="${imagePath}" alt="${product.title}" class="product-preview">
            <h1 class="product-title">${product.title}</h1>
            <p class="product-description">${product.description}</p>
            <div class="product-source">
                ${sourceIcon ? sourceIcon : ''} <!-- If source icon is provided, render it -->
            </div>
            ${recommendedText} <!-- Add the recommended text only if it exists -->
            <strong>Pris: <span class="price">${product.price}</span></strong>
        `;

        return box;
    };

    // Fetch and render product data when the page loads
    fetchProductData();
});

// Förhindra markering av bilder
document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
});