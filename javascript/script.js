document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    const toggler = document.getElementById("modeToggler");
    const body = document.body;

    // Kontrollera om toggler-elementet finns
    if (toggler) {
        // Kolla om användaren redan har sparat ett tema
        if (localStorage.getItem("theme") === "light") {
            body.classList.add("light-mode");
            toggler.classList.add("active");
        }

        toggler.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            toggler.classList.toggle("active");

            // Spara inställningen i localStorage
            if (body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
        });
    }
});