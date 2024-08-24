let availableKeywords = [];

// Function to fetch keywords from JSON file
async function loadKeywords() {
    try {
        const response = await fetch('../data.json'); // Path to your JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        availableKeywords = data.map(item => item.name); // Extract names for autocomplete
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

    inputBox.onkeyup = function() {
        if (!availableKeywords.length) {
            console.error('availableKeywords is not defined or empty.');
            return;
        }

        let result = [];
        let input = inputBox.value;

        if (input) {
            result = availableKeywords.filter((keyword) => {
                return keyword.toLowerCase().includes(input.toLowerCase());
            });

            // Clear previous results
            resultsBox.innerHTML = '';

            // Populate new results
            result.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = item;
                resultsBox.appendChild(li);
            });
        } else {
            resultsBox.innerHTML = ''; // Clear results if input is empty
        }
    };
}

// Initialize the autocomplete system once keywords are loaded
document.addEventListener('DOMContentLoaded', () => {
    loadKeywords().then(() => {
        initializeAutocomplete();
    });
});