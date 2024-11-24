document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".product-container");
    const jsonPath = "./json/products.json";  // Path till JSON-filen

    // Funktion för att skapa en produktbox
    const createProductBox = (product) => {
        const box = document.createElement("div");
        box.classList.add("product-box");

        // Hämta första bildvägen från produktens images
        const imagePath = product.images && product.images[0] ? product.images[0] : '';

        // Skapa HTML för produktens bilder och information
        box.innerHTML = `
            <img src="${imagePath}" alt="${product.title}" class="product-preview">
            <h1 class="product-title">${product.title}</h1>
            <p>${product.description}</p>
            <strong>Pris: <span class="price">${product.price}</span></strong>
        `;

        // Hämta produktbilden
        const productImage = box.querySelector(".product-preview");

        // När användaren klickar på produktbilden, visa sliding images
        productImage.addEventListener("click", () => {
            showSlidingImages(product.slidingImg, product.title);
        });

        return box;
    };

    // Funktion för att visa de extra bilderna (sliding images) i en karusell
    const showSlidingImages = (images, title) => {
        const sliderContainer = document.querySelector(".slidingContainer");
        const slidesContainer = sliderContainer.querySelector(".slides");
        const currentImgTitle = sliderContainer.querySelector(".currentImgTitle");
        const currentImg = sliderContainer.querySelector(".currentImg");

        // Uppdatera titeln för bilden
        currentImgTitle.textContent = title;

        // Rensa tidigare bilder
        slidesContainer.innerHTML = "";

        // Skapa bildkarusellens bilder
        images.forEach((imgPath, index) => {
            const imgElement = document.createElement("img");
            imgElement.src = imgPath;
            imgElement.alt = `Bild ${index + 1}`;
            imgElement.classList.add("sliding-image");
            slidesContainer.appendChild(imgElement);
        });

        // Uppdatera total antal bilder
        currentImg.textContent = `1 / ${images.length}`;

        // Visa första bilden i karusellen som synlig
        const slidingImages = slidesContainer.querySelectorAll(".sliding-image");
        if (slidingImages.length > 0) {
            slidingImages[0].classList.add("visible");
        }

        // Visa sliding container
        sliderContainer.style.display = "block";

        // Funktion för att gå till nästa bild
        const nextImage = () => {
            const visibleImage = slidesContainer.querySelector(".visible");
            let currentIndex = Array.from(slidingImages).indexOf(visibleImage);
            slidingImages[currentIndex].classList.remove("visible");
            currentIndex = (currentIndex + 1) % slidingImages.length;
            slidingImages[currentIndex].classList.add("visible");
            currentImg.textContent = `${currentIndex + 1} / ${images.length}`;
        };

        // Funktion för att gå till föregående bild
        const prevImage = () => {
            const visibleImage = slidesContainer.querySelector(".visible");
            let currentIndex = Array.from(slidingImages).indexOf(visibleImage);
            slidingImages[currentIndex].classList.remove("visible");
            currentIndex = (currentIndex - 1 + slidingImages.length) % slidingImages.length;
            slidingImages[currentIndex].classList.add("visible");
            currentImg.textContent = `${currentIndex + 1} / ${images.length}`;
        };

        // Lägg till knappar för att navigera i karusellen
        const prevButton = sliderContainer.querySelector(".prev");
        const nextButton = sliderContainer.querySelector(".next");

        prevButton.addEventListener("click", prevImage);
        nextButton.addEventListener("click", nextImage);
    };

    // Stäng slider
    const closeButton = document.querySelector(".slidingContainer .close");
    closeButton.addEventListener("click", () => {
        document.querySelector(".slidingContainer").style.display = "none";
    });

    // Hämta produkter från JSON och rendera dem
    fetch(jsonPath)
        .then((response) => {
            if (!response.ok) throw new Error("Kunde inte läsa filen.");
            return response.json();
        })
        .then((data) => {
            data.forEach((product) => {
                const productBox = createProductBox(product);
                productContainer.appendChild(productBox);
            });
        })
        .catch((error) => console.error("Fel vid hämtning av produkter:", error));
});