import React from 'react'
import * as PIXI from 'pixi.js';
// import { Vector2 }  from 'three';
// import Ship from './Ship';
// import Control from './Control';

import shipSprite from '../../images/ships3.png';

import './styles.css';

export default class Arcanoid extends React.PureComponent {
  componentDidMount() {
    console.log(PIXI);
    
    this.app = new PIXI.Application({ backgroundColor: 0x1099bb });
    this.canvas.appendChild(this.app.view);
    
    // create a new Sprite from an image path
    this.bunny = PIXI.Sprite.from(shipSprite);
    
    // center the sprite's anchor point
    this.bunny.anchor.set(0.5);
    
    // move the sprite to the center of the screen
    this.bunny.x = this.app.screen.width / 2;
    this.bunny.y = this.app.screen.height / 2;
    
    this.app.stage.addChild(this.bunny);
    
    // Listen for animate update
    this.app.ticker.add((delta) => {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        this.bunny.rotation += 0.1 * delta;
    });
  }

  preload = () => {
    // const img = document.createElement('img');
    // img.src = shipSprite;
    // img.onload = () => {
    //   this.Ship.setSprite(img);
    //   this.isLoaded = true;
    //   this.draw();
    // }
  }

  draw = () => {
    // if (this.isLoaded) {
    //   this.ctx.clearRect(0, 0, this.width, this.height);
    //   this.Control.update();
    //   this.Ship.draw(this.ctx);
    //   requestAnimationFrame(this.draw);
    // }
  }

  update = () => {

  }

  getCanvas = (node) => {
    this.canvas = node;
  }

  render() {
    return (
    <div className="root" >
      <div ref={this.getCanvas} className="canvas" />
    </div>
    );
  }
}

