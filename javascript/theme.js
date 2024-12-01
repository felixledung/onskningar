document.addEventListener('DOMContentLoaded', function () {
    const modeToggler = document.getElementById('modeToggler'); // Använd "modeToggler"
    const body = document.body;

    // Kontrollera om elementet finns innan vi fortsätter
    if (!modeToggler) {
        console.error('Element med ID "modeToggler" kunde inte hittas i DOM.');
        return; // Stoppa körningen om knappen saknas
    }

    // Funktion för att sätta temat och uppdatera toggler-stilen
    function setTheme(theme) {
        body.classList.remove('dark-theme', 'light-theme');
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            modeToggler.classList.add('dark'); // Lägger till en klass för visuell feedback
        } else if (theme === 'light') {
            body.classList.add('light-theme');
            modeToggler.classList.remove('dark'); // Tar bort klassen
        } else {
            applySystemTheme();
            return;
        }
        localStorage.setItem('theme', theme);
    }

    // Funktion för att tillämpa systemets tema om ingen användarinställning finns
    function applySystemTheme() {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Kontrollera användarens sparade temainställning
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        applySystemTheme(); // Använd systemets tema om ingen inställning är sparad
    }

    // Övervaka systemets tema och uppdatera vid ändring
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(applySystemTheme);

    // Lägg till en event-lyssnare till togglern
    modeToggler.addEventListener('click', function () {
        let currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else if (currentTheme === 'light') {
            setTheme('system');
        } else {
            setTheme('dark');
        }
    });
});