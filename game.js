var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };


var canvas, context, player;

canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

// MOUSE POSITION
var mouseX;
var mouseY;


window.onload = function() {
    document.body.appendChild(canvas);
    player = new Player(canvas.width/4, canvas.height/2, 30, 'lightblue');
    createBalls();
    document.addEventListener('mousemove', updateMousePos);
    document.addEventListener('click', player.movePlayer);
    animate(step);
   };

var step = function() {
    updateAll();
    animate(step);
};

function colorText(text, textX,textY, fillColor) {
    context.fillStyle = fillColor;
    context.fillText(text, textX,textY);
}


function drawAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.drawPlayer(); // Draw player
    updateBallsColors(); 
    drawBalls(); //Draw balls
}



function moveAll() {
    moveBalls();
    player.move();
    player.collide();
}

function updateAll() {
    moveAll();
    drawAll();
}

function updateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    //mouseX = 45;
    //mouseY = 45;
    mouseX = event.clientX - rect.left - root.scrollLeft;
    mouseY = event.clientY - rect.top - root.scrollTop;
}
