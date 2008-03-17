function Sprite(color, width, height, x, y, speed, moving, angleX, angleY,
  directionX, directionY) {
  this.color = color;
  this.width = width;
  this.height = height; 
  this.x = x;
  this.y = y;
  this.speed = speed; 
  this.moving = moving;
  this.angleX = angleX;
  this.angleY = angleY; 
  this.directionX = directionX; 
  this.directionY = directionY;
}

Sprite.prototype.getColor = function() {
  return this.color;
}
Sprite.prototype.getWidth = function() {
  return this.width;
}
Sprite.prototype.getHeight = function() {
  return this.height;
}
Sprite.prototype.getX = function() {
  return this.x;
}
Sprite.prototype.getY = function() {
  return this.y;
}
Sprite.prototype.getSpeed = function() {
  return this.speed;
}
Sprite.prototype.isMoving = function() {
  return this.moving;
}
Sprite.prototype.getAngleX = function() {
  return this.angleX;
}
Sprite.prototype.getAngleY = function() {
  return this.angleY;
}
Sprite.prototype.getDirectionX = function() {
  return this.directionX;
}
Sprite.prototype.getDirectionY = function() {
  return this.directionY;
}
Sprite.prototype.collided = function(collidable) {
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
