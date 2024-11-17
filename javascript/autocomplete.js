document.addEventListener('DOMContentLoaded', () => {
    let availableKeywords = [];

    // Function to fetch keywords from JSON file
    async function loadKeywords() {
        try {
            const response = await fetch('../data.json'); // Path to your JSON file
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            availableKeywords = data; // Now storing full product data including image
            console.log('Keywords loaded:', availableKeywords); // Debugging line
        } catch (error) {
            console.error('Error fetching keywords:', error);
        }
    }

    // Function to initialize the autocomplete system
    function initializeAutocomplete() {
        const resultsBox = document.querySelector(".result-box");
        const inputBox = document.querySelector(".input-box");

        if (!inputBox) {
            console.error('Input box element not found.');
            return;
        }

        if (!resultsBox) {
            console.error('Results box element not found.');
            return;
        }

        inputBox.onkeyup = function () {
            if (!availableKeywords.length) {
                console.error('availableKeywords is not defined or empty.');
                return;
            }

            let result = [];
            let input = inputBox.value;

            if (input) {
                result = availableKeywords.filter((item) => {
                    return item.name.toLowerCase().includes(input.toLowerCase());
                });

                // Clear previous results
                resultsBox.innerHTML = '';

                // Populate new results with image and name
                result.forEach((item) => {
                    const li = document.createElement('li');
                    li.classList.add('autocomplete-item');
                    li.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}" class="autocomplete-image" width="36" height="36">
                        ${item.name}
                    `;
                    resultsBox.appendChild(li);
                });
            } else {
                resultsBox.innerHTML = ''; // Clear results if input is empty
            }
        };
    }

    // Event Listener for Image Upload Button
    const photoButton = document.getElementById('photoButton');
    if (photoButton) {
        photoButton.addEventListener('click', () => {
            document.getElementById('imageUpload').click();
        });
    }

    // Handle Image Upload
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload) {
        imageUpload.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (file) {
                // Show uploaded image preview
                const previewImage = document.getElementById('previewImage');
                previewImage.src = URL.createObjectURL(file);
                document.getElementById('uploadedImagePreview').style.display = 'block';

                // Perform image-based product search
                const searchResults = await searchProductsByImage(file);
                displaySearchResults(searchResults);
            }
        });
    }

    // Event Listener for Remove Image Button
    const removeImage = document.getElementById('removeImage');
    if (removeImage) {
        removeImage.addEventListener('click', () => {
            // Clear the file input
            document.getElementById('imageUpload').value = '';

            // Hide the image preview and "X" button
            document.getElementById('uploadedImagePreview').style.display = 'none';

            // Clear previous search results
            document.querySelector('.result-box').innerHTML = '';
        });
    }

    // Function to Perform Search Based on Uploaded Image
    async function searchProductsByImage(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('/search-by-image', { method: 'POST', body: formData });

            if (!response.ok) {
                throw new Error('Error searching by image');
            }

            const results = await response.json();
            return results;
        } catch (error) {
            console.error('Error searching by image:', error);
            return [];
        }
    }

    // Display Results
    function displaySearchResults(results) {
        const resultBox = document.querySelector('.result-box');
        resultBox.innerHTML = ''; // Clear existing results
        results.forEach((product) => {
            const li = document.createElement('li');
            li.innerHTML = `<img src="${product.imageUrl}" alt="${product.name}" width="36" height="36"> ${product.name}`;
            resultBox.appendChild(li);
        });
    }

    // Initialize the autocomplete and load keywords on document load
    loadKeywords().then(() => {
        initializeAutocomplete();
    });

    // Event Listener for Search Button (Text Search)
    const searchButton = document.querySelector('.tooltip i.fa-magnifying-glass');
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const query = document.querySelector('.input-box').value.trim();
            if (query) {
                searchProductsByText(query);
            }
        });
    }

    // Function to Search Products by Text Input
    async function searchProductsByText(query) {
        try {
            const response = await fetch(`/search-by-text?q=${encodeURIComponent(query)}`);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const products = await response.json();
            displayProductSuggestions(products);
        } catch (error) {
            console.error('Error searching by text:', error);
        }
    }

    // Function to Display Product Suggestions for Text Search
    function displayProductSuggestions(products) {
        const resultBox = document.querySelector('.result-box');
        resultBox.innerHTML = ''; // Clear previous results

        if (products && products.length > 0) {
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h4 class="product-name">${product.name}</h4>
                        <p class="product-price">${product.price}</p>
                        <a href="${product.url}" target="_blank" class="product-link">View Product</a>
                    </div>
                `;
                resultBox.appendChild(productItem);
            });
        } else {
            resultBox.innerHTML = '<p>No products found.</p>';
        }
    }
});