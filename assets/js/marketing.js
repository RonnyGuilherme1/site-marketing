(function () {
  // Helpers
  function getAppBaseUrl() {
    var u = (window.APP_BASE_URL || '').toString().trim();
    if (!u) return '';
    // Remove trailing slash
    return u.replace(/\/+$/, '');
  }

  function go(path) {
    var base = getAppBaseUrl();
    if (!base) return;
    window.location.href = base + path;
  }

  function bindGoLinks() {
    var map = {
      login: function () { go('/login'); },
      'register-basic': function () { go('/register?plan=basic'); },
      'register-plus': function () { go('/register?plan=plus'); },
      'register-pro': function () { go('/register?plan=pro'); }
    };

    document.querySelectorAll('[data-go]').forEach(function (el) {
      var key = (el.getAttribute('data-go') || '').trim();
      var fn = map[key];
      if (!fn) return;
      el.addEventListener('click', function (e) {
        e.preventDefault();
        fn();
      });
    });
  }

  function setupYear() {
    var y = new Date().getFullYear();
    document.querySelectorAll('#year').forEach(function (el) {
      el.textContent = String(y);
    });
  }

  function setupMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('#site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      if (open) nav.classList.add('is-open');
      else nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      setOpen(open);
    });

    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setOpen(false);
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href') || '';
        if (!href || href === '#') return;
        var id = href.slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + id);
      });
    });
  }

  // FAQ accordion: mantém apenas 1 item aberto por vez
  function setupFaqAccordion() {
    var grid = document.querySelector('.faq-grid');
    if (!grid) return;

    var items = Array.prototype.slice.call(grid.querySelectorAll('details.faq-item'));
    if (!items.length) return;

    function closeOthers(current) {
      items.forEach(function (d) {
        if (d !== current) d.removeAttribute('open');
      });
    }

    items.forEach(function (d) {
      var summary = d.querySelector('summary');
      if (summary) {
        summary.addEventListener('click', function () {
          // Se vai abrir, fecha os outros antes
          if (!d.open) closeOthers(d);
        });
      }
      d.addEventListener('toggle', function () {
        if (d.open) closeOthers(d);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindGoLinks();
    setupYear();
    setupMobileNav();
    setupSmoothScroll();
    setupFaqAccordion();
  });
})();