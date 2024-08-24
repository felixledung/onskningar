// Function to extract data from the HTML table
function extractTableData() {
    const tableRows = document.querySelectorAll('.table_body tbody tr');
    const data = Array.from(tableRows).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            id: cells[0].textContent.trim(),
            name: cells[1].textContent.trim(),
            image: cells[2].querySelector('img').src, // Assuming the first img src is used
            type: cells[3].textContent.trim(),
            url: cells[4].querySelector('a').href,
            description: cells[5].querySelector('p').textContent.trim(),
            seller: cells[6].textContent.trim(),
            price: cells[7].textContent.trim()
        };
    });
    return data;
}

// Function to send data to the Flask server
async function sendDataToServer(data) {
    try {
        const response = await fetch('http://localhost:5000/save-data', { // Flask server URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Data successfully saved:', result);
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Extract data from the table and send it to the server
document.addEventListener('DOMContentLoaded', () => {
    const data = extractTableData();
    sendDataToServer(data);
});