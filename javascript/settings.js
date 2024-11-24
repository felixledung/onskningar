document.addEventListener('DOMContentLoaded', function () {
    // Hämta referenser till relevanta DOM-element
    var closeButton = document.querySelector('.close');

    // Lägg till eventlyssnare om .close-knappen finns
    if (closeButton) {
        closeButton.onclick = function () {
            var settingsModal = document.getElementById('settingsModal');
            if (settingsModal) {
                settingsModal.style.display = 'none';
            }
        };
    } else {
        console.error('Kunde inte hitta .close-knappen.');
    }

    // Exempel på eventlyssnare för checkboxen (Mörkt Tema)
    var darkThemeToggle = document.getElementById('theme-toggle');
    if (darkThemeToggle) {
        darkThemeToggle.addEventListener('change', function () {
            if (this.checked) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    } else {
        console.error('Kunde inte hitta #theme-toggle.');
    }

    // Exempel på eventlyssnare för språkval (select-element)
    var languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function () {
            var selectedLanguage = this.value;
            console.log('Valt språk:', selectedLanguage);
        });
    } else {
        console.error('Kunde inte hitta #language-select.');
    }

    // Hämta alla produkter
    const products = document.querySelectorAll('.product');

    // Loopa igenom produkterna
    products.forEach(product => {
        // Hämta produktens ID
        const productId = product.getAttribute('data-id');

        // Hämta bilderna för produkten
        const images = product.querySelectorAll('img');

        // Loopa igenom bilderna
        const productImages = []; // Flyttade här för att det ska vara en gemensam array för varje produkt
        images.forEach(image => {
            // Hämta bildens src-attribut
            const imageSrc = image.getAttribute('src');

            // Lägg till bildens src-attribut till produktens array
            productImages.push(imageSrc);
        });

        // Spara bilderna i en array för produkten
        product.dataset.images = JSON.stringify(productImages);
    });

    // Funktion för att visa bilderna för en produkt (antingen som modal eller i annan container)
    function showProductImages(productId) {
        const product = document.querySelector(`.product[data-id="${productId}"]`);
        if (product) {
            const images = JSON.parse(product.dataset.images);

            // Skapa en container för bilderna (kan vara en modal eller ett annat element)
            const imageContainer = document.querySelector('.image-container');
            imageContainer.innerHTML = ''; // Töm containern om det finns gamla bilder

            // Lägg till bilder till containern
            images.forEach(imageSrc => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.style.maxWidth = '100%';
                img.style.marginBottom = '10px';
                imageContainer.appendChild(img);
            });

            // Visa containern (om den är dold)
            imageContainer.style.display = 'block';
        } else {
            console.error(`Produkt med ID ${productId} hittades inte.`);
        }
    }

    // Lägg till klickhanterare för att visa bilder när produkt klickas
    products.forEach(product => {
        product.addEventListener('click', () => {
            // Hämta bilder för den klickade produkten
            const images = JSON.parse(product.dataset.images);

            // Visa bilderna i den befintliga container (kan vara en modal eller annat område)
            showProductImages(product.getAttribute('data-id'));
        });
    });

    // Lägg till en stängningsknapp eller annan logik för att stänga bildvisningen
    const closeImageViewButton = document.querySelector('.close-image-view');
    if (closeImageViewButton) {
        closeImageViewButton.addEventListener('click', function () {
            const imageContainer = document.querySelector('.image-container');
            if (imageContainer) {
                imageContainer.style.display = 'none'; // Döljer bildcontainern
            }
        });
    }
});