//背景


const canvas = document.getElementById('starrySky');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = [];
    const meteors = [];

    function createStar() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            brightness: Math.random() * 50 + 50
        };
    }

    function drawStar(star) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness / 100})`;
        ctx.fill();
    }

    function initStars(count) {
        for (let i = 0; i < count; i++) {
            stars.push(createStar());
        }
    }

    function updateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.brightness += (Math.random() - 0.5) * 50;
            star.brightness = Math.max(0, Math.min(100, star.brightness));
            drawStar(star);
        });
        meteors.forEach((meteor, index) => {
            if (meteor.opacity <= 0) {
                meteors.splice(index, 1);
            } else {
                drawMeteor(meteor);
                meteor.x += meteor.speed * Math.cos(meteor.angle);
                meteor.y += meteor.speed * Math.sin(meteor.angle);
                meteor.opacity -= 0.01;
                meteor.length -= meteor.speed * 0.1;
            }
        });
    }

    function createMeteor() {
        const x = Math.random() * canvas.width;
        const y = 0;
        const length = Math.random() * 100 + 100;
        const speed = Math.random() * 5 + 5;
        const angle = Math.PI / 4;
        const opacity = 1;
        return { x, y, length, speed, angle, opacity };
    }

    function drawMeteor(meteor) {
        const gradient = ctx.createLinearGradient(
            meteor.x, meteor.y,
            meteor.x - meteor.length * Math.cos(meteor.angle),
            meteor.y - meteor.length * Math.sin(meteor.angle)
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(
            meteor.x - meteor.length * Math.cos(meteor.angle),
            meteor.y - meteor.length * Math.sin(meteor.angle)
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function addMeteor() {
        if (Math.random() < 0.01) { // 1% chance to add a new meteor
            meteors.push(createMeteor());
        }
    }

    initStars(200);
    setInterval(() => {
        updateStars();
        addMeteor();
    }, 100);