let socket = io.connect("http://localhost:3000");


let email = document.getElementById("emailField");
let password = document.getElementById("passwordField");
let infoText = document.getElementById("infoText");


let loginButton = document.getElementById("logInButton");
loginButton.addEventListener("click", (e) => {
    console.log("Clicked the log in button");
	let cridentials = {
		email: email.value,
		password: password.value
	}
	socket.emit("logIn", cridentials);
});

let registerButton = document.getElementById("registerButton");
registerButton.addEventListener("click", (e) => {
	console.log("Register Button clicked");
	window.open("register.html", "_self");
});

//socken on requests

socket.on("userNotExist", (e) => {
		console.log("User does not exist, try again with another user or register");
		infoText.innerHTML = "Register pls";
	});

socket.on("logInSucceeded", (e) => {
	console.log("Log in successful");
	window.open("index.html?user=" + e, "_self");
});

socket.on("passwordWrong", (e) => {
	console.log("Password Wrong");
});

