import React from 'react'
import html2canvas from 'html2canvas';

import './styles.css';

class ParticleText extends React.PureComponent {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.parentNode.offsetWidth;
    this.height = this.canvas.parentNode.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.imageCoords = [];

    html2canvas(this.heading).then(canvas => {
      const imgdata = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.putImageData(imgdata, 0, 0);
      this.heading.parentNode.removeChild(this.heading);
      this.getArrayFromImage(imgdata)
      this.calcPointsCount(imgdata);

    });
  }

  getArrayFromImage(imgData) {
    const { data } = imgData;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const red = data[((this.width * y) + x) * 4];
        const green = data[((this.width * y) + x) * 4 + 1];
        const blue = data[((this.width * y) + x) * 4 + 2];
        const alpha = data[((this.width * y) + x) * 4 + 3];
        if (red === 51 && green === 51 && blue === 51) {
          this.imageCoords.push([x, y]);
        }
      }
    }
  }

  calcPointsCount = (imgData) => {
    return this.imageCoords.length;
  }


  getCanvas = (node) => {
    this.canvas = node;
  }

  getHeading = (node) => {
    this.heading = node;
  }

  render() {
    return (
    <div className="root" >
      <canvas ref={this.getCanvas} className="canvas" />
      <div className="content">
        <h1 ref={this.getHeading}>Awesome Heading</h1>
      </div>
    </div>
    );
  }
}

export default ParticleText;
