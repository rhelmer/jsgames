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

Sprite.prototype = {

 get width() {
  return this._width;
 },

 set width(newWidth) {
  this._width = newWidth;
  this._right = this.x + newWidth;
 },

 get height() {
  return this._height;
 },

 set height(newHeight) {
  this._height = newHeight;
  this._bottom = this.y + newHeight;
 },

 get x () {
  return this._x;
 },


 set x (newX) {
  this._x = newX;
  this._right = newX + this.width;
 },

 get y () {
  return this._y;
 },

 set y (newY) {
  this._y = newY;
  this._bottom = newY + this.height;
 },

 get left () {
  return this._x;
 },

 get right () {
  return this._right;
 },
 
 get top () {
  return this._y;
 },

 get bottom () {
  return this._bottom;
 },

 isMoving : function() {
  return this.moving;
 },

 collided : function(collidable) {
  return !(this.left > collidable.right+1 ||
           this.top > collidable.bottom+1 ||
           this.bottom < collidable.top-1 ||
           this.right < collidable.left-1
          );
 }
};

