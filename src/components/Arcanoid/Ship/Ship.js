import { Vector2 }  from 'three';

export default class Ship {
  constructor({ x = 0, y = 0, angle = 0, sprite = null }) {
    this.position = new Vector2(x, y);
    this.angle = angle;
    this.sprite = sprite;
    this.frameCount = 5;
    this.curentFrame = 0;
    this.rotation = 0;
    this.width = 50;
    this.height = 126;
    this.scale = {
      x: 0.5,
      y: 0.5,
    }
    this.velocity = new Vector2();
    // this.translate = new Vector2(-this.width / 2 + this.velocity.x, -this.height / 2 + this.velocity.y);
    
    setInterval(() => {
      this.curentFrame++;
      this.curentFrame = this.curentFrame % this.frameCount;
    }, 50)
  }

  setSprite = (sprite) => {
    this.sprite = sprite;
  }

  update = () => {
    this.position.x = this.position.x + this.width / 2;
    this.position.y = this.position.y - this.height / 2 + 25;

    // this.position.add(this.velocity);
  }

  draw = (ctx) => {
    ctx.save();
      // this.update();
      ctx.translate(this.position.x - this.width / 2, this.position.y);
      ctx.rotate(this.rotation);
      ctx.drawImage(
        this.sprite,
        this.curentFrame * this.width,
        0,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height,
      );
    ctx.restore();
  }
}