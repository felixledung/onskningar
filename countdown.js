// Countdown dates in milliseconds (adjusted to ISO 8601 format)
var countdowns = [
    {
        date: getNextYearDate("06-29"),
        heading: "Dagar kvar till födelsedag",
        description: "Nedräkning tills jag fyller år!",
    },
    {
        date: getNextYearDate("12-24"),
        heading: "Dagar kvar till semestern",
        description: "Nedräkning tills semestern börjar!",
    }
];

var currentCountdownIndex = 0;

// Function to get next year's occurrence of a specific date (MM-DD format)
function getNextYearDate(mmdd) {
    var now = new Date();
    var nextDate = mmdd + "-" + now.getFullYear(); // Next occurrence in current year

    // If next date has passed this year, set it to next year
    if (new Date(nextDate) < now) {
        nextDate = mmdd + "-" + (now.getFullYear() + 1);
    }

    return new Date(nextDate).getTime();
}

// Function to update the current countdown display
function updateCountdown() {
    var countdown = countdowns[currentCountdownIndex];
    var now = new Date().getTime();
    var remainingTime = countdown.date - now;

    var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Update DOM elements
    document.getElementById("day").textContent = days;
    document.getElementById("hours").textContent = formatTime(hours);
    document.getElementById("min").textContent = formatTime(minutes);
    document.getElementById("sec").textContent = formatTime(seconds);

    document.getElementById("heading").textContent = countdown.heading;
    document.getElementById("description").textContent = countdown.description;

    // Check if countdown is finished
    if (remainingTime <= 0) {
        // Move to the next countdown
        currentCountdownIndex++;
        if (currentCountdownIndex >= countdowns.length) {
            currentCountdownIndex = 0; // Restart from the beginning if end is reached
        }

        // Update countdown date for the next countdown
        countdown = countdowns[currentCountdownIndex];
        countdown.date = getNextYearDate(getFormattedDate(countdown.date));

        // Call updateCountdown after a delay (e.g., 1 second)
        setTimeout(updateCountdown, 1000);
    } else {
        // Call updateCountdown again after 1 second
        setTimeout(updateCountdown, 1000);
    }
}

// Function to format time digits to always display two digits (e.g., 05 instead of 5)
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

// Function to get formatted date string (MM-DD) from milliseconds
function getFormattedDate(milliseconds) {
    var date = new Date(milliseconds);
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    return month + "-" + day;
}

// Initial call to start the countdown
updateCountdown();