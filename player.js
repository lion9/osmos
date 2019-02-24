var previousX = 0;
var previousY = 0;
var push_momentum = .5;
var slowing_momentum = .2;
var added_angle = 0;


class Player extends Ball {
    constructor(x, y, radius, fillColor) {
        super();
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.radius = radius;
        this.speed = 0;
        this.fillColor = fillColor;
    }

    drawPlayer() {
        this.drawCircle();
    }

    movePlayer() {
        var X_currentDistance = Math.floor(mouseX - player.x);
        var Y_currentDistance = Math.floor(mouseY - player.y);
        var X_previousDistance = mouseX - previousX;
        var Y_previousDistance = mouseY - previousY;
        var BAD_angle = 0;
        
        // Adding vectors 


        if (player.speed != 0) {
            console.log('---------------------------------');
            var A_x = player.x;
            console.log('A_x: ' + A_x);
            var A_y = player.y;
            console.log('A_y: ' + A_y);
            
    
            if (mouseY < player.y) {
                BAD_angle = Math.PI / 2 - Math.atan(X_currentDistance/Y_currentDistance);
                console.log('BAD_angle ' + BAD_angle);
            } else if (mouseY > player.y) {
                BAD_angle = -Math.PI / 2 - Math.atan(X_currentDistance/Y_currentDistance);
                console.log('BAD_angle ' + BAD_angle);
            }
    
            var B_x = A_x + Math.cos(BAD_angle) * push_momentum;
            console.log('B_x: ' + B_x);
    
            var B_y = A_y + Math.sin(BAD_angle) * push_momentum;
            console.log('B_y: ' + B_y);
            console.log('B_x - A_x: ' + (B_x - A_x));
            console.log('B_y - A_y: ' + (B_y - A_y));
    
            var AB = Math.sqrt(Math.pow(B_x - A_x, 2) + Math.pow(B_y - A_y, 2));
            
            var D_x = A_x + Math.cos(player.angle) * player.speed;
            console.log('D_x: ' + D_x);
            var D_y = A_y + Math.sin(player.angle) * player.speed;
            console.log('D_y: ' + D_y);
    
            var AD = Math.sqrt(Math.pow(A_x - D_x, 2) + Math.pow(A_y - D_y, 2));
            console.log('D_x - A_x: ' + (D_x - A_x));
            console.log('D_y - A_y: ' + (D_y - A_y));
    
            var AC = Math.sqrt((Math.pow(AB, 2) + Math.pow(AD, 2)) + (2*AB*AD*Math.cos(BAD_angle - player.angle)));
            console.log('AB: ' + AB + ' AD: ' + AD  + ' AC: ' + AC);
    
            added_angle = Math.acos((Math.pow(AC, 2) + Math.pow(AD, 2) - Math.pow(AB, 2)) / (2 * AC * AD));
            console.log('AB: ' + AB + ' AD: ' + AD  + ' AC: ' + AC);
            console.log('added_angle: ' + added_angle);
            console.log('player.angle: ' + player.angle);
            
            if (isNaN(added_angle)) {
                added_angle = 0;
            }

            if ((!isNaN(added_angle) && player.angle < 45 * Math.PI/180 && player.angle > -45 * Math.PI/180) || 
                (!isNaN(added_angle) && player.angle < -45 * Math.PI/180 && player.angle < -335 * Math.PI/180)) { // moving horizontally to the right
                if (mouseY < player.y) {
                    player.angle += added_angle;
                    player.angle %= 360 * Math.PI/180;
                    if (mouseX < player.x) {
                        player.speed += push_momentum;
                    } else if (mouseX > player.x) {
                        player.speed -= slowing_momentum;
                    }
                 } else if (mouseY > player.y) {
                    player.angle -= added_angle;
                    player.angle %= 360 * Math.PI/180;
                    if (mouseX < player.x) {
                        player.speed += push_momentum;
                    } else if (mouseX > player.x) {
                        player.speed -= slowing_momentum;
                    }
                }
            } else if ((!isNaN(added_angle) && player.angle >= 135 * Math.PI/180 && player.angle <= 225 * Math.PI/180) ||
                    (!isNaN(added_angle) && player.angle <= -135 * Math.PI/180 && player.angle >= -225 * Math.PI/180)) { // moving horizontally to the left
                if (mouseY < player.y) {
                    player.angle -= added_angle;
                    player.angle %= 360 * Math.PI/180;
                    if (mouseX > player.x) {
                        player.speed += push_momentum;
                    } else if (mouseX < player.x) {
                        player.speed -= slowing_momentum;
                    }
                } else if (mouseY > player.y) {
                    player.angle += added_angle;
                    player.angle %= 360 * Math.PI/180;
                    if (mouseX > player.x) {
                        player.speed += push_momentum;
                    } else if (mouseX < player.x) {
                        player.speed -= slowing_momentum;
                    }
                }
                console.log('moving horizontally to the left');

            } else if ((!isNaN(added_angle) && player.angle > 45 * Math.PI/180 && player.angle < 135 * Math.PI/180) ||
                    (!isNaN(added_angle) && player.angle < -225 * Math.PI/180 && player.angle > -315 * Math.PI/180)) { // moving vertically to the bottom
                if (mouseX < player.x) {
                    player.angle -= added_angle;
                    player.angle %= 360 * Math.PI/180;
                    if (mouseY < player.y) {
                        player.speed += push_momentum;
                    } else if (mouseY > player.y) {
                        player.speed -= slowing_momentum;
                    }
                } else if (mouseX > player.x) {
                    player.angle += added_angle;
                    player.angle %= 360 * Math.PI/180;
                    if (mouseY < player.y) {
                        player.speed += push_momentum;
                    } else if (mouseY > player.y) {
                        player.speed -= slowing_momentum;
                    }
                }
                console.log('moving vertically to the bottom');

            } else if ((!isNaN(added_angle) && player.angle <= -45 * Math.PI/180 && player.angle >= -135 * Math.PI/180) ||
                (!isNaN(added_angle) && player.angle >= 225 * Math.PI/180 && player.angle >= 315 * Math.PI/180)) { // moving vertically to the top
                if (mouseX < player.x) {
                    player.angle += added_angle;
                    if (mouseY > player.y) {
                        player.speed += push_momentum;
                    } else if (mouseY < player.y) {
                        player.speed -= slowing_momentum;
                    }
                } else if (mouseX > player.x) {
                    player.angle -= added_angle;
                    if (mouseY > player.y) {
                        player.speed += push_momentum;
                    } else if (mouseY < player.y) {
                        player.speed -= slowing_momentum;
                    }
                }
                console.log('moving vertically to the top');
            }
        }
        
        if (mouseY < player.y && player.speed == 0) {
            player.angle = (Math.PI / 2 - Math.atan(X_currentDistance/Y_currentDistance));
            player.speed += push_momentum;
        } else if (mouseY > player.y && player.speed == 0) {
            player.angle = (-Math.PI / 2 - Math.atan(X_currentDistance/Y_currentDistance));
            player.speed += push_momentum;
        }
    }


    move() {
        var leftX = player.x - player.radius;
        var rightX = player.x + player.radius;
        var topY = player.y - player.radius;
        var bottomY = player.y + player.radius;

        if (player.speed > 0) {
           player.speed -= .01;
           if (player.speed <= 0) {
            player.speed = 0;
            player.angle = 0;
           }
        }
        

        if (leftX <= 0 && (player.angle > 90 * Math.PI/180 || player.angle < 270 * Math.PI/180)) {
            player.angle = -(player.angle + 180 * Math.PI/180);
            player.angle %= 360 * Math.PI/180
            //if (player.angle > 360 * Math.PI/180) {
           //     player.angle %= 360 * Math.PI/180;
           // }
        }

        if (rightX >= canvas.width && (player.angle < 90 * Math.PI/180 || player.angle > 270 * Math.PI/180)) {
            player.angle = -(player.angle + 180 * Math.PI/180);
            player.angle %= 360 * Math.PI/180
           // if (player.angle < -360 * Math.PI/180) {
           //     player.angle %= 360 * Math.PI/180;
           // }
        }

        if (topY <= 0 && (player.angle > 180 * Math.PI/180 || player.angle < 0 * Math.PI/180)) {
            player.angle = (360 * Math.PI/180 - player.angle);
            player.angle %= 360 * Math.PI/180
           // if (player.angle > 360 * Math.PI/180) {
           //     player.angle %= 360 * Math.PI/180;
           // }
        }

        if (bottomY >= canvas.height && (player.angle < 180 * Math.PI/180 || player.angle > 0 * Math.PI/180)) {
            player.angle = (360 * Math.PI/180 - player.angle);
            player.angle %= 360 * Math.PI/180
          //  if (player.angle < -360 * Math.PI/180) {
           //     player.angle %= 360 * Math.PI/180;
               console.log('Player angle shrinked');
           // }
        }

            player.x += Math.cos(player.angle) * player.speed;
            player.y += Math.sin(player.angle) * player.speed;

    }
}

