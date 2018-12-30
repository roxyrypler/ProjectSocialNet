console.log("Hello");

var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

let userFile = require("edit-json-file");


function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));



var io = require('socket.io')(server);


io.sockets.on('connection', function (socket) {
    console.log("New connection " + socket.id);
	//Register user
    socket.on("registration", (data) => {
        let file = userFile("users.json");
        let numOfUsers = file.data.numOfUsers + 1;
		let userNum = "user" + numOfUsers;
		
		let userToAdd = {["user" + numOfUsers]:{
			name: data.name,
			lastName: data.lastName,
			email: data.email,
			password: data.password
		}};
		console.log(userToAdd);
		
		file.set("users", userToAdd);
		file.set("numOfUsers", numOfUsers);
		file.save();
    });
	//log in user
	socket.on("logIn", (data) => {
		//Check if the email exist
		console.log("Trying to log in: " + data.email);
		
		let file = userFile("users.json");
		let totuserNum = file.data.numOfUsers;
		let totUserNumComp = 0;
		let canEmitAgain = true;
		
		for (let i = 1; i <= totuserNum; i++) {
			if (file.data.users["user" + i].email == data.email) {
				console.log("User found: " + file.data.users["user" + i].email);
				if (data.password == file.data.users["user" + i].password) {
					socket.emit("logInSucceeded", data.email);
				}else {
					socket.emit("passwordWrong");
				}
				
				}else {
					totUserNumComp++;
				}
		}
		if(totuserNum === totUserNumComp) {
			console.log(totuserNum + " and " + totUserNumComp);
			console.log("Emitting dident find user");
			if (canEmitAgain == true) {
				canEmitAgain = false;
				socket.emit("userNotExist");
			}
		}else {
			console.log(totuserNum + " and " + totUserNumComp);
		}
	});
});














