var total_brick_number = 142;
var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext('2d');

var paddle = { color: getColor(), width: 80, height: 20, 
               x: (canvas.width / 2)+15, 
               y: (canvas.height - 100), speed: 1, type: 'paddle' };
var ball = { color: getColor(), width: 15, height: 15, x: (canvas.width / 2), 
             y: (canvas.height - 120), speed: 3, moving: false, 
             anglel: 45, angleh: 135, fpdx: 0, fpdy: -1 };

collided = function(collidable) {
  left1 = this.x;
  left2 = collidable.x;
  right1 = this.x + this.width;
  right2 = collidable.x + collidable.width;
  top1 = this.y;
  top2 = collidable.y;
  bottom1 = this.y + this.height;
  bottom2 = collidable.y + collidable.height;

  if (bottom1 < top2) return false;
  if (top1 > bottom2) return false;
  if (right1 < left2) return false;
  if (left1 > right2) return false;

  return true;
}

ball.collided = collided;

var bricks = undefined;

function createBricks() {
  bricks = new Array();
  y = 50;
  x = 0;
  for (var i=0; i< total_brick_number; i++) {
    color = getColor();
    if (x > canvas.width) {
      y += 20;
      x = 0;
    } 
    brick = { color: color, width: 50, height: 20, x: x, y: y,
              id: i, type: "brick" };
    bricks.push(brick); 
    x += 50;
  }
}

function init() {
}

function mainloop() {
  if (bricks == undefined) {
    createBricks();
    drawBricks();
  }
  drawRect(paddle);
  if (ball.moving == true) {
    moveBall();
  } else {
    ctx.clearRect(ball.x-ball.speed, ball.y-ball.speed, ball.width+ball.speed+1, ball.height+ball.speed+1);
    ball.x = paddle.x + paddle.width / 2;
  }
  drawRect(ball);
  checkCollisions();
}

function radians(m) { return m * Math.PI / 180.0; }

function moveBall() {
  ctx.clearRect(ball.x-ball.speed, ball.y-ball.speed, ball.width+ball.speed+1, ball.height+ball.speed+1);
  if (ball.x < 0) {
    ball.fpdx = -ball.fpdx;
  }
  if ((ball.x + ball.width) >= canvas.width) {
    ball.fpdx = -ball.fpdx;
  }
  if (ball.y <= 0) {
    ball.fpdy = -ball.fpdy;
  }
  if (ball.y >= canvas.height) {
    console.log('life lost');
      ball.x = (canvas.width / 2), 
      ball.y = (canvas.height - 120),
      ball.speed = 2;
      ball.moving = false;
  }

  ball.x = ball.x + ball.fpdx * ball.speed;
  ball.y = ball.y + ball.fpdy * ball.speed;
}

function checkCollisions() {
  collidables = bricks.concat();
  collidables.push(paddle);
  hitBrick = false;
  for (var i=0; i < collidables.length; i++) {
    collidable = collidables[i];
    if (ball.collided(collidable)) {
      if (collidable.type == 'brick') {
        hitBrick = true;
        brick = collidable;
        ctx.clearRect(brick.x, brick.y, brick.width, brick.height);
        for (var j=0; j < bricks.length; j++) {
          if (brick.id == bricks[j].id) {
            bricks.splice(j, 1);
          }
        }
      } else if (collidable.type == 'paddle') {
        ballpos = ball.width + ball.x - paddle.x - 1;
        ballmax = ball.width + paddle.width - 2;
        factor = ballpos / ballmax;
        angle = radians(ball.angleh - factor * (ball.angleh - ball.anglel));
        ball.fpdx = ball.speed * Math.cos(angle);
        ball.fpdy = -ball.speed * Math.sin(angle);
      }
    }
  }
  if (hitBrick) {
    ball.fpdy = -ball.fpdy;
  }
}

function drawRect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function drawBricks() {
  for (var i=0; i < bricks.length; i++) {
    brick = bricks[i];
    drawRect(brick);
  }
}

function mouseMove(evt) {
  ctx.clearRect(paddle.x, paddle.y, paddle.width, paddle.height);
  paddle.x = evt.clientX - paddle.width / 2;
  drawRect(paddle);
}

function onClick(evt) {
  ball.moving = true;
}

function getColor() {
  var rgb = [];
  for (var i=0; i<3; i++) {
    rgb[i] = Math.round(100 * Math.random() + 25); 
  }
  return 'rgb(' + rgb.join(',') + ')';
}

window.addEventListener('mousemove', mouseMove, true);
window.addEventListener('click', onClick, true);
window.onload = setInterval("mainloop()", 1);
