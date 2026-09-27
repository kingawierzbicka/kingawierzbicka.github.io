/* Site interactions: hamburger menu, expandable bio, carousels.
   Carousels are CSS scroll-snap tracks; JS adds arrow buttons and
   mouse-drag scrolling. Touch and trackpad scroll natively. */
(function () {
  'use strict';

  /* ── hamburger menu ─────────────────────────────────────── */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('site-menu');
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  /* ── expandable bio ─────────────────────────────────────── */
  var bioBtn = document.querySelector('.bio-toggle');
  if (bioBtn) {
    bioBtn.addEventListener('click', function () {
      var panel = document.getElementById(bioBtn.getAttribute('aria-controls'));
      var open = bioBtn.getAttribute('aria-expanded') === 'true';
      bioBtn.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('open', !open);
      bioBtn.textContent = open ? 'More' : 'Less';
    });
  }

  /* ── carousels (shared by Blog and Gallery sections) ────── */
  document.querySelectorAll('[data-carousel]').forEach(function (car) {
    var track = car.querySelector('.car-track');
    var prev = car.querySelector('.car-prev');
    var next = car.querySelector('.car-next');
    if (!track) return;

    var step = function () {
      var card = track.querySelector('.card');
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });

    /* mouse drag to scroll; suppress the click that ends a drag */
    var down = false, startX = 0, startLeft = 0, moved = 0;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.classList.add('dragging');
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      track.classList.remove('dragging');
    });
    track.addEventListener('click', function (e) {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    }, true);
  });
})();
