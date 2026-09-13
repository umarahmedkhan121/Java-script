const canvas = document.getElementById('genjutsuCanvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.4 ? '#ff3333' : '#1a1a1a';
    }
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const maxParticles = window.innerWidth < 600 ? 40 : 100;
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

const phrases = ["Shinobi Assassin", "Master of Genjutsu", "Prodigy of the Leaf"];
let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;
const targetElement = document.getElementById('typeTarget');

function typeEngine() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }
    
    targetElement.textContent = currentPhrase.substring(0, characterIndex);
    
    let typingSpeed = isDeleting ? 40 : 100;
    
    if (!isDeleting && characterIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEngine, typingSpeed);
}
document.addEventListener('DOMContentLoaded', typeEngine);

const card = document.getElementById('parallaxCard');
if (window.innerWidth > 850) {
    window.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    window.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}