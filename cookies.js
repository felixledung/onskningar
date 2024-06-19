// Your main script here
const cookieBox = document.querySelector(".cookies"),
    buttons = document.querySelectorAll(".button");

const executeCodes = () => {
    if (document.cookie.includes("felixledung")) return;
    cookieBox.classList.add("show");

    buttons.forEach((buttons) => {
        buttons.addEventListener("click", () => {
            cookieBox.classList.remove("show");

            if (buttons.id === "acceptBtn") {
                document.cookie = "cookieBy= felixledung; max-age=" + 60 * 60 * 24 * 30;
            }
        });
    });
};

window.addEventListener("load", executeCodes);