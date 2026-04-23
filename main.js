// ════════════════════════════════════════════════════════════
//  CURSOR
// ════════════════════════════════════════════════════════════
const cursor = document.getElementById('cursor');
const dot    = cursor.querySelector('.dot');
const ring   = cursor.querySelector('.ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
});
function animateCursor() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-card, .skill-pill, .contact-card, .acard').forEach(function(el) {
  el.addEventListener('mouseenter', function() { document.body.classList.add('hovering'); });
  el.addEventListener('mouseleave', function() { document.body.classList.remove('hovering'); });
});


// ════════════════════════════════════════════════════════════
//  NAVBAR
// ════════════════════════════════════════════════════════════
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ════════════════════════════════════════════════════════════
//  SCROLL REVEAL (elementos genéricos con clase .reveal)
// ════════════════════════════════════════════════════════════
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});


// ════════════════════════════════════════════════════════════
//  TYPING EFFECT — Sección "Sobre mí"
//
//  Muestra frases distintas en un bucle infinito.
//  Cada frase se "escribe" carácter a carácter (typeSpeed ms),
//  espera (pauseTime ms) y luego se "borra" carácter a carácter.
// ════════════════════════════════════════════════════════════
var phrases = [
  'Desarrollador Frontend con alma de diseñador.',
  'Apasionado por el código limpio y la UX.',
  'Construyo ideas, un componente a la vez.',
  'React, Node, café ☕ y muchas horas de debug.',
  'Disponible para tu próximo proyecto.'
];

var typingEl   = document.getElementById('about-typing');
var phraseIdx  = 0;   // índice de la frase actual
var charIdx    = 0;   // índice del carácter actual dentro de la frase
var isDeleting = false;
var typeSpeed  = 55;  // ms entre cada carácter al escribir
var deleteSpeed= 28;  // ms entre cada carácter al borrar
var pauseTime  = 2000;// ms de pausa cuando la frase está completa

// La sección debe ser visible antes de arrancar el efecto.
// Usamos IntersectionObserver para esperar que entre al viewport.
var typingStarted = false;

var typingObserver = new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting && !typingStarted) {
    typingStarted = true;
    typeLoop();
    typingObserver.disconnect();
  }
}, { threshold: 0.3 });

var aboutSection = document.getElementById('about');
if (aboutSection) typingObserver.observe(aboutSection);

function typeLoop() {
  var current = phrases[phraseIdx];

  if (!isDeleting) {
    // ── Escribiendo ──
    charIdx++;
    typingEl.textContent = current.slice(0, charIdx);

    if (charIdx === current.length) {
      // Frase completa → esperar antes de borrar
      isDeleting = true;
      setTimeout(typeLoop, pauseTime);
      return;
    }
    setTimeout(typeLoop, typeSpeed);

  } else {
    // ── Borrando ──
    charIdx--;
    typingEl.textContent = current.slice(0, charIdx);

    if (charIdx === 0) {
      // Frase borrada → pasar a la siguiente
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 400); // pequeña pausa antes de escribir la siguiente
      return;
    }
    setTimeout(typeLoop, deleteSpeed);
  }
}


// ════════════════════════════════════════════════════════════
//  CARDS EXPANDIBLES — Sección "Sobre mí"
//
//  Al hacer clic en una card se abre/cierra con la clase "open".
//  El CSS gestiona la transición de max-height y opacidad.
//  La primera card abre sola al cargar.
// ════════════════════════════════════════════════════════════
var cards = document.querySelectorAll('.acard');

// Abrir la primera card automáticamente después de un momento
setTimeout(function() {
  if (cards[0]) cards[0].classList.add('open');
}, 800);

cards.forEach(function(card) {
  card.addEventListener('click', function() {
    var isOpen = card.classList.contains('open');

    // Cerrar todas
    cards.forEach(function(c) { c.classList.remove('open'); });

    // Si la clickeada no estaba abierta, abrirla
    if (!isOpen) card.classList.add('open');
  });
});




// ════════════════════════════════════════════════════════════
//  SUBIR FOTO DE PERFIL
// ════════════════════════════════════════════════════════════
var photoInput = document.getElementById('photo-upload');
var profileImg = document.getElementById('profile-photo');

if (photoInput && profileImg) {
  photoInput.addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(event) { profileImg.src = event.target.result; };
    reader.readAsDataURL(file);
  });
}