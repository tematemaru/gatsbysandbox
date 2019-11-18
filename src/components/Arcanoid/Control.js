import { Vector2 } from "three";

export default class Control {
  constructor(object, speed) {
    this.object = object;
    this.speed = speed;
    this.aim = new Vector2();
    this.rotation = 0;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  update() {
    this.speed.setY(0);
    this.speed.setX(0);
    // this.speed.setY(0);
    // this.speed.setX(0);
    if (this.moveForward)  {
      this.speed.y = -1;
    }
    if (this.moveBackward) {
      this.speed.y = 1;
    }
    if (this.moveLeft)     {
      this.speed.x = -1;
    }
    if (this.moveRight) {
      this.speed.x = 1;
    };
    this.object.position.add(this.speed);
    // console.log(this.object.position);
    
    // this.object.rotation += 0.01;
  }

  handleMouseMove = (e) => {
    // const angle = ;
   const dx = e.clientX - this.object.position.x;
   const dy = e.clientY - this.object.position.y;
   const angle = Math.atan2(dx, dy);
    // cursor.add(this.object.translate);
    // console.log(cursor);
    
    this.object.rotation = angle;
    // this.aim.add(cursor);
    
  }

  handleMouseDown = () => {
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 38: /*up*/
      case 87: /*W*/ this.moveForward = true; break;
      case 37: /*left*/
      case 65: /*A*/ this.moveLeft = true; break;
      case 40: /*down*/
      case 83: /*S*/ this.moveBackward = true; break;
      case 39: /*right*/
      case 68: /*D*/ this.moveRight = true; break;
  }
}

  handleKeyUp = (event) => {
    switch(event.keyCode) {
      case 38: /*up*/
      case 87: /*W*/ this.moveForward = false; break;
      case 37: /*left*/
      case 65: /*A*/ this.moveLeft = false; break;
      case 40: /*down*/
      case 83: /*S*/ this.moveBackward = false; break;
      case 39: /*right*/
      case 68: /*D*/ this.moveRight = false; break;
    }
  }
}