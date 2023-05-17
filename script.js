var svg = document.getElementById("base-svg");
let width = 700;
let height = 700;

svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("style", "background-color: black");

class Particle {
  constructor(xPos, yPos, radius) {
    this.x = xPos;
    this.y = yPos;
    this.r = radius;
    this.svgElement;
    this.color = randomColor();

    this.animDuration = randomNum(3, 5);

    this.targetX = randomNum(0, width);
    this.targetY = height - this.r;
  }

  drawParticle() {
    this.svgElement = makeCircle(this.x, this.y, this.r);
    this.svgElement.setAttribute("fill", this.color);
    svg.appendChild(this.svgElement);

    this.addAnimateX();
    this.addAnimateY();
  }

  addAnimateX() {
    let animElement = document.createElementNS("http://www.w3.org/2000/svg","animate");
    animElement.setAttribute("attributeName", "cx");
    animElement.setAttribute("values", `${this.x}; ${this.targetX};`);
    animElement.setAttribute("dur", `${this.animDuration}`);
    animElement.setAttribute("repeatCount", "indefinite");
    this.svgElement.appendChild(animElement);
  }

  addAnimateY() {
    let animElement = document.createElementNS("http://www.w3.org/2000/svg","animate");
    animElement.setAttribute("attributeName", "cy");
    animElement.setAttribute("from", `${this.y}`);
    animElement.setAttribute("to", `${this.targetY}`);
    animElement.setAttribute("dur", `${this.animDuration}`);
    animElement.setAttribute("repeatCount", "indefinite");
    this.svgElement.appendChild(animElement);
  }
}

function createParticlesArray(num) {
  let particleInstances = [];
  for (let i = 0; i < num; i++) {
    let particleX = width/2;
    let particleY = height/3;
    let particleSize = randomNum(width * 0.01, width * 0.009);
    particleInstances.push(new Particle(particleX, particleY, particleSize));
  }
  return particleInstances;
}

let particles = createParticlesArray(50);

for (let particle of particles) {
  particle.drawParticle();
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }