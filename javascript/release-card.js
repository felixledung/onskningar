document.addEventListener('DOMContentLoaded', () => {
    const releaseCard = document.querySelector('.release_card');
    const closeButton = document.getElementById('release_btn');

    // Kontrollera om release card har visats tidigare
    if (localStorage.getItem('releaseCardShown') === 'true') {
        releaseCard.style.display = 'none';
    } else {
        releaseCard.style.display = 'block';
    }

    // Stäng release card och spara statusen
    closeButton.addEventListener('click', () => {
        releaseCard.style.display = 'none';
        localStorage.setItem('releaseCardShown', 'true');
    });
});