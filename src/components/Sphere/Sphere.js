import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import particleImageGlow from './point-gradienta.png';
import particleImage from './point-gradient1.png';
import { fragment } from './fragment';
import { vertex } from './vertex';

import PointsGenerator from './pointsGenerator';

import { TweenMax } from 'gsap';


export default class Sphere extends React.PureComponent {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.points = [];
    this.pointsSpeed = [];
    this.time = 0;
    this.points = PointsGenerator();
    this.velocity = new THREE.Vector3(10, 10, 0);
    this.radius = 100;
    this.pointsCount = 2500;
    this.segmentsCount = 256;
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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = true;
    this.uniforms = {
      dot: {
        type: 't',
        value: new THREE.TextureLoader().load(particleImage),
      },
      glow: {
        type: 't',
        value: new THREE.TextureLoader().load(particleImageGlow),
      },
      blend: { type: 'f', value: 0.0 },
      time: { type: 'f', value: 0 },
      size: { type: 'f', value: 5 },
      resolution: {
        type: 'vec2',
        value: { x: window.innerWidth, y: window.innerHeight },
      },
    };
    

    this.material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      alphaTest: 0.1,
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: false,
      vertexShader: vertex,
      fragmentShader: fragment,
    });


    this.sphere = this.initPoints();
    this.scene.add(this.sphere);
    
    console.log(this.sphere);
    
    // TweenMax.to(this.uniforms.size, 10, { value: 50 });
    TweenMax.to(this.uniforms.blend, 5, { value: 1 });
    
    
    this.camera.position.z = 200;
    this.animate();
  }

  randomInteger = (min, max) => {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  randomPointInSphere = ( radius ) => {

    const x = THREE.Math.randFloat( -1, 1 );
    const y = THREE.Math.randFloat( -1, 1 );
    const z = THREE.Math.randFloat( -1, 1 );
    const normalizationFactor = 1 / Math.sqrt( x * x + y * y + z * z );
  
    return new THREE.Vector3(
      x * normalizationFactor * radius,
      y * normalizationFactor * radius,
      z * normalizationFactor * radius,
    );
  }

  initPoints = () => {
  
    const geometry = new THREE.BufferGeometry();
    
    const positions = [];
    const delays = [];
    
    for (let i = 0; i < this.pointsCount; i ++ ) {
      const vertex = this.randomPointInSphere( 70 );
      positions.push( vertex.x, vertex.y, vertex.z );
      const delay = this.randomInteger(0, 20);
      if (delay > 10) {
        delays.push(delay);
      } else {
        delays.push(0);
      }
      
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('delay', new THREE.Float32BufferAttribute(delays, 1));
    geometry.computeVertexNormals();
    
    return new THREE.Points(geometry, this.material);
  
  
  }

  getCanvas = (node) => {
    this.canvas = node;
  }

  animate = () => {
    this.uniforms.time.value += 1 / 10 ;
    // this.sphere.rotation.y += 0.001;
    this.material.needsUpdate = true;
    this.material.uniformsNeedUpdate = true;
    requestAnimationFrame( this.animate );
    this.renderer.render( this.scene, this.camera );
  }

  render() {
    return (
    <div ref={this.getCanvas} />
    );
  }
}