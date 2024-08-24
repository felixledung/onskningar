document.addEventListener('DOMContentLoaded', () => {
    const infoElement = document.getElementById('information');
    const dropdownContent = document.getElementById('dropdown-content');

    if (infoElement && dropdownContent) {
        // Show dropdown when mouse enters the icon or dropdown content
        infoElement.addEventListener('mouseenter', () => {
            dropdownContent.style.display = 'block';
        });

        dropdownContent.addEventListener('mouseenter', () => {
            dropdownContent.style.display = 'block';
        });

        // Hide dropdown when mouse leaves both the icon and the dropdown content
        infoElement.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!dropdownContent.matches(':hover') && !infoElement.matches(':hover')) {
                    dropdownContent.style.display = 'none';
                }
            }, 200);
        });

        dropdownContent.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!dropdownContent.matches(':hover') && !infoElement.matches(':hover')) {
                    dropdownContent.style.display = 'none';
                }
            }, 200);
        });
    }
});