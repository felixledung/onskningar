document.addEventListener("DOMContentLoaded", function () {
    // Open and Close the Sliding Container
    const openSlidingContainer = document.getElementById("openSlidingContainer");
    const closeSlidingContainer = document.getElementById("closeSlidingContainer");

    if (openSlidingContainer && closeSlidingContainer) {
        openSlidingContainer.addEventListener("click", function () {
            document.querySelector(".slidingContainer").classList.add("open");
            document.querySelector(".slidingOverlay").classList.add("active");
        });

        closeSlidingContainer.addEventListener("click", function () {
            document.querySelector(".slidingContainer").classList.remove("open");
            document.querySelector(".slidingOverlay").classList.remove("active");
        });
    }

    // Toggle the mode (Dark/Light mode)
    const modeToggler = document.getElementById("modeToggler");
    if (modeToggler) {
        modeToggler.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode"); // Toggle dark mode
            modeToggler.classList.toggle("active");
        });
    }

    // Shopping Cart: Update quantity
    const cartQuantity = document.querySelector(".cart-quantity");
    let currentQuantity = 0;  // Assuming starting quantity is 0
    cartQuantity.textContent = currentQuantity;

    function updateCartQuantity() {
        cartQuantity.textContent = currentQuantity;
        cartQuantity.style.display = currentQuantity > 0 ? 'inline-block' : 'none';
    }

    // Example: Updating cart when adding an item
    document.querySelector(".add-to-cart").addEventListener("click", function () {
        currentQuantity++;
        updateCartQuantity();
    });

    // Image Slider
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (prevButton && nextButton) {
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll(".img-slider .slides");

        function showSlide(index) {
            if (index >= slides.length) currentSlideIndex = 0;
            else if (index < 0) currentSlideIndex = slides.length - 1;
            else currentSlideIndex = index;

            slides.forEach((slide, i) => {
                slide.style.display = (i === currentSlideIndex) ? 'block' : 'none';
            });

            document.querySelector(".currentImg").textContent = `${currentSlideIndex + 1} / ${slides.length}`;
        }

        prevButton.addEventListener("click", function () {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;  // Update index
            showSlide(currentSlideIndex);  // Show the previous slide
        });

        nextButton.addEventListener("click", function () {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;  // Update index
            showSlide(currentSlideIndex);  // Show the next slide
        });

        showSlide(currentSlideIndex);  // Initialize slider to show the first slide
    }

    // Search Functionality
    const searchInput = document.querySelector(".search-input input");
    const resultBox = document.querySelector(".result-box");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const query = searchInput.value.toLowerCase();
            const results = [];

            // Example: Static search results
            const allResults = ["Produktens namn 1", "Produktens namn 2", "Produktens namn 3"];

            // Filter results based on input
            allResults.forEach(product => {
                if (product.toLowerCase().includes(query)) {
                    results.push(product);
                }
            });

            // Display filtered results
            if (results.length > 0) {
                resultBox.style.display = "block";
                const resultList = resultBox.querySelector("ul");
                resultList.innerHTML = "";  // Clear previous results
                results.forEach(result => {
                    const listItem = document.createElement("li");
                    const textNode = document.createTextNode(result);
                    listItem.appendChild(textNode);
                    resultList.appendChild(listItem);
                });
            } else {
                resultBox.style.display = "none";  // Hide result box if no results
            }
        });

        // Closing the search result box
        searchInput.addEventListener("blur", function () {
            setTimeout(function () {
                resultBox.style.display = "none"; // Hide after input loses focus
            }, 200);  // Delay to let the user click on a result
        });
    }

    // Handling Cart
    document.querySelector(".cart-icon a").addEventListener("click", function () {
        window.location.href = "shopping-cart.html";  // Example cart page redirection
    });
});