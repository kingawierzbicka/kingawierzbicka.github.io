/* Accessible lightbox for the galleries.
   Progressive enhancement: the grid images load and link on their own; this script
   adds a full-screen dark-stage viewer with mouse, keyboard (Left/Right/Esc), and
   touch (swipe) control, focus management, and a position counter. */
(function () {
  'use strict';

  var lb = document.getElementById('lightbox');
  if (!lb) return;

  var triggers = Array.prototype.slice.call(document.querySelectorAll('.shot .open'));
  if (!triggers.length) return;

  var img = lb.querySelector('.lb-img');
  var cap = lb.querySelector('.lb-cap');
  var count = lb.querySelector('.lb-count');
  var btnClose = lb.querySelector('.lb-close');
  var btnPrev = lb.querySelector('.lb-prev');
  var btnNext = lb.querySelector('.lb-next');

  var slides = triggers.map(function (t) {
    var im = t.querySelector('img');
    return {
      full: t.getAttribute('data-full'),
      title: t.getAttribute('data-title') || '',
      meta: t.getAttribute('data-meta') || '',
      alt: (im && im.getAttribute('alt')) || ''
    };
  });

  var current = 0;
  var lastFocused = null;

  function render(i) {
    var s = slides[i];
    img.setAttribute('src', s.full);
    img.setAttribute('alt', s.alt);
    var html = '';
    if (s.title) html += '<div class="t">' + s.title + '</div>';
    if (s.meta) html += '<div class="m">' + s.meta + '</div>';
    cap.innerHTML = html;
    count.textContent = (i + 1) + ' / ' + slides.length;
  }

  function open(i) {
    current = i;
    lastFocused = document.activeElement;
    render(i);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    img.setAttribute('src', '');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function go(delta) {
    current = (current + delta + slides.length) % slides.length;
    render(current);
  }

  triggers.forEach(function (t, i) {
    t.addEventListener('click', function () { open(i); });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { go(-1); });
  btnNext.addEventListener('click', function () { go(1); });

  // click the dark backdrop (not the image or a control) to close
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lb-stage')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    switch (e.key) {
      case 'Escape': close(); break;
      case 'ArrowLeft': go(-1); break;
      case 'ArrowRight': go(1); break;
      case 'Tab': trapFocus(e); break;
    }
  });

  // keep focus inside the dialog while it is open
  function trapFocus(e) {
    var f = [btnClose, btnPrev, btnNext];
    var idx = f.indexOf(document.activeElement);
    if (e.shiftKey) {
      if (idx <= 0) { f[f.length - 1].focus(); e.preventDefault(); }
    } else {
      if (idx === f.length - 1) { f[0].focus(); e.preventDefault(); }
    }
  }

  // touch: swipe left/right to move, swipe down to close
  var x0 = null, y0 = null;
  lb.addEventListener('touchstart', function (e) {
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    var dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    } else if (dy > 60 && Math.abs(dy) > Math.abs(dx)) {
      close();
    }
    x0 = y0 = null;
  }, { passive: true });
})();
