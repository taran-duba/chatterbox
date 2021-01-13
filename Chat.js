function addUser() {
    var username = document.getElementById("username").value;
    if (username == "") {
        alert("Please enter a username.")
    } else {
        localStorage.setItem("username", username);
        window.location = "Choices.html"
    }
}