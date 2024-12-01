window.onload = () => {
    const searchInput = document.getElementById("search-input");
    const resultBox = document.getElementById("resultBox");
    const resultList = document.getElementById("resultList");

    if (searchInput && resultBox && resultList) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value;
            filterProducts(query);
        });

        const fetchProducts = async () => {
            try {
                // Assuming products.json is located in the 'json' folder in the same directory
                const response = await fetch('./json/products.json');
                const products = await response.json();
                return products;
            } catch (error) {
                console.error('Error fetching products:', error);
                return [];
            }
        };

        const showSuggestions = (suggestions) => {
            resultList.innerHTML = '';  // Clear previous suggestions
            if (suggestions.length === 0) {
                resultList.innerHTML = `<p>Ingen produkt hittades med namnet: <i>${searchInput.value}</i></p>`;
                resultBox.style.display = 'block';  // Show the result box if no results
            } else {
                suggestions.forEach(product => {
                    const listItem = document.createElement('li');
                    listItem.textContent = product.title;  // Display product title
                    listItem.addEventListener('click', () => {
                        searchInput.value = product.title;  // Set the input field to the selected product title
                        resultBox.style.display = 'none';  // Hide the result box after selection
                    });
                    resultList.appendChild(listItem);  // Append the list item to the results
                });
                resultBox.style.display = 'block';  // Show the result box
            }
        };

        const filterProducts = async (query) => {
            const products = await fetchProducts();  // Fetch the products from the JSON file

            // If the query is '/all', display all products
            if (query.trim().toLowerCase() === '/all') {
                showSuggestions(products);  // Show all products
            } else if (query.trim() === '') {
                resultBox.style.display = 'none';  // Hide the result box if the query is empty
            } else {
                const filteredProducts = products.filter(product =>
                    product.title.toLowerCase().includes(query.toLowerCase())  // Filter products based on query
                );
                showSuggestions(filteredProducts);  // Show filtered products as suggestions
            }
        };
    }
};