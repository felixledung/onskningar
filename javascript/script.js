document.addEventListener('DOMContentLoaded', () => {
    const toggleNav = () => {
        const nav = document.getElementById("myNav");
        if (nav) {
            nav.style.width = nav.style.width === "100%" ? "0%" : "100%";
        }
    };

    document.getElementById("navToggle").addEventListener('click', toggleNav);

    // Om du använder länkar i din navigeringsmeny för att stänga den
    document.querySelectorAll('#myNav a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById("myNav");
            if (nav) {
                nav.style.width = "0%";
            }
        });
    });

    // För formhantering eller andra initialiseringar kan du lägga till kod här
});

/* cookie */