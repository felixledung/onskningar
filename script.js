// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Timer code
    var target_mili_sec = new Date("December 24, 2023 00:00:00").getTime();
    var timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
        var remaining_sec = Math.max(0, Math.floor((target_mili_sec - new Date().getTime()) / 1000));
        if (remaining_sec <= 0) {
            clearInterval(timerInterval);
            remaining_sec = 0;
        }

        ['day', 'hour', 'min', 'sec'].forEach(function (unit) {
            var element = document.querySelector("#" + unit);
            if (element) {
                element.innerHTML = Math.floor(remaining_sec / timeFactors[unit]);
                remaining_sec %= timeFactors[unit];
            }
        });
    }
    
    var timeFactors = {
        'day': 3600 * 24,
        'hour': 3600,
        'min': 60,
        'sec': 1
    };
})