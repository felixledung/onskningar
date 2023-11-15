var target_mili_sec = new Date("December 24, 2023 00:00:00").getTime();

function timer() {
    var now_mili_sec = new Date().getTime();
    var remaining_sec = Math.floor((target_mili_sec - now_mili_sec) / 1000);

    var day = Math.floor(remaining_sec / (3600 * 24));
    var hour = Math.floor((remaining_sec % (3600 * 24)) / 3600);
    var min = Math.floor((remaining_sec % 3600) / 60);
    var sec = Math.floor(remaining_sec % 60);

    // Uppdatera rätt element för minuter
    document.querySelector("#day").innerHTML = day;
    document.querySelector("#hour").innerHTML = hour;
    document.querySelector("#min").innerHTML = min; // Rättat från "#hour" till "#min"
    document.querySelector("#sec").innerHTML = sec;
}

setInterval(timer, 1000);