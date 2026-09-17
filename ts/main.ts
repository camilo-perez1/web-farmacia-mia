document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector<HTMLElement>('#site-header');
  const menuToggle = document.querySelector<HTMLButtonElement>('#menu-toggle');
  const nav = document.querySelector<HTMLElement>('#main-nav');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.main-nav a');
  const sections = document.querySelectorAll<HTMLElement>('main section[id]');
  const revealItems = document.querySelectorAll<HTMLElement>('.reveal');

  const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Abrir menú');
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 5, 4) * 60}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = (entry.target as HTMLElement).id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { threshold: 0.25, rootMargin: '-20% 0px -55% 0px' }
  );

  sections.forEach((section) => sectionObserver.observe(section));
});
