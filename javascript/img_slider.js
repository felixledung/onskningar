document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".product-container");
    const jsonPath = "./json/products.json";  // Path to your JSON file

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

    const renderProducts = (products) => {
        products.forEach(product => {
            const productBox = createProductBox(product);
            productContainer.appendChild(productBox);
        });
    };

    const createProductBox = (product) => {
        const box = document.createElement("div");
        box.classList.add("product-box");

        // Get the image path or default to empty if not present
        const imagePath = product.images && product.images[0] ? product.images[0] : '';

        // Get the source icon, default to empty string if not present
        const sourceIcon = product['source-icon'] ? product['source-icon'] : '';

        // Build the product box HTML structure
        box.innerHTML = `
            <img src="${imagePath}" alt="${product.title}" class="product-preview">
            <h1 class="product-title">${product.title}</h1>
            <p class="product-description">${product.description}</p>
            <div class="product-source">
                ${sourceIcon ? sourceIcon : ''} <!-- Render the source icon if provided -->
            </div>
            <strong>Pris: <span class="price">${product.price}</span></strong>
        `;

        return box;
    };


    fetchProductData();
});
