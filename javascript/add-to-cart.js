// Funktion för att hämta kundvagnsartiklar från LocalStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Funktion för att spara kundvagnsartiklar till LocalStorage
function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Funktion för att lägga till eller uppdatera en produkt i kundvagnen
function addToCart(productTitle, price) {
    let cartItems = getCartItems();

    // Kontrollera om produkten redan finns i kundvagnen
    const existingItemIndex = cartItems.findIndex(item => item.title === productTitle);
    if (existingItemIndex >= 0) {
        // Om produkten redan finns, uppdatera priset
        cartItems[existingItemIndex].price = price;
    } else {
        // Om produkten inte finns, lägg till den
        cartItems.push({ title: productTitle, price: parseFloat(price) });
    }

    saveCartItems(cartItems);
    renderCartItems();
    updateTotalPrice();
    updateCartItemCount();
}

// Funktion för att ta bort en produkt från kundvagnen
function removeFromCart(productTitle) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.title !== productTitle);
    saveCartItems(cartItems);
    renderCartItems();
    updateTotalPrice();
    updateCartItemCount();
}

// Funktion för att visa ett meddelande om kundvagnen är tom
function showEmptyCartMessage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('empty-cart-message');
    if (cartItemsContainer.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

// Funktion för att visa modalen
function showModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
    renderModalCartItems();
}

// Funktion för att rendera kundvagnens innehåll i modalen
function renderModalCartItems() {
    let cartItems = getCartItems();
    const modalCartItemsContainer = document.getElementById('modal-cart-items');
    modalCartItemsContainer.innerHTML = '';  // Töm innehållet innan det fylls på nytt

    cartItems.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.title} - ${item.price.toFixed(2)} SEK`;

        // Lägg till en "ta bort"-ikon för varje artikel
        let removeIcon = document.createElement('i');
        removeIcon.className = 'fa-solid fa-trash'; // FontAwesome ikon
        removeIcon.addEventListener('click', () => removeFromCart(item.title));
        li.appendChild(removeIcon);

        modalCartItemsContainer.appendChild(li);
    });

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('modal-total-price').textContent = totalPrice.toFixed(2);
}

// Funktion för att rensa kundvagnen
function clearCart() {
    localStorage.removeItem('cartItems');
    renderCartItems();
    updateTotalPrice();
    updateCartItemCount();
}

// Funktion för att rendera kundvagnens innehåll
function renderCartItems() {
    let cartItems = getCartItems();
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';  // Töm innehållet innan det fylls på nytt

    cartItems.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.title} - ${item.price.toFixed(2)} SEK`;

        // Lägg till en "ta bort"-ikon för varje artikel
        let removeIcon = document.createElement('i');
        removeIcon.className = 'fa-solid fa-trash'; // FontAwesome ikon
        removeIcon.addEventListener('click', () => removeFromCart(item.title));
        li.appendChild(removeIcon);

        cartItemsContainer.appendChild(li);
    });

    showEmptyCartMessage();  // Visa meddelande om kundvagnen är tom
    updateCartItemCount();  // Uppdatera antalet artiklar i kundvagnen
}

// Funktion för att uppdatera det totala priset
function updateTotalPrice() {
    let cartItems = getCartItems();
    let totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Funktion för att uppdatera antalet artiklar i kundvagnen
function updateCartItemCount() {
    let cartItems = getCartItems();
    const itemCount = cartItems.length;
    document.getElementById('cart-item-count').textContent = itemCount;
}

// Lägg till en eventlistener för "Lägg till i önskelistans kundvagn"-knappen
document.querySelector('.add-to-wish-cart a').addEventListener('click', function (e) {
    e.preventDefault();
    const productTitle = document.querySelector('.product-title').textContent;
    const price = parseFloat(document.querySelector('.price p').textContent.split(':-')[0]);
    addToCart(productTitle, price);
});

// Lägg till en eventlistener för att visa modalen när kundvagnsikonen klickas
document.querySelector('.shopping-cart').addEventListener('click', showModal);

// Lägg till en eventlistener för att stänga modalen
document.querySelector('.close-button').addEventListener('click', () => {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
});

// Lägg till en eventlistener för att rensa kundvagnen
document.querySelector('.clear-cart').addEventListener('click', clearCart);

// När sidan laddas, rendera kundvagnens innehåll och uppdatera det totala priset
document.addEventListener('DOMContentLoaded', function () {
    renderCartItems();
    updateTotalPrice();
    updateCartItemCount();
});