(function () {
  const section = document.querySelector('.home-experience');
  if (!section) return;

  const scroller = section.querySelector('#experience-scroll');
  const controls = section.querySelector('.experience-controls');
  const previous = section.querySelector('[data-experience-prev]');
  const next = section.querySelector('[data-experience-next]');
  const firstItem = section.querySelector('.timeline-stage');
  if (!scroller || !controls || !previous || !next || !firstItem) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function updateControls() {
    const maximum = scroller.scrollWidth - scroller.clientWidth;
    controls.hidden = maximum <= 1;
    previous.disabled = scroller.scrollLeft <= 1;
    next.disabled = scroller.scrollLeft >= maximum - 1;
  }

  function moveTo(left) {
    scroller.scrollTo({
      left: left,
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
  }

  function moveByItem(direction) {
    const secondItem = firstItem.nextElementSibling;
    const step = secondItem
      ? secondItem.offsetLeft - firstItem.offsetLeft
      : firstItem.getBoundingClientRect().width;
    moveTo(scroller.scrollLeft + direction * step);
  }

  previous.addEventListener('click', function () { moveByItem(-1); });
  next.addEventListener('click', function () { moveByItem(1); });
  scroller.addEventListener('scroll', updateControls, { passive: true });
  scroller.addEventListener('keydown', function (event) {
    if (event.target !== scroller || event.altKey || event.ctrlKey || event.metaKey) return;

    switch (event.key) {
      case 'ArrowLeft': moveByItem(-1); break;
      case 'ArrowRight': moveByItem(1); break;
      case 'Home': moveTo(0); break;
      case 'End': moveTo(scroller.scrollWidth); break;
      default: return;
    }
    event.preventDefault();
  });

  if ('ResizeObserver' in window) {
    new ResizeObserver(updateControls).observe(scroller);
  } else {
    window.addEventListener('resize', updateControls);
  }
  updateControls();
})();
