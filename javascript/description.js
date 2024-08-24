function toggleDescription(button) {
    var descriptionDiv = button.previousElementSibling;
    if (descriptionDiv.style.display === "none" || descriptionDiv.style.display === "") {
        descriptionDiv.style.display = "block";
        button.textContent = "Läs mindre";
    } else {
        descriptionDiv.style.display = "none";
        button.textContent = "Läsa mer";
    }
}