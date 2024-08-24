document.addEventListener('DOMContentLoaded', () => {
    const shareLinkInput = document.getElementById('shareLink');
    const shareBtn = document.getElementById('shareBtn');

    // Sätt input-fältet till nuvarande URL
    shareLinkInput.value = window.location.href;

    shareBtn.addEventListener('click', () => {
        // Välj och kopiera URL från input-fältet
        shareLinkInput.select();
        shareLinkInput.setSelectionRange(0, 99999); // För mobila enheter

        try {
            document.execCommand('copy');
            alert('Länken har kopierats till urklipp!');
        } catch (err) {
            console.error('Kunde inte kopiera till urklipp:', err);
        }
    });
});