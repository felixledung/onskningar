document.addEventListener('DOMContentLoaded', function () {
    const openShareModalBtn = document.getElementById('open_sharemodal');
    const shareModal = document.getElementById('shareModal');
    const closeModalBtn = shareModal.querySelector('.close');
    const body = document.body;

    openShareModalBtn.addEventListener('click', function () {
        shareModal.style.display = 'flex';
        body.classList.add('blur');
    });

    closeModalBtn.addEventListener('click', function () {
        shareModal.style.display = 'none';
        body.classList.remove('blur');
    });

    window.addEventListener('click', function (event) {
        if (event.target === shareModal) {
            shareModal.style.display = 'none';
            body.classList.remove('blur');
        }
    });
});