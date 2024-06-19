document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var productName = document.getElementById("productName");
    var span = document.getElementsByClassName("close")[0];
    var prevBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");
    var productImages = [];
    var currentImgIndex = 0;

    // Uppdatera modalfönstrets bild och produktnamn
    function updateModalImageAndName() {
        if (modalImg && productImages.length > 0 && currentImgIndex >= 0 && currentImgIndex < productImages.length) {
            modalImg.src = productImages[currentImgIndex].src;
            modalImg.alt = productImages[currentImgIndex].alt;
            productName.textContent = productImages[currentImgIndex].title.trim();
            modalImg.style.transform = "scale(1)"; // Återställ zoomnivå
            centerModalImage();
            updateNavigationButtons();
            document.getElementById('modalErrorMessage').style.display = 'none'; // Dölj felmeddelandet om det finns en bild att visa
        } else {
            console.error("Modal image element or product images array is not correctly initialized.");
            document.getElementById('modalErrorMessage').style.display = 'block'; // Visa felmeddelandet om ingen bild hittas
        }
    }

    // Centrera modalfönstrets bild
    function centerModalImage() {
        var modalContent = document.querySelector(".modal-content");
        var modalWidth = modalContent.offsetWidth;
        var modalHeight = modalContent.offsetHeight;
        var imgWidth = modalImg.width;
        var imgHeight = modalImg.height;

        var marginLeft = (modalWidth - imgWidth) / 2;
        var marginTop = (modalHeight - imgHeight) / 2;

        modalImg.style.marginLeft = marginLeft + "px";
        modalImg.style.marginTop = marginTop + "px";
    }

    // Uppdatera navigeringsknapparnas tillstånd baserat på currentImgIndex
    function updateNavigationButtons() {
        if (prevBtn && nextBtn && productImages.length > 1) {
            prevBtn.disabled = currentImgIndex === 0;
            nextBtn.disabled = currentImgIndex === productImages.length - 1;
        } else if (prevBtn && nextBtn) {
            prevBtn.disabled = true;
            nextBtn.disabled = true;
        }
    }

    // Visa modal med produktbilder
    function showProductModal(productImgs) {
        productImages = Array.from(productImgs); // Konvertera NodeList till Array
        currentImgIndex = 0; // Börja från första bilden
        modal.style.display = "block";
        updateModalImageAndName();
    }

    // Lägg till klickhändelse för varje produktbildsbehållare
    var allImgContainers = document.querySelectorAll(".product-img");
    allImgContainers.forEach(function (imgContainer) {
        imgContainer.addEventListener('click', function () {
            var productImgs = imgContainer.querySelectorAll('img');
            showProductModal(productImgs);
        });
    });

    // Stäng modal när användaren klickar på stäng-knappen (X)
    if (span) {
        span.onclick = function () {
            modal.style.display = "none";
        };
    }

    // Stäng modal när användaren klickar utanför bilden
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Visa föregående produktbild
    if (prevBtn) {
        prevBtn.onclick = function () {
            currentImgIndex = (currentImgIndex - 1 + productImages.length) % productImages.length;
            updateModalImageAndName();
        };
    }

    // Visa nästa produktbild
    if (nextBtn) {
        nextBtn.onclick = function () {
            currentImgIndex = (currentImgIndex + 1) % productImages.length;
            updateModalImageAndName();
        };
    }

    // Tangentbordsnavigering för vänster och höger piltangenter
    document.addEventListener('keydown', function (event) {
        if (modal.style.display === "block") {
            if (event.key === 'ArrowLeft') {
                currentImgIndex = (currentImgIndex - 1 + productImages.length) % productImages.length;
                updateModalImageAndName();
            } else if (event.key === 'ArrowRight') {
                currentImgIndex = (currentImgIndex + 1) % productImages.length;
                updateModalImageAndName();
            } else if (event.key === 'Escape') {
                modal.style.display = "none";
            }
        }
    });

    // Touch-svep för mobila enheter
    var touchstartX = 0;
    var touchendX = 0;
    modal.addEventListener('touchstart', function (event) {
        touchstartX = event.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        if (touchendX < touchstartX) {
            // Svepte vänster
            currentImgIndex = (currentImgIndex + 1) % productImages.length;
            updateModalImageAndName();
        }

        if (touchendX > touchstartX) {
            // Svepte höger
            currentImgIndex = (currentImgIndex - 1 + productImages.length) % productImages.length;
            updateModalImageAndName();
        }
    }
});