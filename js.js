// --- EFEITO DE FUNDO LÍQUIDO ---

const canvas = document.getElementById('liquid-canvas');

const ctx = canvas.getContext('2d');

let width, height, particles = [];


function init() {

    width = canvas.width = window.innerWidth;

    height = canvas.height = window.innerHeight;

    particles = [];

    for (let i = 0; i < 6; i++) {

        particles.push({

            x: Math.random() * width,

            y: Math.random() * height,

            radius: Math.random() * 250 + 150,

            color: i % 2 === 0 ? '#282673' : '#732449', 

            vx: Math.random() * 1.5 - 0.75,

            vy: Math.random() * 1.5 - 0.75

        });

    }

}


function draw() {

    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {

        ctx.beginPath();

        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        ctx.fillStyle = p.color;

        ctx.fill();

        p.x += p.vx; p.y += p.vy;

        if (p.x < -p.radius) p.x = width + p.radius;

        if (p.x > width + p.radius) p.x = -p.radius;

        if (p.y < -p.radius) p.y = height + p.radius;

        if (p.y > height + p.radius) p.y = -p.radius;

    });

    requestAnimationFrame(draw);

} 
// --- EFEITO TILT (INCLINAÇÃO) NOS CARTÕES ---
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Intensidade da inclinação (15 graus)
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

window.addEventListener('resize', init);
init();
draw();