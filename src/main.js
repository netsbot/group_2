function setup() {
  createCanvas(1000, 400);
  vehicle = new Vehicle(width * 0.5, height * 0.5);
}

function draw() {
  background(220);
  let mouse = createVector(mouseX, mouseY);

  vehicle.seek(mouse);
  vehicle.update();
  vehicle.show();
}
