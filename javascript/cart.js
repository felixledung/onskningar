// Funktion för att formatera pris
function formatPrice(price) {
    return `${price.toLocaleString('sv-SE')} kr`;
}

// Uppdatera antal artiklar i röd cirkel
function updateCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const cartQuantityElement = document.querySelector('.cart-quantity');
    if (!cartQuantityElement) return;

    if (totalQuantity === 0) {
        cartQuantityElement.style.display = 'none';
    } else {
        cartQuantityElement.style.display = 'block';
        cartQuantityElement.textContent = totalQuantity > 99 ? '99+' : totalQuantity;
    }
}

// Funktion för att lägga till en artikel i kundvagnen
function addToCart(productId, productName, productPrice, productDescription, productImage) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            description: productDescription,
            image: productImage,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity();
    displayCart();
}

// Ta bort artikel från kundvagnen
function removeItemFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    updateCartQuantity();
    displayCart();
}

// Öka artikelns kvantitet
function increaseItemQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
        cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    displayCart();
    // Återaktivera decrease-knappen om kvantiteten är större än 1
    document.querySelectorAll('.decrease').forEach(button => {
        if (button.getAttribute('data-id') === productId) {
            button.disabled = false; // Återaktivera decrease-knappen
        }
    });
}

// Minska artikelns kvantitet
function decreaseItemQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    updateCartQuantity();
    displayCart();
}

// Visa kundvagnens innehåll
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const finalPriceElement = document.querySelector('.final-price');
    const shippingCost = 50;

    if (!cartItemsContainer || !totalPriceElement || !finalPriceElement) return;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty">Your cart is currently empty.</p>';
        totalPriceElement.textContent = formatPrice(0);
        finalPriceElement.textContent = formatPrice(shippingCost);
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Price: ${formatPrice(item.price)}</p>
                <div class="cart-item-quantity">
                    <button class="decrease" data-id="${item.id}" ${item.quantity === 1 ? 'disabled' : ''}>-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(productElement);

        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = formatPrice(total);
    finalPriceElement.textContent = formatPrice(total + shippingCost);

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            increaseItemQuantity(productId);
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const index = cart.findIndex(item => item.id === productId);

            // Inaktivera decrease-knappen om kvantiteten är 1
            if (index !== -1 && cart[index].quantity === 1) {
                button.disabled = true;
                return;
            }

            decreaseItemQuantity(productId);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            removeItemFromCart(productId);
        });
    });
}

// Lägg till event-lyssnare för produkter
function initializeProductListeners() {
    const productContainer = document.querySelector('.product-container');

    if (!productContainer) {
        console.error("Ingen .product-container hittades!");
        return;
    }

    productContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();

            const productBox = e.target.closest('.product-box');

            if (!productBox) {
                console.error("Kunde inte hitta .product-box för tillagd artikel.");
                return;
            }

            const productId = productBox.getAttribute('data-id');
            const productName = productBox.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productBox.querySelector('.price').textContent);
            const productDescription = productBox.querySelector('p').textContent;
            const productImage = productBox.querySelector('img').src;

            addToCart(productId, productName, productPrice, productDescription, productImage);
        }
    });
}

// Event-lyssnare vid sidladdning
document.addEventListener('DOMContentLoaded', () => {
    initializeProductListeners();
    updateCartQuantity();
    displayCart();
});