  /* ── 1. DARK / LIGHT TOGGLE ── */
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  toggleBtn.addEventListener('click', () => {
    const isDark = html.dataset.theme === 'dark';
    html.dataset.theme = isDark ? 'light' : 'dark';
    toggleBtn.textContent = isDark ? '🌙' : '☀️';
  });

  /* ── 2. NAVBAR SCROLL EFFECT ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── 3. TYPED TEXT EFFECT ── */
  const phrases = ['beautiful UIs.', 'clean code.', 'smooth experiences.', 'useful products.'];
  let pi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typedEl');
  function type() {
    const phrase = phrases[pi];
    el.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);
    if (!deleting && ci > phrase.length) { deleting = true; setTimeout(type, 1200); return; }
    if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
    setTimeout(type, deleting ? 45 : 90);
  }
  type();

  /* ── 4. SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));