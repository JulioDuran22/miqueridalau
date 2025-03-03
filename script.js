const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = size;
        this.color = color;
        this.density = Math.random() * 40 + 5;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        if (distance < mouse.radius) {
            this.x -= forceDirectionX * force * this.density;
            this.y -= forceDirectionY * force * this.density;
        } else {
            this.x += (this.baseX - this.x) * 0.05;
            this.y += (this.baseY - this.y) * 0.05;
        }
    }
}

function createHeartParticles() {
    particles = [];
    const heartSize = 14;
    
    for (let t = 0; t < Math.PI * 2; t += 0.1) {
        for (let r = 0; r < 1; r += 0.05) { // Relleno del corazón
            let x = heartSize * 16 * Math.pow(Math.sin(t), 3) * r;
            let y = -heartSize * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;
            particles.push(new Particle(x + canvas.width / 2.5, y + canvas.height / 2, 3, "red"));
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

createHeartParticles();
animate();
