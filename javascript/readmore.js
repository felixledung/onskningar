document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("myModal");
    const img = document.getElementById("img01");
    const modalProductName = document.getElementById("productName");
    const closeBtn = document.querySelector(".close");
    const popupBox = document.querySelector(".popup-box");
    const closePopupBtn = document.querySelector(".close-btn");

    document.querySelectorAll('.product-img img').forEach(image => {
        image.addEventListener('click', event => {
            const imgSrc = event.target.src;
            const productTitle = event.target.getAttribute("alt");
            modal.style.display = "block";
            img.src = imgSrc;
            modalProductName.textContent = productTitle;
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }

    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    function toggleDescription(btn) {
        const tableRow = btn.closest('tr');
        if (!tableRow) return;

        const titleElement = tableRow.querySelector('td[headers="title"]');
        const descriptionElement = tableRow.querySelector('.description');
        if (!titleElement || !descriptionElement) return;

        const title = titleElement.textContent.trim();
        const description = descriptionElement.innerHTML.trim();

        if (popupBox) {
            const titleElementPopup = popupBox.querySelector('.title');
            const descriptionElementPopup = popupBox.querySelector('.description');
            if (titleElementPopup && descriptionElementPopup) {
                titleElementPopup.textContent = title;
                descriptionElementPopup.innerHTML = description;
                popupBox.style.display = 'block';
            }
        }
    }

    if (closePopupBtn) {
        closePopupBtn.onclick = () => popupBox.style.display = 'none';
    }

    document.querySelectorAll('.more').forEach(btn => {
        btn.addEventListener('click', () => toggleDescription(btn));
    });
});