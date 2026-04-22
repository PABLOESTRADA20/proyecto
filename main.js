const cursor = document.getElementById('cursor');
const dot = cursor.querySelector('.dot');
const ring = cursor.querySelector('.ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;


document.addEventListener('mousemove',function (e) { 
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

var interactivos = document.querySelectorAll('a, button, project-card, .skill-pill');

interactivos.forEach(function(el) {
    el.addEventListener('mouseenter', function() {
        document.body.classList.add('hovering');
});
    el.addEventListener('mouseleave', function() {
        document.body.classList.remove('hovering');
    });
});

var navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

var observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {

        entry.target.classList.add('visible');
 
      
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1  
  }
);
 

document.querySelectorAll('.reveal').forEach(function(el) {
  observer.observe(el);
});