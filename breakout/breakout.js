var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext('2d');
var total_brick_number = 142;

var paddle = new Sprite(color = getColor(), width = 80, height = 20, 
  x = (canvas.width / 2)+15, y = (canvas.height - 120), speed = 1);

paddle.update = function() {
  ctx.clearRect(this.x, this.y, this.width, this.height);
  drawRect(this);
}

var ball = new Sprite(color = getColor(), width = 15, height = 15, 
 x = (canvas.width / 2), y = (canvas.height - 120)-20, speed = 2,
 moving = false, angleX = 45, angleY = 135, directionX = 0, directionY = -1);

ball.update = function() {
  ctx.clearRect(this.x - this.speed, this.y - this.speed, this.width + this.speed + 1, this.height + this.speed + 1);

  if (! this.moving) {
    ctx.fillStyle = this.color;
    this.x = paddle.x + paddle.width / 2 - 5;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return;
  }

  if (ball.x < 0) {
    this.directionX = -this.directionX;
  }
  if ((this.x + this.width) >= canvas.width) {
    this.directionX = -this.directionX;
  }
  if (ball.y <= 0) {
    this.directionY = -this.directionY;
  }
  if (ball.y >= canvas.height) {
    this.x = (canvas.width / 2), 
    this.y = (canvas.height - 120) - 20,
    this.angleX = 45; 
    this.angleY = 135;
    this.directionX = 0;
    this.directionY = -1;
    this.speed = 2;
    this.moving = false;
  }

  this.x = this.x + this.directionX * this.speed;
  this.y = this.y + this.directionY * this.speed;

  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

ball.checkCollisions = function() {
  if (this.collided(paddle)) {
    ballpos = this.right - paddle.x - 1;
    ballmax = this.width + paddle.width - 2;
    factor = ballpos / ballmax;
    angle = radians(this.angleY - factor * (this.angleY - this.angleX));
    this.directionX = this.speed * Math.cos(angle);
    this.directionY = -this.speed * Math.sin(angle);
    return;
  }

  // We didn't hit the paddle, better see if we hit any bricks
  removeBricks = new Array();
  for (var i=0; i < bricks.length; i++) {
    brick = bricks[i];
    if (this.collided(brick)) {
      removeBricks.push(i);
      ctx.clearRect(brick.x, brick.y, brick.width, brick.height);
      // Can't ever collide with more than 3 bricks
      if(removeBricks.length > 2)
        break;
    }
  } 

  var nextIndexToRemove = removeBricks.pop();
  if(nextIndexToRemove)
    // FIXME should detect which side brick was hit
    // only change direction once
    this.directionY = -this.directionY;
  
  while(nextIndexToRemove) {
    bricks.splice(nextIndexToRemove, 1);
    nextIndexToRemove = removeBricks.pop();
  }
}


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
    brick = new Sprite(color = color, width = 50, height = 20, x = x, y = y);
    brick.id = i;
    brick.type = "brick";
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
    paddle.update();
  }
  ball.update();
  ball.checkCollisions();
}

function radians(m) { return m * Math.PI / 180.0; }

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

  newX = evt.clientX - paddle.width / 2;
  if(Math.abs(newX - paddle.x) < 20)
   return; 

  ctx.clearRect(paddle.x, paddle.y, paddle.width, paddle.height);
  paddle.x = newX;
  paddle.update();
}

function onClick(evt) {
  ball.moving = true;
}

function getColor() {
  var rgb = [];
  for (var i=0; i<3; i++) {
    rgb[i] = Math.round(200 * Math.random() + 25); 
  }
  return 'rgb(' + rgb.join(',') + ')';
}

window.addEventListener('mousemove', mouseMove, true);
window.addEventListener('click', onClick, true);
window.onload = setInterval("mainloop()", 1);

