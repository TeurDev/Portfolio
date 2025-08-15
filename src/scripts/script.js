document.addEventListener('DOMContentLoaded', () => {
  const navbar          = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 70;
  const desktopBtn      = document.getElementById('theme-toggle');
  const mobileBtnTheme  = document.getElementById('mobile-theme-toggle');

  const linkedinIcon = document.getElementById('linkedin-icon');
  const githubIcon   = document.getElementById('github-icon');

  // Detecta entorno: Pages o local
  const isPages = window.location.pathname.includes('/Portfolio/');
  const basePath = isPages ? '/Portfolio/src/img/' : 'src/img/';

  // Función para actualizar íconos según tema
function getBasePath() {
  const pathname = window.location.pathname;

  if (pathname.includes('index.html') || pathname === '/' || pathname === '/Portfolio/') {
    return 'src/img/';           // raíz
  } else if (pathname.includes('pages/projects/project-detail')) {
    return '../../img/';         // project-detail.html
  } else if (pathname.includes('pages/projects')) {
    return '../img/';            // projects.html
  } else {
    return '../img/';            // fallback
  }
}

function updateIcons(isLight) {
  const linkedinIcon = document.getElementById('linkedin-icon');
  const githubIcon   = document.getElementById('github-icon');

  const basePath = getBasePath();

  linkedinIcon.src = isLight ? basePath + 'lind.png' : basePath + 'linl.png';
  githubIcon.src   = isLight ? basePath + 'gitd.png' : basePath + 'gitl.png';
}




  // 1) Restaurar tema desde localStorage
  const savedTheme = localStorage.getItem('theme');
  const isLight = !savedTheme || savedTheme === 'light';

  if (isLight) {
    document.body.classList.add('light-mode');
    desktopBtn.textContent = 'Dark';
    if (mobileBtnTheme) mobileBtnTheme.textContent = 'Dark';
  } else {
    document.body.classList.remove('light-mode');
    desktopBtn.textContent = 'Light';
    if (mobileBtnTheme) mobileBtnTheme.textContent = 'Light';
  }

  updateIcons(isLight); // actualizar íconos al cargar

  // 2) Scroll: toggle clases scrolled
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
    desktopBtn.textContent = isLight ? 'Dark' : 'Light';
    if (mobileBtnTheme) mobileBtnTheme.textContent = isLight ? 'Dark' : 'Light';
    updateIcons(isLight); // actualizar íconos al cambiar tema
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
