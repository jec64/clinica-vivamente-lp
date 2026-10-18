document.getElementById('year').textContent = new Date().getFullYear();
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }
  }, { rootMargin: '-25% 0px -40% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

// Animações progressivas: o conteúdo permanece visível sem JavaScript.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const animations = new Set();
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      reveal.unobserve(entry.target);
      if (motionPreference.matches || !entry.target.animate) return;
      const animation = entry.target.animate([
        { opacity: 0.45, transform: 'translateY(14px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 850, easing: 'cubic-bezier(.22,1,.36,1)' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.about-grid, .service-card, .google-card, .instagram-card, .location-copy, .map-card, .contact-inner').forEach(element => reveal.observe(element));
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      reveal.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }
  });
}

const orbitToggle=document.getElementById('orbit-toggle');
if(orbitToggle){orbitToggle.addEventListener('click',()=>{const paused=orbitToggle.getAttribute('aria-pressed')!=='true';orbitToggle.setAttribute('aria-pressed',String(paused));orbitToggle.textContent=paused?'Retomar movimento':'Pausar movimento';document.querySelector('.specialty-universe').classList.toggle('orbit-paused',paused);});}
