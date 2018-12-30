
let socket;

let urlParam;
let yourName = document.getElementById("yourName");


function setup() {
	urlParam = getURLParams();
	yourName.innerHTML = urlParam.user;
	
	socket = io.connect("http://localhost:3000");
	
}

function draw() {
	
}

































































