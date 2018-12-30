var socket;

function setup() {
  socket = io.connect('https://warm-cougar-32.localtunnel.me');
    
    socket.on("sendToOthers", (data) => {
        console.log("msg from Serve:" + data);
        gettingMSG(data);
    });
}
    
function draw() {
  
}

function senderMSG() {
    let inputField = document.getElementById("inputField");
    let parentDiv = document.getElementById("textHolders");
    let newP = document.createElement("p");
    newP.className = "YouMSG";
    let textnode = document.createTextNode("You: " + inputField.value);
    newP.appendChild(textnode);
    parentDiv.appendChild(newP);
    
    socket.emit("Sending", inputField.value);
    inputField.value = "";
    
}

function gettingMSG(msg) {
    console.log(msg);
    let inputField = document.getElementById("inputField");
    let parentDiv = document.getElementById("textHolders");
    let newP = document.createElement("p");
    newP.className = "GettingMSG";
    let textnode = document.createTextNode("not you: " + msg);
    
    newP.appendChild(textnode);
    parentDiv.appendChild(newP);
}


    
    //  socket.on('mouse', function(data) {
//      console.log("Got: " + data.x + " " + data.y);
//    }
//  );
//}
 
  //socket.emit('mouse',data);
