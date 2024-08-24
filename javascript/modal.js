document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const productName = document.getElementById("productName");
    const span = document.querySelector(".close");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    let productImages = [];
    let currentImgIndex = 0;

    function updateModalImageAndName() {
        if (modalImg && productImages.length > 0) {
            const img = productImages[currentImgIndex];
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            productName.textContent = img.title.trim();
            modalImg.style.transform = "scale(1)";
            centerModalImage();
            updateNavigationButtons();
            document.getElementById('modalErrorMessage').style.display = 'none';
        } else {
            console.error("Inga produktbilder att visa.");
            document.getElementById('modalErrorMessage').style.display = 'block';
        }
    }

    function centerModalImage() {
        const modalContent = document.querySelector(".modal-content");
        const imgWidth = modalImg.naturalWidth;
        const imgHeight = modalImg.naturalHeight;

        const marginLeft = (modalContent.offsetWidth - imgWidth) / 2;
        const marginTop = (modalContent.offsetHeight - imgHeight) / 2;

        modalImg.style.marginLeft = `${marginLeft}px`;
        modalImg.style.marginTop = `${marginTop}px`;
    }

    function updateNavigationButtons() {
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentImgIndex === 0;
            nextBtn.disabled = currentImgIndex === productImages.length - 1;
        }
    }

    function showProductModal(productImgs) {
        productImages = Array.from(productImgs);
        currentImgIndex = 0;
        modal.style.display = "block";
        updateModalImageAndName();
    }

    document.querySelectorAll(".product-img").forEach(imgContainer => {
        imgContainer.addEventListener('click', () => {
            const productImgs = imgContainer.querySelectorAll('img');
            showProductModal(productImgs);
        });
    });

    if (span) {
        span.onclick = () => modal.style.display = "none";
    }

    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    if (prevBtn) {
        prevBtn.onclick = () => {
            currentImgIndex = (currentImgIndex - 1 + productImages.length) % productImages.length;
            updateModalImageAndName();
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            currentImgIndex = (currentImgIndex + 1) % productImages.length;
            updateModalImageAndName();
        };
    }

    document.addEventListener('keydown', event => {
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

    let touchstartX = 0;
    modal.addEventListener('touchstart', event => touchstartX = event.changedTouches[0].screenX);
    modal.addEventListener('touchend', event => {
        const touchendX = event.changedTouches[0].screenX;
        if (touchendX < touchstartX) {
            currentImgIndex = (currentImgIndex + 1) % productImages.length;
        } else if (touchendX > touchstartX) {
            currentImgIndex = (currentImgIndex - 1 + productImages.length) % productImages.length;
        }
        updateModalImageAndName();
    });
});
