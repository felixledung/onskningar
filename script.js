// Target date in milliseconds (adjusted to ISO 8601 format)
var target_mili_sec = new Date("2024-06-29T00:00:00").getTime();

// Countdown timer function
function timer() {
    var now_mili_sec = new Date().getTime();
    var remaining_sec = Math.floor((target_mili_sec - now_mili_sec) / 1000);

    var day = Math.floor(remaining_sec / (3600 * 24));
    var hour = Math.floor((remaining_sec % (3600 * 24)) / 3600);
    var min = Math.floor((remaining_sec % 3600) / 60);
    var sec = Math.floor((remaining_sec % 60));

    document.querySelector("#day").innerHTML = day;
    document.querySelector("#hours").innerHTML = hour;
    document.querySelector("#min").innerHTML = min;
    document.querySelector("#sec").innerHTML = sec;
}

// Initial call to timer function
timer();

// Update timer every second
setInterval(timer, 1000);

// Modal handling for product images
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var imgs = document.querySelectorAll(".product-img img");
var span = document.getElementsByClassName("close")[0];

// Loop through each image and add click event
imgs.forEach(function (img) {
    img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
});

// Close modal when user clicks on close button (X)
span.onclick = function () {
    modal.style.display = "none";
}

// Close modal when user clicks outside the image
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
