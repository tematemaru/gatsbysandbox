import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import PointsGenerator from './pointsGenerator';


export default class Renderer3D extends React.PureComponent {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.points = [];
    this.pointsSpeed = [];
    this.time = 0;
    this.points = PointsGenerator();
    this.velocity = new THREE.Vector3(10, 10, 0);
    this.angle = 0.0001;
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.canvas.appendChild( this.renderer.domElement );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    this.controls.enableZoom = true

    this.speeds = [];

    this.scene.add(this.initPointsMesh());

    
    this.camera.position.z = 500;
    this.animate();
  }

  initPointsMesh = () => {
    this.starsGeometry = new THREE.Geometry();
    for ( let i = 0; i < this.points.length; i++ ) {
      this.starsGeometry.vertices.push(this.points[i]);
      this.speeds.push(this.points[i].length() / 100000);
    }

    this.speeds.reverse();
    
    
    const starsMaterial = new THREE.PointsMaterial({
      color: 0x888888,
      size: 2.5,
      blending: THREE.AdditiveBlending,
    });
    
    const starField = new THREE.Points( this.starsGeometry, starsMaterial );

    return starField;
  }

  rotate = () => {
    for ( let i = 0; i < this.starsGeometry.vertices.length; i++ ) {
      const dist = this.starsGeometry.vertices[i].length();
      const curentAngle = Math.atan2(this.starsGeometry.vertices[i].x, this.starsGeometry.vertices[i].y);
      const x = dist * Math.sin(this.angle + curentAngle + this.speeds[i]);
      const y = dist * Math.cos(this.angle + curentAngle + this.speeds[i]);
      this.starsGeometry.vertices[i].x = x;
      this.starsGeometry.vertices[i].y = y;
      this.starsGeometry.verticesNeedUpdate = true;
    }
    this.time += 1;
  }

  calcDist = (startPoint) => {
    return startPoint.length();
  }

  getCanvas = (node) => {
    this.canvas = node;
  }

  animate = () => {
    requestAnimationFrame( this.animate );
    this.rotate();
    this.renderer.render( this.scene, this.camera );
  }

  render() {
    return (
    <div ref={this.getCanvas} />
    );
  }
}