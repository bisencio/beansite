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

const header = document.querySelector('.intro-section');
const colors = ['#00ffcc', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96f2d7', '#66d9e8', '#748ffc', '#da77f2'];
let colorIndex = 0;
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const typewriteElement = document.querySelector('.typewrite');
    
    if (Math.abs(lastScrollTop - currentScrollPosition) > 50) {
        if (typewriteElement) {
            colorIndex = (colorIndex + 1) % colors.length;
            typewriteElement.style.color = colors[colorIndex];
            typewriteElement.style.textShadow = `0 0 10px ${colors[colorIndex]}80`;
        }
        lastScrollTop = currentScrollPosition;
    }
    
    if (currentScrollPosition > 50) {
        header.classList.add('scrolled');
        if (typewriteElement) {
            typewriteElement.style.color = 'white';
        }
    } else {
        header.classList.remove('scrolled');
        if (typewriteElement) {
            typewriteElement.style.color = colors[colorIndex];
        }
    }
});

function handleScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.1 });
    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton?.addEventListener('click', addTodo);
todoInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

async function addTodo(e) {
    if (e) e.preventDefault();
    
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');
    
    if (!todoInput || todoInput.value.trim() === '') {
        const errorItem = createMessageElement('Please enter a message');
        errorItem.style.borderColor = '#ff6b6b';
        errorItem.querySelector('span').style.color = '#ff6b6b';
        todoList.appendChild(errorItem);
        setTimeout(() => errorItem.remove(), 3000);
        return;
    }

    const successItem = createMessageElement('Thank you for your message! ✨');
    successItem.style.borderColor = '#00ffcc';
    successItem.querySelector('span').style.color = '#00ffcc';
    todoList.appendChild(successItem);
    
    todoInput.value = '';
    
    setTimeout(() => successItem.remove(), 3000);
}

function createMessageElement(messageText) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.style.animation = 'fadeIn 0.3s ease-in';
    todoItem.style.padding = '10px';
    todoItem.style.marginTop = '10px';
    todoItem.style.backgroundColor = 'rgba(0, 255, 204, 0.1)';
    todoItem.style.borderRadius = '4px';
    todoItem.style.border = '1px solid #00ffcc';
    
    const todoText = document.createElement('span');
    todoText.textContent = messageText;
    todoText.style.flex = '1';
    todoText.style.textAlign = 'center';
    todoText.style.color = '#00ffcc';
    
    todoItem.appendChild(todoText);
    return todoItem;
}

document.addEventListener('DOMContentLoaded', () => {
    initializeMessages();
    startSlideshow();
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousedown', () => card.style.transform = 'scale(0.98)');
    card.addEventListener('mouseup', () => card.style.transform = 'translateY(-5px)');
});

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

function startSlideshow() {
    const items = document.querySelectorAll('.montage-item');
    let currentItem = 0;

    function glitchTransition(fromItem, toItem) {
        const steps = 5;
        let step = 0;

        function applyGlitchStep() {
            if (step >= steps) {
                items.forEach(item => item.classList.remove('active', 'glitch'));
                toItem.classList.add('active');
                return;
            }

            items.forEach(item => item.classList.remove('active', 'glitch'));

            if (Math.random() > 0.5) {
                fromItem.classList.add('active', 'glitch');
                fromItem.style.transform = `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px)`;
            } else {
                toItem.classList.add('active', 'glitch');
                toItem.style.transform = `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px)`;
            }

            step++;
            setTimeout(applyGlitchStep, 100);
        }

        applyGlitchStep();
    }

    function nextSlide() {
        const prevItem = items[currentItem];
        currentItem = (currentItem + 1) % items.length;
        const nextItem = items[currentItem];
        glitchTransition(prevItem, nextItem);
    }

    items[0].classList.add('active');
    setInterval(nextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', startSlideshow);

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

window.addEventListener('resize', function() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
});

pulse()
gameMove()

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#$%&@|`~';
        this.originalText = el.innerText;
        this.update = this.update.bind(this);
        this.isScrambling = false;
        this.maxWidth = el.closest('.project-card') ? 
            el.closest('.project-card').offsetWidth - 40 :
            Infinity;
    }

    setText(newText) {
        if (this.isScrambling) return Promise.resolve();
        this.isScrambling = true;
        
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 20);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.1) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerText = output;
        
        if (complete === this.queue.length) {
            this.isScrambling = false;
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
        }
        this.frame++;
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

function initializeAllScramblers() {
    const textElements = document.querySelectorAll(`
        h2, h3, p, 
        .contact-item span,
        .project-card p,
        .todo-item span
    `);
    
    textElements.forEach(element => {
        if (element.closest('header')) return;
        
        if (!scramblers.has(element) && element.innerText.trim() !== '') {
            const scrambler = new TextScramble(element);
            scramblers.set(element, scrambler);
        }
    });
}

let scrollTimeout;
let lastScrollPosition = window.pageYOffset;
const messages = document.querySelectorAll('.todo-item span');
const scramblers = new Map();

function initializeScrambler(element) {
    if (!scramblers.has(element)) {
        const scrambler = new TextScramble(element);
        scramblers.set(element, scrambler);
    }
}

let lastScrambleTime = 0;
const SCRAMBLE_COOLDOWN = 1000;

window.addEventListener('scroll', function() {
    const currentTime = Date.now();
    const currentScrollPosition = window.pageYOffset;
    const scrollDelta = Math.abs(currentScrollPosition - lastScrollPosition);
    
    if (scrollDelta > 50 && currentTime - lastScrambleTime > SCRAMBLE_COOLDOWN) {
        scramblers.forEach((scrambler, element) => {
            if (element.isConnected && isElementInViewport(element)) {
                scrambler.setText(scrambler.originalText);
            }
        });
        
        lastScrollPosition = currentScrollPosition;
        lastScrambleTime = currentTime;
    }
});

window.removeEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= -100 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('DOMContentLoaded', () => {
    initializeAllScramblers();
    initializeMessages();
    startSlideshow();
});

const originalAddTodo = addTodo;
function addTodo() {
    originalAddTodo.call(this);
    setTimeout(initializeAllScramblers, 100);
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            setTimeout(initializeAllScramblers, 100);
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

document.querySelectorAll('.project-card').forEach(card => {
  let touchStartX = 0;
  let touchEndX = 0;
  let currentCard = null;
  let isScrolling = false;
  let scrollTimeout;
  
  card.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    currentCard = card;
    isScrolling = false;
    
    clearTimeout(scrollTimeout);
  });
  
  card.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
    const diffX = touchEndX - touchStartX;
    
    if (Math.abs(diffX) > 5) {
      isScrolling = true;
      
      document.querySelectorAll('.project-card').forEach(c => {
        if (c !== currentCard) {
          c.classList.remove('stuck');
        }
      });
    }
    
    const elementAtPoint = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    
    const newCard = elementAtPoint?.closest('.project-card');
    if (newCard && newCard !== currentCard) {
      currentCard?.classList.remove('stuck');
      currentCard = newCard;
      
      if (Math.abs(diffX) < 3) {
        newCard.classList.add('stuck');
      }
    }
  });
  
  card.addEventListener('touchend', (e) => {
    const diffX = touchEndX - touchStartX;
    
    if (!isScrolling && Math.abs(diffX) < 5) {
      card.classList.toggle('stuck');
    }
    
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150);
  });
});

let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
  const diffY = e.touches[0].clientY - touchStartY;
  if (Math.abs(diffY) > 10) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.remove('stuck');
    });
  }
});

function initializeProjectScroll() {
    const projectGrid = document.querySelector('.project-grid');
    let autoScrollInterval;
    let isUserScrolling = false;
    let lastInteractionTime = Date.now();
    const INTERACTION_TIMEOUT = 5000;

    function autoScroll() {
        if (!isUserScrolling && Date.now() - lastInteractionTime > INTERACTION_TIMEOUT) {
            const scrollAmount = 300;
            const maxScroll = projectGrid.scrollWidth - projectGrid.clientWidth;
            const newScrollPosition = projectGrid.scrollLeft + scrollAmount;
            
            if (newScrollPosition >= maxScroll) {
                projectGrid.scrollTo({ 
                    'inset-inline-start': 0,
                    behavior: 'smooth' 
                });
            } else {
                projectGrid.scrollTo({ 
                    'inset-inline-start': newScrollPosition,
                    behavior: 'smooth' 
                });
            }
        }
    }

    autoScrollInterval = setInterval(autoScroll, 5000);

    const stopAutoScroll = () => {
        isUserScrolling = true;
        lastInteractionTime = Date.now();
        clearInterval(autoScrollInterval);
    };

    const resumeAutoScroll = () => {
        isUserScrolling = false;
        if (!autoScrollInterval) {
            autoScrollInterval = setInterval(autoScroll, 5000);
        }
    };

    const interactionEvents = ['mouseenter', 'touchstart', 'wheel', 'keydown'];
    const endInteractionEvents = ['mouseleave', 'touchend'];

    interactionEvents.forEach(event => {
        projectGrid.addEventListener(event, stopAutoScroll);
    });

    endInteractionEvents.forEach(event => {
        projectGrid.addEventListener(event, () => {
            setTimeout(resumeAutoScroll, INTERACTION_TIMEOUT);
        });
    });

    projectGrid.addEventListener('scroll', () => {
        lastInteractionTime = Date.now();
    });

    return () => {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    };
}

document.addEventListener('DOMContentLoaded', () => {
    initializeMessages();
    startSlideshow();
    initializeAllScramblers();
    initializeProjectScroll();
});

function setRandomFloatingDurations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const randomDuration = Math.random() * (6 - 3) + 3;
        const randomDelay = Math.random() * 2;
        
        section.style.setProperty('--float-duration', `${randomDuration}s`);
        section.style.animationDelay = `-${randomDelay}s`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeMessages();
    startSlideshow();
    initializeAllScramblers();
    initializeProjectScroll();
    setRandomFloatingDurations();
});

function updateFloatingDurations() {
    setRandomFloatingDurations();
    const randomInterval = Math.random() * (20000 - 10000) + 10000;
    setTimeout(updateFloatingDurations, randomInterval);
}

updateFloatingDurations();

function initializeMessages() {
}

document.addEventListener('DOMContentLoaded', () => {
    const todoButton = document.querySelector('.todo-button');
    const todoInput = document.querySelector('.todo-input');
    
    if (todoButton) {
        todoButton.addEventListener('click', addTodo);
    }
    
    if (todoInput) {
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo(e);
            }
        });
    }
    
    initializeMessages();
});

function initializeProjectMouseScroll() {
    const projectGrid = document.querySelector('.project-grid');
    let isDown = false;
    let startX;
    let scrollLeft;

    projectGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        projectGrid.style.cursor = 'grabbing';
        startX = e.pageX - projectGrid.offsetLeft;
        scrollLeft = projectGrid.scrollLeft;
        e.preventDefault();
    });

    projectGrid.addEventListener('mouseleave', () => {
        isDown = false;
        projectGrid.style.cursor = 'grab';
    });

    projectGrid.addEventListener('mouseup', () => {
        isDown = false;
        projectGrid.style.cursor = 'grab';
    });

    projectGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectGrid.offsetLeft;
        const walk = (x - startX) * 2;
        projectGrid.scrollLeft = scrollLeft - walk;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeMessages();
    startSlideshow();
    initializeAllScramblers();
    initializeProjectScroll();
    setRandomFloatingDurations();
    initializeProjectMouseScroll();
});

function initializeAutoScroll() {
    const projectGrid = document.querySelector('.project-grid');
    let autoScrollInterval;
    let isUserInteracting = false;
    const scrollAmount = 1;
    const scrollInterval = 30;
    const pauseDuration = 2000;

    function startAutoScroll() {
        let direction = 1;
        let pauseTimeout = null;

        autoScrollInterval = setInterval(() => {
            if (!isUserInteracting) {
                const maxScroll = projectGrid.scrollWidth - projectGrid.clientWidth;
                const currentScroll = projectGrid.scrollLeft;

                if (currentScroll >= maxScroll) {
                    direction = -1;
                    if (!pauseTimeout) {
                        clearInterval(autoScrollInterval);
                        pauseTimeout = setTimeout(() => {
                            startAutoScroll();
                            pauseTimeout = null;
                        }, pauseDuration);
                    }
                } else if (currentScroll <= 0) {
                    direction = 1;
                    if (!pauseTimeout) {
                        clearInterval(autoScrollInterval);
                        pauseTimeout = setTimeout(() => {
                            startAutoScroll();
                            pauseTimeout = null;
                        }, pauseDuration);
                    }
                }

                projectGrid.scrollLeft += (scrollAmount * direction);
            }
        }, scrollInterval);
    }

    startAutoScroll();

    const interactionEvents = ['mouseenter', 'touchstart', 'wheel', 'keydown'];
    interactionEvents.forEach(event => {
        projectGrid.addEventListener(event, () => {
            isUserInteracting = true;
            clearInterval(autoScrollInterval);
        });
    });

    const endInteractionEvents = ['mouseleave', 'touchend'];
    endInteractionEvents.forEach(event => {
        projectGrid.addEventListener(event, () => {
            setTimeout(() => {
                isUserInteracting = false;
                startAutoScroll();
            }, 1000);
        });
    });

    window.addEventListener('unload', () => {
        clearInterval(autoScrollInterval);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeMessages();
    startSlideshow();
    initializeAllScramblers();
    initializeProjectScroll();
    setRandomFloatingDurations();
    initializeProjectMouseScroll();
    initializeAutoScroll();
});

function initializeMobileHover() {
    const projectGrid = document.querySelector('.project-grid');
    let scrollTimeout;

    projectGrid.addEventListener('scroll', () => {
        projectGrid.classList.add('is-scrolling');
        
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            projectGrid.classList.remove('is-scrolling');
        }, 150);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeMessages();
    startSlideshow();
    initializeAllScramblers();
    initializeProjectScroll();
    setRandomFloatingDurations();
    initializeProjectMouseScroll();
    initializeAutoScroll();
    initializeMobileHover();
});

function initializeScrollIndicators() {
    const projectGrid = document.querySelector('.project-grid');
    
    function updateScrollIndicators() {
        const isAtStart = projectGrid.scrollLeft <= 10;
        const isAtEnd = projectGrid.scrollLeft >= (projectGrid.scrollWidth - projectGrid.clientWidth - 10);
        
        projectGrid.setAttribute('data-at-start', isAtStart);
        projectGrid.setAttribute('data-at-end', isAtEnd);
    }
    
    projectGrid.addEventListener('scroll', updateScrollIndicators);
    
    updateScrollIndicators();
    
    window.addEventListener('resize', updateScrollIndicators);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeScrollIndicators();
});
