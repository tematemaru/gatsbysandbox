import React from 'react'
import { Vector2 }  from 'three';
import Ship from './Ship';
import Control from './Control';

import shipSprite from '../../images/ships3.png';

import './styles.css';

export default class Arcanoid extends React.PureComponent {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.parentNode.offsetWidth;
    this.height = this.canvas.parentNode.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.Ship = new Ship({
      x: 0,
      y: 0,
      angle: 0,
      sprite: null,
    });
    this.Control = new Control(this.Ship, new Vector2(0, 0));
    this.isLoaded = false;
    this.preload()
  }

  preload = () => {
    const img = document.createElement('img');
    img.src = shipSprite;
    img.onload = () => {
      this.Ship.setSprite(img);
      this.isLoaded = true;
      this.draw();
    }
  }

  draw = () => {
    if (this.isLoaded) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.Control.update();
      this.Ship.draw(this.ctx);
      requestAnimationFrame(this.draw);
    }
  }

  update = () => {

  }

  getCanvas = (node) => {
    this.canvas = node;
  }

  render() {
    return (
    <div className="root" >
      <canvas ref={this.getCanvas} className="canvas" />
    </div>
    );
  }
}

