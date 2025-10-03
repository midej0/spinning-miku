//sets the amount of times the main loop runs per second
const loopsPerSecond = 24;
//sets the slowest rotation speed
const baseRotSpeed = 0.2;

//reference to the miku picture
let image = document.getElementById("miku");
//reference to the paragraph that displays the rps
let rpsText = document.getElementById("rps");
//reference to the paragraph that displays the number of revolutions
let revolutionsText = document.getElementById("revolutions");
//the speed at which the miku image rotates
let rotSpeed = baseRotSpeed;
//the revolutions per minute that the miku image has
let rps = 0;
//revolutions this session.
let revolutions = 0;
//the angle of the miku image
let angle = 0;
//the angles rotated this session
let anglesRotated = 0;

//sets the default rotation of the image and updates the revolutions so they match
image.style.transform = "rotate(" + angle + "deg)";
updateRevolutions(angle);

//main loop
setInterval(function(){
    rotateImage(rotSpeed);
    handleDeceleration();
    rps = (rotSpeed * loopsPerSecond) / 360;
    rpsText.textContent = rps.toFixed(2);
},1000/loopsPerSecond);

//handles the deceleration of the rotation speed.
function handleDeceleration(){
    if(rotSpeed > baseRotSpeed){
        rotSpeed *= 0.99;
        if(rotSpeed < baseRotSpeed + 0.01){
            rotSpeed = baseRotSpeed;
        }
    }
}

//adds rotation speed
function addRotationSpeed(){
    if (rotSpeed <= 1){
        rotSpeed += 0.1;
    }else{
        rotSpeed *= 1.1;
    }
}

function updateRevolutions(deg){
    anglesRotated += deg;
    if(Math.trunc(anglesRotated/360) >= 1){
        revolutions += Math.trunc(anglesRotated/360);
        anglesRotated -= (Math.trunc(anglesRotated/360) * 360);
    }
    revolutionsText.textContent = revolutions;
}

//rotates the image by the given angle.
function rotateImage(deg){
    angle = (angle + deg) % 360;
    image.style.transform = "rotate(" + angle + "deg)";
    updateRevolutions(deg);
}