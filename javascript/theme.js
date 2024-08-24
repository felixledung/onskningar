document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set the theme and update the button text
    function setTheme(theme) {
        body.classList.remove('dark-theme', 'light-theme');
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="bx bxs-moon"></i> Toggle Theme: Dark';
        } else if (theme === 'light') {
            body.classList.add('light-theme');
            themeToggleBtn.innerHTML = '<i class="bx bxs-sun"></i> Toggle Theme: Light';
        } else {
            applySystemTheme();
            return;
        }
        localStorage.setItem('theme', theme);
    }

    // Function to apply system theme if no user preference is set
    function applySystemTheme() {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Check the user's saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        applySystemTheme(); // Apply system theme if no user preference is saved
    }

    // Observe the system theme and update accordingly
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(applySystemTheme);

    // Add event listener to the toggle button
    themeToggleBtn.addEventListener('click', function () {
        let currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else if (currentTheme === 'light') {
            setTheme('system');
        } else {
            setTheme('dark');
        }
    });

    // Hide button on scroll down, show on scroll up
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            themeToggleBtn.style.display = 'none';
        } else {
            themeToggleBtn.style.display = 'block';
        }
        lastScrollTop = scrollTop;
    });
});