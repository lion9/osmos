var NUMBER_OF_BALLS = 20;
var balls = [];
var img;

class Ball {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 60;
        this.speed = Math.random() / 3;
        this.angle = Math.random() > 0.5 ? Math.random() * 360 : -Math.random() * 360;
        this.fillColor = 'rgba(104, 134, 255, .9)';
        this.edgeColor = 'rgba(64, 116, 189, .9)';
        this.isAlive = true;
        this.speedReduction = 0.1;
    }
    drawCircle() {
        context.shadowBlur = 50;
        context.lineWidth = 5;
        context.strokeStyle = this.edgeColor;
        context.fillStyle = this.fillColor;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.stroke();
        context.fill();
        context.closePath();

        
    }

    move() {
        var leftX = this.x - this.radius;
        var rightX = this.x + this.radius;
        var topY = this.y - this.radius;
        var bottomY = this.y + this.radius;

        if (leftX <= 0 && (this.angle > 90 || this.angle < 270)) {
            this.angle = -(this.angle + 180);
        }

        if (rightX >= canvas.width && (this.angle < 90 || this.angle > 270)) {
            this.angle = -(this.angle + 180);
        }

        if (topY <= 0 && (this.angle > 180 || this.angle < 0)) {
            this.angle = (360 - this.angle);
        }

        if (bottomY >= canvas.height && (this.angle < 180 || this.angle > 0)) {
            this.angle = (360 - this.angle);
        }

        this.x += Math.cos(this.angle * Math.PI/180) * this.speed;
        this.y += Math.sin(this.angle * Math.PI/180) * this.speed;
    }

    collide() {
        for (var i = 0; i < balls.length; i++) {
            var distance = Math.abs(Math.sqrt((Math.pow((balls[i].x - this.x), 2) + Math.pow((balls[i].y - this.y), 2))));
            var leftX = this.x - this.radius;
            var rightX = this.x + this.radius;
            var topY = this.y - this.radius;
            var bottomY = this.y + this.radius;

            if (distance < balls[i].radius + this.radius) {
                if (balls[i].radius < this.radius && balls[i].isAlive) {
                    balls[i].radius -= 5;

                    if (leftX <= 0) {
                        this.x += 10 / this.radius;
                    }
                    else if (rightX >= canvas.width) {
                        this.x -= 10 / this.radius;
                    }
                    else if (topY <= 0) {
                        this.y += 10 / this.radius;
                    } else if (bottomY >= 0) {
                        this.y -= 10 / this.radius;
                    }
                    this.radius += 10 / this.radius;

                    if (balls[i].radius <= 0) {
                        balls[i].isAlive = false;
                    }
                }
            }
        }
    }
}


function createBalls() {
    var counter = 0;
    while(counter < NUMBER_OF_BALLS) {
        var ball = new Ball();

        if (checkWallsWhenCreated(ball) && checkOtherBallsWhenCreated(ball) && checkPlayerLocationsWhenCreated(ball)) {
            balls.push(ball);
            counter++;
        }
    }
}

function drawBalls() {
    for(var i = 0; i < balls.length; i++) {
        balls[i].drawCircle();
    }
}

function checkWallsWhenCreated(ball) {
    var leftX = ball.x - ball.radius;
    var rightX = ball.x + ball.radius;
    var topY = ball.y - ball.radius;
    var bottomY = ball.y + ball.radius;

    if (leftX > 0 && rightX < canvas.width && topY > 0 && bottomY < canvas.height) {
        return true;
    }
}

function checkOtherBallsWhenCreated(ball) {
    var no_collision = true;
    for(var i = 0; i < balls.length; i++) {
        var distance = Math.abs(Math.sqrt((Math.pow((balls[i].x - ball.x), 2) + Math.pow((balls[i].y - ball.y), 2))));

        if(distance < balls[i].radius + ball.radius) {
            no_collision = false;
        }
    }
    return no_collision;
}

function checkPlayerLocationsWhenCreated(ball) {
    var no_collision = true;
    var distance = Math.abs(Math.sqrt((Math.pow((player.x - ball.x), 2) + Math.pow((player.y - ball.y), 2))));
    if(distance < player.radius + ball.radius) {
        no_collision = false;
    }
    return no_collision
}

function updateBallsColors() {
    for(var i = 0; i < balls.length; i++) {
        var difference = player.radius - balls[i].radius;
        if(difference < 0) {
            balls[i].fillColor = 'rgba(255, 0, 0, .9)';
            balls[i].edgeColor = 'rgba(210, 18, 140, .5)';
        } else if (difference <= 2) {
            balls[i].fillColor = 'rgba(210, 18, 140, .5)';
            balls[i].edgeColor = 'rgba(104, 134, 255, .9)';
        } else {
            balls[i].fillColor = 'rgba(104, 134, 255, .9)';
            balls[i].edgeColor = 'rgba(64, 116, 189, .9)';
        }
    }
}


function drawBalls() {
    for(var i = 0; i < balls.length; i++) {
        if(balls[i].isAlive) {
            balls[i].drawCircle();
        }
    }
}

function moveBalls() {
    for(var i = 0; i < balls.length; i++) {
        balls[i].collide();
        balls[i].move();
    }
}
