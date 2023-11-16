var target_mili_sec = new Date("December 24, 2023 00:00:00").getTime();
var audioIndex = 0;
var audioList = [];
var isPlaying = false;
var sound; // Variabel för att hantera ljudinstansen

// Funktion för att hämta musiklistan från servern
async function fetchMusicList() {
    try {
        const response = await fetch('D:\.vsc\HTML, CSS, JAVASCRIPT\Önskelista\onskningar\music-list.json'); // Ersätt 'path/to/music-list.json' med rätt URL eller sökväg
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            audioList = data; // Tilldela den hämtade musiklistan till audioList
            playAudio(); // Spela ljud när musiklistan är hämtad
        } else {
            console.error('Invalid or empty music list format');
        }
    } catch (error) {
        console.error('Error fetching music list:', error);
    }
}

// Timerfunktionen
function timer() {
    var now_mili_sec = new Date().getTime();
    var remaining_sec = Math.floor((target_mili_sec - now_mili_sec) / 1000);

    var day = Math.floor(remaining_sec / (3600 * 24));
    var hour = Math.floor((remaining_sec % (3600 * 24)) / 3600);
    var min = Math.floor((remaining_sec % 3600) / 60);
    var sec = Math.floor(remaining_sec % 60);

    document.querySelector("#day").innerHTML = day;
    document.querySelector("#hour").innerHTML = hour;
    document.querySelector("#min").innerHTML = min;
    document.querySelector("#sec").innerHTML = sec;
}

// Uppdatera timer varje sekund
var timerInterval = setInterval(timer, 1000);

// Popup-kod
const showPopup = document.querySelector(".show-popup");
const popupContainer = document.querySelector(".popup-container");
const closeBtn = document.querySelector(".close-btn");

closeBtn.onclick = () => {
    popupContainer.classList.remove("active");
}

// Funktion för att spela ljud
function playAudio() {
    if (!isPlaying && audioList.length > 0) {
        isPlaying = true;
        sound = new Howl({
            src: [audioList[audioIndex]],
            volume: 1.0,
            onend: function () {
                // När ljudet är slut, gå till nästa låt
                audioIndex = getNextAudioIndex();
                playAudio();
            },
            onload: function () {
                // När ljudet är laddat, sätt isPlaying till false
                isPlaying = false;
            }
        });

        sound.play();
    } else {
        // Om det inte finns några ljudfiler eller om ljudet redan spelas
        console.warn("No audio files available or audio is already playing.");
    }
}

// Funktion för att hämta nästa låtindex
function getNextAudioIndex() {
    if (audioList.length > 0) {
        // Egen logik för att bestämma nästa index
        // I detta exempel, öka indexet med 1 varje gång
        audioIndex = (audioIndex + 1) % audioList.length;
        return audioIndex;
    } else {
        // Om det inte finns några ljudfiler
        console.warn("No audio files available.");
        return -1; // Returnera -1 för att indikera att det inte finns något giltigt index
    }
}

// Anropa funktionen för att hämta musiklistan när sidan laddas
document.addEventListener("DOMContentLoaded", fetchMusicList);