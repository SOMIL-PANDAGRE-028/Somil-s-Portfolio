// THE MAGIC: Dark Neural Network Canvas 🧠✨
const canvas = document.getElementById('dark-matter');
const ctx = canvas.getContext('2d');
let width, height, nodes = [];
let mouse = { x: null, y: null, active: false };

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Mouse Tracking for Canvas and CSS Flare
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  const flare = document.getElementById('cursor-flare');
  if(flare) flare.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});
window.addEventListener('mouseleave', () => mouse.active = false);

class Node {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.5 + 0.5;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // React to mouse
    if (mouse.active) {
      let dx = mouse.x - this.x; let dy = mouse.y - this.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        this.x -= dx * 0.01; this.y -= dy * 0.01;
      }
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(125, 249, 255, 0.6)';
    ctx.fill();
  }
}

for (let i = 0; i < 90; i++) nodes.push(new Node());

function animate() {
  ctx.clearRect(0, 0, width, height);
  
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].update(); nodes[i].draw();
    
    // Connect nodes
    for (let j = i; j < nodes.length; j++) {
      let dx = nodes[i].x - nodes[j].x;
      let dy = nodes[i].y - nodes[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(176, 87, 255, ${1 - dist/100})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

// 3D TILT EFFECT (For that premium feel)
const tiltElements = document.querySelectorAll('.tilt-element');
tiltElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2; 
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Max rotation degrees
    const rotateY = ((x - centerX) / centerX) * 8;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// CLOCK FLEX
setInterval(() => {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
}, 1000);

// PROJECT DATA & MODAL LOGIC (Keeping it consistent)
const projectData = {
  'vlsi-alu': { title: '4-bit ALU in VHDL', summary: 'Designed and simulated a 4-bit Arithmetic Logic Unit using VHDL.', what: 'I designed a 4-bit ALU capable of performing arithmetic and logic ops.', how: 'Used structural and dataflow modelling styles in Vivado.', tech: ['VHDL', 'Xilinx Vivado', 'Digital Logic'] },
  'personal-site': { title: 'Personal Website', summary: 'This very portfolio.', what: 'Built a fully responsive personal portfolio from scratch.', how: 'Pure HTML5, CSS3, and vanilla JavaScript.', tech: ['HTML5', 'CSS3', 'JavaScript'] },
  'arduino-sensor': { title: 'Arduino Multi-Sensor Hub', summary: 'A multi-sensor data acquisition system built on Arduino Uno.', what: 'Designed and built a sensor hub reading from a DHT11 and LDR.', how: 'Wired sensors on a breadboard, wrote firmware in C++.', tech: ['Arduino Uno', 'C++', 'DHT11'] },
  'python-scripts': { title: 'Python Automation Scripts', summary: 'Utility scripts targeting academic workflow automation.', what: 'Created tools for file organisation and web scraping.', how: 'Python 3, BeautifulSoup, and OS modules.', tech: ['Python 3', 'BeautifulSoup4', 'Requests'] }
};

const overlay = document.getElementById('project-overlay');
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const data = projectData[card.dataset.project];
    if(data) {
      document.getElementById('ol-title').textContent = data.title;
      document.getElementById('ol-summary').textContent = data.summary;
      document.getElementById('ol-what').textContent = data.what;
      document.getElementById('ol-how').textContent = data.how;
      document.getElementById('ol-tech').innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
      overlay.classList.add('open');
    }
  });
});

document.getElementById('overlay-close')?.addEventListener('click', () => overlay.classList.remove('open'));
document.getElementById('overlay-backdrop')?.addEventListener('click', () => overlay.classList.remove('open'));