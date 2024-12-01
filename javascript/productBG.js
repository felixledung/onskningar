document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".product-container");
    const jsonPath = "./json/products.json";  // Path to your JSON file

    // Funktion för att hämta produktdata från JSON-fil
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

    // Funktion för att rendera produkterna i containern
    const renderProducts = (products) => {
        // Kontrollera om produkterna redan är sparade i localStorage
        let savedProducts = JSON.parse(localStorage.getItem("products")) || [];

        // Spåra redan renderade produkter för att undvika dubbletter
        const existingProducts = Array.from(productContainer.children).map((product) => product.querySelector('.product-title').textContent);

        // Loop genom varje produkt och rendera om den inte redan är renderad
        products.forEach((product) => {
            if (!existingProducts.includes(product.title)) {
                const productBox = createProductBox(product);
                productContainer.appendChild(productBox);

                // Lägg till produkten i den sparade produktlistan om den inte redan finns
                if (!savedProducts.some(p => p.title === product.title)) {
                    savedProducts.push(product);
                }
            }
        });

        // Spara den uppdaterade produktlistan till localStorage
        localStorage.setItem("products", JSON.stringify(savedProducts));
    };

    // Funktion för att skapa en produktbox med separata div för bild och titel
    const createProductBox = (product) => {
        const box = document.createElement("div");
        box.classList.add("product-box");

        // Hämta bildens sökväg eller använd tom om den inte finns
        const imagePath = product.images && product.images[0] ? product.images[0] : '';
        
        // Hämta ikonen för källan, om den finns
        const sourceIcon = product['source-icon'] ? product['source-icon'] : '';

        // Kontrollera om det finns rekommenderad text
        const recommendedText = product.recommended ? `<div class="recommended">${product.recommended}</div>` : '';

        // Bygg upp HTML-strukturen för produktboxen
        box.innerHTML = `
            <div class="product-img">
                <img src="${imagePath}" alt="${product.title}" class="product-preview">
            </div>
            <div class="product-title">
                <h1>${product.title}</h1>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-source">
                ${sourceIcon ? sourceIcon : ''} <!-- Om källa ikon finns, rendera den -->
            </div>
            ${recommendedText} <!-- Lägg till rekommenderad text om den finns -->
            <strong>Pris: <span class="price">${product.price}</span></strong>
        `;

        return box;
    };

    // Hämta och rendera produktdata när sidan har laddats
    fetchProductData();
});

// Förhindra att bilder markeras
document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
});