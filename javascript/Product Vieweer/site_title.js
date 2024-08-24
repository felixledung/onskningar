// Kör koden när hela sidan har laddats
window.addEventListener('DOMContentLoaded', (event) => {
    // Funktion för att uppdatera sidans titel
    function updateTitle(productName) {
        const baseTitle = "Product Viewer";
        const separator = " | ";
        const authorName = "Felix Ledung";

        // Uppdatera dokumentets titel
        document.title = `${baseTitle} - ${productName}${separator}${authorName}`;
    }

    // Hämta produktens namn från sidan
    const productName = document.querySelector('.product-title').textContent;

    // Kontrollera om produktens namn har hämtats korrekt
    if (productName) {
        // Uppdatera titeln om produktens namn finns
        updateTitle(productName);
    } else {
        console.error("Produktens namn kunde inte hittas.");
    }
});