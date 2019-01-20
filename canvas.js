
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');


const MAX_RADIUS = 51;
const colors = [
    '#008dcb',
    '#f47d4a',
    '#ffec53',
    '#bd00ff',
    '#01ff1f',
    '#fff'
];

// // Rectange
// ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 255, 0, 0.3)'
// ctx.fillRect(500, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 0, 255, 0.3)'
// ctx.fillRect(300, 300, 100, 100);


// // Line

// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(100, 100);
// ctx.strokeStyle = 'red';
// ctx.stroke();

// Arc


// for (let i = 0; i < 150; i++) {
//     let x = Math.random();
//     let y = Math.random();
//     ctx.beginPath();
//     ctx.arc(x*window.innerWidth, y*window.innerHeight,  Math.floor(Math.random()*(25+1)+30), 0, Math.PI * 2, false);    
//     ctx.strokeStyle = `#${(Math.random()*0xFFFFFF<<0).toString(16)}`;
//     ctx.stroke();
// }

let mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

})

window.addEventListener('resize', (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.defaultRadius = radius;
    this.fillColor = colors[Math.floor(Math.random() * (colors.length))];

    this.draw = () => {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = `blue`;
        // ctx.strokeStyle = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
        ctx.stroke();
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    },
        this.update = () => {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
            this.draw();

            // interativity

            if ((mouse.x - this.x < 50 && mouse.x - this.x > -50)
                && (mouse.y - this.y < 50 && mouse.y - this.y > -50)) {
                if (this.radius < MAX_RADIUS)
                    this.radius += 10;
            } else if (this.radius > this.defaultRadius) {
                this.radius -= 10;
            } else if (this.radius < this.defaultRadius) {
                this.radius = this.defaultRadius;
            }

        }
}

// let circle = new Circle(x, y, dx, dy, radius);




let circles = [];

for (let i = 0; i < 1000; i++) {
    // ((Max - Min) + 1) + Min
    let radius = Math.floor(Math.random() * (7 + 1) + 2);
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dy = (Math.random() - .5) * 5;
    let dx = (Math.random() - .5) * 5;
    let circle = new Circle(x, y, dx, dy, radius);
    circles.push(circle);
}

function animate() {

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

animate();