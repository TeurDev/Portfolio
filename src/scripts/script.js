document.addEventListener('DOMContentLoaded', () => {
  const navbar          = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 70;
  const desktopBtn      = document.getElementById('theme-toggle');
  const mobileBtnTheme  = document.getElementById('mobile-theme-toggle');

  // 1) Restaurar tema desde localStorage
  const savedTheme = localStorage.getItem('theme');

  if (!savedTheme || savedTheme === 'light') {
  // Si no hay nada guardado o es "light"
  document.body.classList.add('light-mode');
  desktopBtn.textContent = 'Dark';
  if (mobileBtnTheme) mobileBtnTheme.textContent = 'Dark';
  } else {
  // Si está guardado como "dark"
  document.body.classList.remove('light-mode');
  desktopBtn.textContent = 'Light';
  if (mobileBtnTheme) mobileBtnTheme.textContent = 'Light';
  }

  // 2) Scroll: toggla clases scrolled
  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled','max-w-4xl','px-8','bg-gray-800/50','backdrop-blur-lg','rounded-3xl','shadow-lg');
      navbar.classList.remove('max-w-6xl','px-4','bg-transparent','backdrop-blur-none');
    } else {
      navbar.classList.remove('scrolled','max-w-4xl','px-8','bg-gray-800/50','backdrop-blur-lg','rounded-3xl','shadow-lg');
      navbar.classList.add('max-w-6xl','px-4','bg-transparent','backdrop-blur-none');
    }
  });

  // 3) Cambio de tema (desktop + móvil)
  function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    desktopBtn.textContent    = isLight ? 'Dark' : 'Light';
    if (mobileBtnTheme) mobileBtnTheme.textContent = isLight ? 'Dark' : 'Light';
  }
  desktopBtn.addEventListener('click', toggleTheme);
  if (mobileBtnTheme) mobileBtnTheme.addEventListener('click', toggleTheme);

  // 4) Menú móvil con fade
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu    = document.getElementById('mobile-menu');
  function openMenu() {
    mobileMenu.classList.remove('pointer-events-none','opacity-0');
  }
  function closeMenu() {
    mobileMenu.classList.add('opacity-0');
    mobileMenu.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'opacity') {
        mobileMenu.classList.add('pointer-events-none');
        mobileMenu.removeEventListener('transitionend', handler);
      }
    });
  }
  mobileMenuBtn.addEventListener('click', () =>
    mobileMenu.classList.contains('pointer-events-none') ? openMenu() : closeMenu()
  );
  mobileMenu.querySelectorAll('a, button').forEach(el =>
    el.addEventListener('click', closeMenu)
  );
});
