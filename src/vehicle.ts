import p5 from "p5";

class Vehicle {
  private p: p5;
  
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  maxSpeed: number;
  maxForce: number;
  size: number;

  constructor(p: p5, x: number, y: number) {
    this.p = p;
    
    this.position = this.p.createVector(x, y);
    this.velocity = this.p.createVector(x, y);
    this.acceleration = this.p.createVector(x, y);
    this.maxSpeed = 8;
    this.maxForce = 0.3;
    this.size = 4;
  }

  show() {
    this.p.stroke(0);
  }
}
