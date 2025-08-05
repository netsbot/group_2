class Vehicle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.size = 8;
        this.maxSpeed = 5.35;
        this.maxForce = 0.15;
        this.wanderTheta = 0.0;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.position);
        let distance = desired.mag();

        if(distance < 100) {
            let newMagnitude = map(distance, 0, 100, 0, this.maxSpeed);
            desired.setMag(newMagnitude);
        } else {
            desired.setMag(this.maxSpeed);
        }

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    wander() {
        let wanderRadius = 25;
        let wanderDistance = 80;
        let wanderDelta = 0.3;

        this.wanderTheta += random(-wanderDelta, wanderDelta);

        let circlePos = this.velocity.copy();
        circlePos.normalize();
        circlePos.mult(wanderDistance);
        circlePos.add(this.position);

        let h = this.velocity.heading();

        let circleOffSet = createVector(
            wanderRadius * cos(this.wanderTheta + h),
            wanderRadius * sin(this.wanderTheta + h)
        );
    
        let target = p5.Vector.add(circlePos, circleOffSet);
        this.seek(target);

        this.drawWander(this.position, circlePos, target, wanderRadius);
    }

    show() {
        let angle = this.velocity.heading();

        stroke(2);
        fill(175);
        push();
        translate(this.position.x, this.position.y);
        beginShape();
        rotate(angle);
        vertex(this.size, 0);
        vertex(-this.size * 2, -this.size);
        vertex(-this.size * 2, this.size);
        endShape(CLOSE);
        pop();
    }

    drawWander(location, circlePos, target, rad) {
        stroke(0);
        noFill();
        strokeWeight(1);
        circle(circlePos.x, circlePos.y, rad * 2);
        circle(target.x, target.y, 4);
        line(location.x, location.y, circlePos.x, circlePos.y);
        line(circlePos.x, circlePos.y, target.x, target.y);
    }

    outOfBounds() {
        if (this.position.x < -this.size) this.position.x = width + this.size;
        if (this.position.y < -this.size) this.position.y = height + this.size;
        if (this.position.x > width + this.size) this.position.x = -this.size;
        if (this.position.y > height + this.size) this.position.y = -this.size;
    }
}