window.onload = function () {
    const countdowns = [
        {
            date: getNextYearDate("06-29"),
            heading: "Dagar kvar till födelsedag",
            description: "Nedräkning tills jag fyller år!",
        },
        {
            date: getNextYearDate("12-24"),
            heading: "Dagar kvar till julafton",
            description: "Nedräkning tills det är julafton",
        }
    ];

    function getNextYearDate(mmdd) {
        const now = new Date();
        let nextDate = new Date(`${now.getFullYear()}-${mmdd}`);

        if (nextDate < now) {
            nextDate.setFullYear(now.getFullYear() + 1);
        }

        return nextDate.getTime();
    }

    function updateCountdown() {
        // Sortera countdowns baserat på när de kommer (från nuvarande tidpunkt)
        countdowns.sort((a, b) => a.date - b.date);

        // Välj den närmaste countdownen
        const countdown = countdowns[0];
        const now = Date.now();
        const remainingTime = countdown.date - now;

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        // Uppdatera DOM med den närmaste countdownen
        document.getElementById("day").textContent = days;
        document.getElementById("hours").textContent = formatTime(hours);
        document.getElementById("min").textContent = formatTime(minutes);
        document.getElementById("sec").textContent = formatTime(seconds);

        document.getElementById("heading").textContent = countdown.heading;
        document.getElementById("description").textContent = countdown.description;

        if (remainingTime <= 0) {
            countdowns[0].date = getNextYearDate(getFormattedDate(countdowns[0].date));
        }

        setTimeout(updateCountdown, 1000);
    }

    function formatTime(time) {
        return time.toString().padStart(2, '0');
    }

    function getFormattedDate(milliseconds) {
        const date = new Date(milliseconds);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}-${day}`;
    }

    updateCountdown();
};