class Fireworks {
    constructor() {
        this.canvas = document.getElementById('fireworks');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.fireworks = [];
        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.loop();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createFirework(x, y) {
        this.fireworks.push({
            x: this.canvas.width / 2,
            y: this.canvas.height,
            xEnd: x,
            yEnd: y,
            radius: 3,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: 5,
            angle: Math.atan2(y - this.canvas.height, x - this.canvas.width / 2),
            trail: [],
            trailLength: 10
        });
    }
    
    update() {
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const firework = this.fireworks[i];
            
            firework.trail.push({x: firework.x, y: firework.y});
            if (firework.trail.length > firework.trailLength) {
                firework.trail.shift();
            }
            
            firework.x += Math.cos(firework.angle) * firework.speed;
            firework.y += Math.sin(firework.angle) * firework.speed;
            firework.speed *= 0.99;
            
            const distance = Math.sqrt(
                Math.pow(firework.xEnd - firework.x, 2) + 
                Math.pow(firework.yEnd - firework.y, 2)
            );
            
            if (distance < 10 || firework.speed < 1) {
                this.createParticles(firework.x, firework.y, firework.color);
                this.fireworks.splice(i, 1);
            }
        }
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.2;
            particle.radius *= 0.97;
            particle.alpha -= 0.02;
            
            if (particle.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    createParticles(x, y, color) {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                radius: 3,
                color: color,
                alpha: 1
            });
        }
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (const firework of this.fireworks) {
            this.ctx.beginPath();
            this.ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = firework.color;
            this.ctx.fill();
            
            for (let i = 0; i < firework.trail.length; i++) {
                const trail = firework.trail[i];
                const alpha = i / firework.trail.length;
                this.ctx.beginPath();
                this.ctx.arc(trail.x, trail.y, firework.radius * alpha, 0, Math.PI * 2);
                this.ctx.fillStyle = `${firework.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
                this.ctx.fill();
            }
        }
        
        for (const particle of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
            this.ctx.fill();
        }
    }
    
    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
    
    launch() {
        const x = this.mouse.x;
        const y = this.mouse.y;
        this.createFirework(x, y);
        
        // 连续发射多个烟花
        setTimeout(() => this.createFirework(x + 50, y - 30), 100);
        setTimeout(() => this.createFirework(x - 50, y - 30), 200);
        setTimeout(() => this.createFirework(x, y - 50), 300);
    }
}

// 初始化烟花效果
let fireworks;
window.addEventListener('load', () => {
    fireworks = new Fireworks();
});

// 暴露launch方法供外部调用
window.launchFireworks = () => {
    if (fireworks) {
        fireworks.launch();
    }
};