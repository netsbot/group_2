let isWandering = false;

function setup() {
  createCanvas(1000, 400);
  vehicle = new Vehicle(width * 0.5, height * 0.5);

  toggleWanderButton = createButton("Toggle Wander");
}

function draw() {
  background(220);
  let mouse = createVector(mouseX, mouseY);

  push();
  stroke(5);
  fill(0, 200, 0, 100);
  circle(mouseX, mouseY, 50);
  pop();

  toggleWanderButton.mousePressed(toggleWander);

  if (!isWandering) {
    vehicle.seek(mouse);
  } else {
    vehicle.wander();
  }
  vehicle.update();
  vehicle.show();
  vehicle.outOfBounds();

  showDebug();
}

function toggleWander() {
  isWandering = !isWandering;
}

function showDebug() {
  push();
  textSize(20);
  noStroke();
  fill(0);
  text('Speed: ' + round(vehicle.velocity.mag(), 2), 10, 25);
  text('Is Wandering? ' + isWandering, 10, 50);
  pop();
}