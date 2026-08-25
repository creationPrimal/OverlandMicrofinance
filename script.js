// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle?.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

// ===== Active nav link on scroll =====
const links = document.querySelectorAll('.nav-menu a[href^="#"]');
const sections = [...links].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;
  sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
});

// ===== Hero Slider =====
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.getElementById('sliderDots');
let current = 0;
let timer;

slides.forEach((_, i) => {
  const b = document.createElement('button');
  if (i === 0) b.classList.add('active');
  b.setAttribute('aria-label', `Go to slide ${i + 1}`);
  b.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(b);
});

function goTo(i) {
  slides[current].classList.remove('active');
  dotsWrap.children[current].classList.remove('active');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
  dotsWrap.children[current].classList.add('active');
  resetTimer();
}
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 6000);
}
document.getElementById('prevSlide').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextSlide').addEventListener('click', () => goTo(current + 1));
resetTimer();

// Pause on hover
const hero = document.querySelector('.hero');
hero.addEventListener('mouseenter', () => clearInterval(timer));
hero.addEventListener('mouseleave', resetTimer);

// ===== Tabs =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(id).classList.add('active');
  });
});

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Reveal on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'none';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.pillar, .service-card, .news-card, .testimonial, .stat').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  observer.observe(el);
});
