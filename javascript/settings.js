document.addEventListener('DOMContentLoaded', function () {
    // Hämta referenser till relevanta DOM-element
    var closeButton = document.querySelector('.close');

    // Lägg till eventlyssnare om .close-knappen finns
    if (closeButton) {
        closeButton.onclick = function () {
            var settingsModal = document.getElementById('settingsModal');
            if (settingsModal) {
                settingsModal.style.display = 'none';
            }
        };
    } else {
        console.error('Kunde inte hitta .close-knappen.');
    }

    // Exempel på eventlyssnare för checkboxen (Mörkt Tema)
    var darkThemeToggle = document.getElementById('theme-toggle');
    if (darkThemeToggle) {
        darkThemeToggle.addEventListener('change', function () {
            if (this.checked) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    } else {
        console.error('Kunde inte hitta #theme-toggle.');
    }

    // Exempel på eventlyssnare för språkval (select-element)
    var languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function () {
            var selectedLanguage = this.value;
            console.log('Valt språk:', selectedLanguage);
        });
    } else {
        console.error('Kunde inte hitta #language-select.');
    }

    // Hämta referenser till modalfönstret och stängningsknappen
    var modal = document.getElementById("settingsModal");
    var openSettingsButton = document.getElementById("openSettings");
    var closeButtonSpan = document.getElementById("closeSettings");
    var cogIcon = document.querySelector('.bx.bxs-cog');

    // Lägg till eventlyssnare för att öppna modalfönstret via kugghjulsikonen
    if (cogIcon && modal) {
        cogIcon.onclick = function () {
            modal.style.display = "flex";
        };
    } else {
        console.error('Kunde inte hitta kugghjulsikonen eller modalfönstret.');
    }

    // Lägg till eventlyssnare för att stänga modalfönstret via stängningsknappen
    if (closeButtonSpan && modal) {
        closeButtonSpan.onclick = function () {
            modal.style.display = "none";
        };
    } else {
        console.error('Kunde inte hitta stängningsknappen eller modalfönstret.');
    }

    // Lägg till eventlyssnare för att stänga modalfönstret genom att klicka utanför det
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

});