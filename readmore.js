const modal = document.getElementById("myModal");
const img = document.getElementById("img01");
const modalProductName = document.getElementById("productName");
const modalErrorMessage = document.getElementById("modalErrorMessage");
const closeBtn = document.getElementsByClassName("close")[0];
const readMoreContainer = document.querySelector(".read-more-container");
const popupBox = document.querySelector(".popup-box");
const closePopupBtn = document.querySelector(".close-btn");

document.querySelectorAll('.product-img img').forEach((image) => {
    image.addEventListener('click', (event) => {
        const imgSrc = event.target.src;
        const productTitle = event.target.getAttribute("alt");
        modal.style.display = "block";
        img.src = imgSrc;
        modalProductName.textContent = productTitle;
    });
});

closeBtn.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Function to toggle description and display in popup
function toggleDescription(btn) {
    // Traverse up to the parent <tr> element
    var tableRow = btn.closest('tr');
    if (!tableRow) return; // Exit if <tr> not found

    // Find relevant elements within the table row
    var titleElement = tableRow.querySelector('td[headers="title"]');
    var descriptionElement = tableRow.querySelector('.description');

    if (!titleElement || !descriptionElement) return; // Exit if elements not found

    var title = titleElement.textContent.trim();
    var description = descriptionElement.innerHTML.trim();

    // Update the popup-box content
    var popupBox = document.querySelector('.popup-box');
    if (popupBox) {
        var titleElementPopup = popupBox.querySelector('.title');
        var descriptionElementPopup = popupBox.querySelector('.description');
        if (titleElementPopup && descriptionElementPopup) {
            titleElementPopup.textContent = "Read more about " + title;
            descriptionElementPopup.innerHTML = description;

            // Check if scrollbar is needed
            if (descriptionElementPopup.scrollHeight > descriptionElementPopup.clientHeight) {
                descriptionElementPopup.style.overflowY = 'auto';
            } else {
                descriptionElementPopup.style.overflowY = 'hidden';
            }
        }
    }

    // Show the popup-container
    var popupContainer = document.querySelector('.read-more-container');
    if (popupContainer) {
        popupContainer.classList.add('active');
    }
}

// Event listeners for "Read more" buttons
document.querySelectorAll('.show-more-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        toggleDescription(btn);
    });
});

// Event listener for closing the popup
document.querySelector('.close-btn').addEventListener('click', function () {
    closePopup();
});

// Function to close the popup
function closePopup() {
    var popupContainer = document.querySelector('.read-more-container');
    if (popupContainer) {
        popupContainer.classList.remove('active');
    }
}