class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    tick() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
        this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        var delta = 200 - Math.random() * 100;
        if (this.isDeleting) {
            delta /= 2;
        }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        setTimeout(() => { this.tick(); }, delta);
    }
}

// Scroll event to change text color
const header = document.querySelector('.intro-section');
const colors = ['#00ffcc', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96f2d7', '#66d9e8', '#748ffc', '#da77f2'];
let colorIndex = 0;
let lastScrollTop = 0;

// Event: Scroll to change color and header class
window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset;
    const typewriteElement = document.querySelector('.typewrite');
    if (Math.abs(lastScrollTop - currentScrollPosition) > 50) {
        if (typewriteElement) {
            colorIndex = (colorIndex + 1) % colors.length;
            typewriteElement.style.color = colors[colorIndex];
            typewriteElement.style.textShadow = `0 0 10px ${colors[colorIndex]}80`;
        }
        lastScrollTop = currentScrollPosition;
    }
    currentScrollPosition > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
});

// Intersection Observer for scroll animations
function handleScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.1 });
    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// Event: Todo button click and input enter key to add todo item
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
todoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => e.key === 'Enter' && addTodo());

function addTodo() {
    if (todoInput.value.trim() === '') {
        return;
    }
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    const todoText = document.createElement('span');
    todoText.textContent = todoInput.value;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => todoItem.remove();
    todoItem.append(todoText, deleteBtn);
    todoList.appendChild(todoItem);
    todoInput.value = '';
}

// Event: Mouse down and up for project card animation
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousedown', () => card.style.transform = 'scale(0.98)');
    card.addEventListener('mouseup', () => card.style.transform = 'translateY(-5px)');
});

// Event: Window load to start text typing effect and animations
window.onload = function() {
    Array.from(document.getElementsByClassName('typewrite')).forEach((el) => {
        const toRotate = el.getAttribute('data-type');
        const period = el.getAttribute('data-period');
        if (toRotate) {
            new TxtType(el, JSON.parse(toRotate), period);
        }
    });
    handleScrollAnimation();
};

// Slideshow transition event
function startSlideshow() {
    const items = document.querySelectorAll('.montage-item');
    let currentItem = 0;
    setInterval(() => {
        items.forEach(item => item.classList.remove('active'));
        items[currentItem].classList.add('active');
        currentItem = (currentItem + 1) % items.length;
    }, 5000);
}

// Event: Document ready to start slideshow
document.addEventListener('DOMContentLoaded', startSlideshow);

// Particle background setup and movement
var can = document.getElementById("canvas");
var ctx = can.getContext("2d");
can.width = window.innerWidth;
can.height = window.innerHeight;
can.style.background = "black";
var p = []
function Clear() {
    ctx.fillStyle="rgba(0,0,0,0.07)"
    ctx.fillRect(0,0,can.width,can.height);
} 
function particle(x,y,speed,c) {
    this.x = x
    this.y = y
    this.speed = speed
    this.upd = function() {
        ctx.strokeStyle = c;
        ctx.lineWidth = 1
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(this.x,this.y)
        this.x += this.speed.x
        this.y += this.speed.y
        ctx.lineTo(this.x,this.y)
        ctx.stroke()
        this.ang = Math.atan2(this.speed.y,this.speed.x)
        this.mag = Math.sqrt(this.speed.x**2 + this.speed.y**2)
        var op = [this.ang+Math.PI/4,this.ang-Math.PI/4]
        var ch = Math.floor(Math.random()*op.length)
        if(Math.random() < 0.05) {
            this.speed.x = Math.cos(op[ch])*this.mag
            this.speed.y = Math.sin(op[ch])*this.mag
        }
    }
}
var speed = 5
var period = 1000
function pulse() {
    setTimeout(pulse,period)
    var h = Math.random()*(210-150) + 150
    for(var i = 0; i < 56; i++) {
        p.push(new particle(can.width/2,can.height/2,
        {
            x:Math.cos(i/8*2*Math.PI)*speed,
            y:Math.sin(i/8*2*Math.PI)*speed
        },"hsl(" + h + ",100%,50%)"))
    }
}

// Animation frame loop for particles
function gameMove(){
    requestAnimationFrame(gameMove)
    Clear()
    for(var i = 0; i < p.length; i++) {
        p[i].upd();
        if(p[i].x < 0 || p[i].x > can.width || p[i].y < 0 || p[i].y > can.height) {
            p.splice(i,1)
        }
    }
}

// Event: Window resize to adjust canvas size
window.addEventListener('resize', function() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
});

pulse()
gameMove()
