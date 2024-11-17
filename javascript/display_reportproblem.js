document.addEventListener('DOMContentLoaded', () => {
    const reportButton = document.querySelector('.btns a[href="#"]');
    const reportProblemSection = document.querySelector('.report-problem');
    const closeBtn = document.querySelector(".x-mark");

    reportButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default action of the link
        // Toggle visibility
        if (reportProblemSection.style.display === 'none' || reportProblemSection.style.display === '') {
            reportProblemSection.style.display = 'flex';
        } else {
            reportProblemSection.style.display = 'none';
        }
    });

    closeBtn.addEventListener('click', () => {
        reportProblemSection.style.display = 'none';
    });
});