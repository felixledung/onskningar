// Function to add product to the cart
function addToCart(event) {
    event.preventDefault();

    const productBox = event.target.closest('.product-box');
    const productId = productBox.getAttribute('data-id');
    const productName = productBox.querySelector('h1').textContent;
    const productPrice = productBox.querySelector('.price').textContent;
    const quantity = parseInt(productBox.querySelector('.quantity').textContent);
    const productImage = productBox.querySelector('img').src; // Get the product image URL

    const cartItem = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: quantity,
        image: productImage // Save the image URL in the cart item
    };

    // Retrieve current cart from localStorage or create a new array if empty
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add product to cart or update quantity if product already exists
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Product added to cart:", cartItem);
}

// Function to display the cart items on the shopping cart page
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyMessage = document.querySelector('.empty');
    const totalPriceElement = document.querySelector('.total-price');
    const shippingCostElement = document.querySelector('.shipping-cost');
    const finalPriceElement = document.querySelector('.final-price');

    // Check if necessary elements exist
    if (!cartItemsContainer || !emptyMessage || !totalPriceElement || !shippingCostElement || !finalPriceElement) {
        console.error('One or more DOM elements are missing. Please check your HTML structure.');
        return;
    }

    // Clear any previous cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        let totalPrice = 0;

        // Loop through cart items and display them
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <p><strong>${item.name}</strong></p>
                        <p>Price: ${item.price} SEK</p>
                        <div class="quantity-controls">
                            <button class="decrease">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="increase">+</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);

            totalPrice += item.price * item.quantity;

            // Add event listeners for increase and decrease buttons
            const decreaseButton = cartItemElement.querySelector('.decrease');
            const increaseButton = cartItemElement.querySelector('.increase');
            const quantityElement = cartItemElement.querySelector('.quantity');

            decreaseButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityElement.textContent = item.quantity;
                    updateCartTotal();
                    saveCart();
                }
            });

            increaseButton.addEventListener('click', () => {
                item.quantity++;
                quantityElement.textContent = item.quantity;
                updateCartTotal();
                saveCart();
            });
        });

        // Update total price
        const shippingCost = 50; // Fixed shipping cost, can be changed
        const finalPrice = totalPrice + shippingCost;

        totalPriceElement.textContent = `${totalPrice} SEK`;
        shippingCostElement.textContent = `${shippingCost} SEK`;
        finalPriceElement.textContent = `${finalPrice} SEK`;
    }
}

// Function to update the total price after quantity change
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    const shippingCost = 50; // Fixed shipping cost
    const finalPrice = totalPrice + shippingCost;

    document.querySelector('.total-price').textContent = `${totalPrice} SEK`;
    document.querySelector('.final-price').textContent = `${finalPrice} SEK`;
}

// Function to save the updated cart back to localStorage
function saveCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Wait for the DOM to load before displaying the cart
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});