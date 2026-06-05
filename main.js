// ════════════════════════════════════════════════════════════
//  CURSOR
// ════════════════════════════════════════════════════════════
const cursor = document.getElementById('cursor');
const dot = cursor.querySelector('.dot');
const ring = cursor.querySelector('.ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', function (e) {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
});




// ════════════════════════════════════════════════════════════
//  NAVBAR
// ════════════════════════════════════════════════════════════
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ════════════════════════════════════════════════════════════
//  SCROLL REVEAL (elementos genéricos con clase .reveal)
// ════════════════════════════════════════════════════════════
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function (el) {
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

var typingEl = document.getElementById('about-typing');
var phraseIdx = 0;   // índice de la frase actual
var charIdx = 0;   // índice del carácter actual dentro de la frase
var isDeleting = false;
var typeSpeed = 55;  // ms entre cada carácter al escribir
var deleteSpeed = 28;  // ms entre cada carácter al borrar
var pauseTime = 2000;// ms de pausa cuando la frase está completa

// La sección debe ser visible antes de arrancar el efecto.
// Usamos IntersectionObserver para esperar que entre al viewport.
var typingStarted = false;

var typingObserver = new IntersectionObserver(function (entries) {
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
      phraseIdx = (phraseIdx + 1) % phrases.length;
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
setTimeout(function () {
  if (cards[0]) cards[0].classList.add('open');
}, 800);

cards.forEach(function (card) {
  card.addEventListener('click', function () {
    var isOpen = card.classList.contains('open');

    // Cerrar todas
    cards.forEach(function (c) { c.classList.remove('open'); });

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
  photoInput.addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (event) { profileImg.src = event.target.result; };
    reader.readAsDataURL(file);
  });
}

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.bottom-nav a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});


// ════════════════════════════════════════════════════════════
//  AUDITOR DE PORTAFOLIO
//
//  Agrega los event listeners del cursor a los nuevos botones
//  del auditor y gestiona toda la lógica de selección.
// ════════════════════════════════════════════════════════════

// Extender el hover del cursor a los botones del auditor
function extendCursorHover() {
  document.querySelectorAll('.client-btn, .auditor-trigger, .auditor-close, .audit-reset').forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('hovering'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('hovering'); });
  });
}

// ── Datos de proyectos ──────────────────────────────────────
var auditProjects = [
  { id: 'fintrack',  name: 'Fintrack Dashboard' },
  { id: 'ecoshop',   name: 'EcoShop' },
  { id: 'devcollab', name: 'DevCollab' },
  { id: 'nomadmap',  name: 'NomadMap' }
];

var auditClients = {
  startup: {
    label: 'Startup',
    analysis: 'Las startups buscan <strong>velocidad de desarrollo, stack moderno y capacidad de escalar</strong>. Les importa ver que puedes construir productos completos end-to-end.',
    scores:  { devcollab: 94, fintrack: 88, ecoshop: 72, nomadmap: 65 },
    reasons: {
      devcollab: 'WebRTC + WebSockets muestra capacidad técnica avanzada y un producto real.',
      fintrack:  'Integración de IA y visualización de datos — muy valorado en startups B2C.',
      ecoshop:   'Stripe + Prisma son stack de startup estándar. Sólido, pero secundario.',
      nomadmap:  'Nicho estrecho. Solo si la startup opera en comunidades o lifestyle B2C.'
    },
    tips: [
      'Pon DevCollab al frente — grita "puedo construir un producto real desde cero".',
      'En Fintrack, menciona que escala a miles de usuarios, no solo que funciona.',
      'Agrega métricas: "reduce tiempo X en Y%", "soporta Z usuarios concurrentes".'
    ]
  },
  empresa: {
    label: 'Corporativo',
    analysis: 'Las empresas grandes valoran <strong>solidez técnica, integración de sistemas y trabajo en equipo</strong>. Buscan confianza, no innovación salvaje.',
    scores:  { fintrack: 91, devcollab: 82, ecoshop: 76, nomadmap: 45 },
    reasons: {
      fintrack:  'Dashboards financieros con datos en tiempo real = lenguaje corporativo.',
      devcollab: 'Herramientas de colaboración post-pandemia. Destaca el aspecto de equipos.',
      ecoshop:   'Stack sólido. El ángulo sostenible puede resonar con la RSE corporativa.',
      nomadmap:  'Difícil de conectar con necesidades corporativas. Ponlo al final.'
    },
    tips: [
      'Comienza con Fintrack — dice "entiendo procesos de negocio complejos".',
      'Reescribe DevCollab enfocando en "productividad de equipos".',
      'Oculta o posiciona al último NomadMap — puede sonar demasiado freelance.'
    ]
  },
  pyme: {
    label: 'PYME',
    analysis: 'Las PYMEs buscan <strong>resultados visibles y facilidad de uso</strong>. Quieren ver que entiendes su negocio, no tu stack técnico.',
    scores:  { ecoshop: 95, fintrack: 68, nomadmap: 55, devcollab: 40 },
    reasons: {
      ecoshop:   'E-commerce real con pagos. Es exactamente lo que necesitan ver.',
      fintrack:  'Relevante si lo reenmarcas como control financiero para negocios.',
      nomadmap:  'Solo si la PYME es del sector turismo o hostelería.',
      devcollab: 'Demasiado técnico para el contexto PYME. Ponlo al final.'
    },
    tips: [
      'EcoShop primero, siempre. Es tu portafolio en una sola imagen para comercios.',
      'Cambia la descripción de Fintrack a "control financiero para negocios".',
      'Enfoca el pitch en resultados para el cliente, no en tecnologías usadas.'
    ]
  },
  nomada: {
    label: 'Remoto / Nómada',
    analysis: 'Clientes nómadas valoran <strong>productos enfocados y experiencia pulida</strong>. Son técnicos o emprendedores digitales que aprecian la calidad del producto.',
    scores:  { nomadmap: 97, devcollab: 88, fintrack: 70, ecoshop: 52 },
    reasons: {
      nomadmap:  'Un producto hecho exactamente para esta audiencia. Abre con él sin duda.',
      devcollab: 'Colaboración en tiempo real = exactamente lo que usan en trabajo remoto.',
      fintrack:  'Útil como demostración de habilidades, pero no conecta con el estilo nómada.',
      ecoshop:   'Buen proyecto, pero alejado de las necesidades de este segmento.'
    },
    tips: [
      'NomadMap primero — es tu carta de presentación a esta comunidad.',
      'En DevCollab, menciona que fue diseñado pensando en equipos distribuidos.',
      'Comparte links en vivo — los nómadas valoran ver el producto funcionando.'
    ]
  },
  fintech: {
    label: 'Fintech / Datos',
    analysis: 'Clientes fintech buscan <strong>rigor técnico, visualización de datos y manejo financiero</strong>. Son los más exigentes técnicamente.',
    scores:  { fintrack: 97, ecoshop: 70, devcollab: 65, nomadmap: 42 },
    reasons: {
      fintrack:  'IA + datos + finanzas + visualización en tiempo real. Proyecto ideal.',
      ecoshop:   'Stripe y lógica de transacciones demuestran "lógica de negocio sólida".',
      devcollab: 'Sistemas distribuidos — útil pero secundario en contexto fintech.',
      nomadmap:  'Fuera de contexto para fintech. No lo incluyas en presentación inicial.'
    },
    tips: [
      'Fintrack al frente. Agrega capturas del dashboard y menciona la predicción IA.',
      'Si tienes código en GitHub, enlázalo directamente — los fintech miran el código.',
      'Considera agregar un proyecto de análisis de datos para redondear el perfil.'
    ]
  }
};

// ── Helpers ─────────────────────────────────────────────────
function auditResetCards() {
  document.querySelectorAll('.project-card').forEach(function (card) {
    card.classList.remove('audit-highlight', 'audit-dim');
    var bar = card.querySelector('.audit-score-bar');
    if (bar) bar.remove();
    var rank = card.querySelector('.project-rank');
    if (rank) rank.remove();
    var num = card.querySelector('.project-num');
    if (num) num.style.opacity = '';
  });
}

// ── Abrir / cerrar panel ─────────────────────────────────────
window.openAuditor = function () {
  var banner = document.getElementById('auditorBanner');
  var panel  = document.getElementById('auditorPanel');
  if (banner) banner.style.display = 'none';
  if (panel)  {
    panel.classList.add('open');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    extendCursorHover();
  }
};

window.closeAuditor = function () {
  var panel  = document.getElementById('auditorPanel');
  var banner = document.getElementById('auditorBanner');
  var results = document.getElementById('auditorResults');
  if (panel)   panel.classList.remove('open');
  if (banner)  banner.style.display = 'flex';
  if (results) results.classList.remove('show');
  document.querySelectorAll('.client-btn').forEach(function (b) { b.classList.remove('active'); });
  auditResetCards();
};

// ── Seleccionar cliente ──────────────────────────────────────
window.selectClient = function (id) {
  document.querySelectorAll('.client-btn').forEach(function (b) { b.classList.remove('active'); });
  var activeBtn = document.querySelector('[data-id="' + id + '"]');
  if (activeBtn) activeBtn.classList.add('active');

  var cd     = auditClients[id];
  var sorted = Object.entries(cd.scores).sort(function (a, b) { return b[1] - a[1]; });
  var rankLabels = ['1°', '2°', '3°', '4°'];

  // Aplicar estados a las cards
  auditResetCards();
  var grid = document.getElementById('projectsGrid');
  if (!grid) return;

  sorted.forEach(function (entry, i) {
    var pid  = entry[0];
    var score = entry[1];
    var card = grid.querySelector('[data-id="' + pid + '"]');
    if (!card) return;

    if (i <= 1) {
      card.classList.add('audit-highlight');
    } else {
      card.classList.add('audit-dim');
    }

    // Badge de ranking
    var rankEl = document.createElement('div');
    rankEl.className = 'project-rank';
    rankEl.textContent = rankLabels[i];
    card.insertBefore(rankEl, card.firstChild);

    // Barra de afinidad + nota
    var bar = document.createElement('div');
    bar.className = 'audit-score-bar';
    bar.innerHTML =
      '<div class="audit-score-label">Afinidad con ' + cd.label + '</div>' +
      '<div class="audit-score-track"><div class="audit-score-fill" style="width:0%"></div></div>' +
      '<div class="audit-score-note">' + cd.reasons[pid] + '</div>';
    card.appendChild(bar);

    // Animar barra con un pequeño delay
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var fill = bar.querySelector('.audit-score-fill');
        if (fill) fill.style.width = score + '%';
      });
    });
  });

  // Reordenar cards visualmente según ranking
  sorted.forEach(function (entry) {
    var card = grid.querySelector('[data-id="' + entry[0] + '"]');
    if (card) grid.appendChild(card);
  });

  // Renderizar panel de resultados
  var rankHTML = sorted.map(function (entry, i) {
    var pid  = entry[0];
    var proj = auditProjects.find(function (p) { return p.id === pid; });
    return '<div class="audit-rank-item">' +
      '<span class="audit-rank-num">' + rankLabels[i] + '</span>' +
      '<span><span class="audit-rank-name">' + proj.name + '</span> — ' + cd.reasons[pid] + '</span>' +
      '</div>';
  }).join('');

  var tipsHTML = cd.tips.map(function (t) {
    return '<div class="audit-tip">' + t + '</div>';
  }).join('');

  var results = document.getElementById('auditorResults');
  if (!results) return;

  results.innerHTML =
    '<div class="audit-analysis">' + cd.analysis + '</div>' +
    '<p class="audit-order-title">// orden recomendado</p>' +
    '<div class="audit-rank-list">' + rankHTML + '</div>' +
    '<p class="audit-tips-title">// recomendaciones</p>' +
    tipsHTML +
    '<button class="audit-reset" onclick="auditResetCards(); document.getElementById(\'auditorResults\').classList.remove(\'show\'); document.querySelectorAll(\'.client-btn\').forEach(function(b){b.classList.remove(\'active\');});">← reiniciar</button>';

  results.classList.add('show');
  extendCursorHover();
};