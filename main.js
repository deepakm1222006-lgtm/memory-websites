document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');

  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');

    if (themeToggle) {
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  if (savedTheme === 'dark') {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const setNavbarState = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 18);
    };
    setNavbarState();
    window.addEventListener('scroll', setNavbarState, { passive: true });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar nav a');
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop() || 'index.html';
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  const quoteElement = document.getElementById('dailyQuote');
  const quoteButton = document.getElementById('newQuote');
  const quotes = [
    'Small progress is still progress.',
    'You do not have to be perfect. Just keep going.',
    'One good day can start with one small step.',
    'Learn something new today.',
    'Your future self will thank you for today\'s effort.',
    'Take a break when you need one. Then continue.',
    'Try. Learn. Improve. Repeat.',
    'A new place can create new memories.',
    'Do not compare your chapter with someone else\'s.',
    'Keep moving forward. 🚀',
    'Make today a little better than yesterday.',
    'You are allowed to start small.'
  ];

  if (quoteButton && quoteElement) {
    const updateQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteElement.textContent = quotes[randomIndex];
    };
    updateQuote();
    quoteButton.addEventListener('click', updateQuote);
  }
});
