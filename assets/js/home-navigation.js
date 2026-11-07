/* Keep section headings clear of the navigation when its links wrap. */
jQuery(function ($) {
  const masthead = document.querySelector('.masthead--all-links');
  if (!masthead) return;

  function updateOffset() {
    const offset = Math.ceil(masthead.getBoundingClientRect().height) + 16;
    document.documentElement.style.setProperty('--home-nav-offset', offset + 'px');
    $.smoothScroll('options', { offset: -offset });
  }

  updateOffset();
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateOffset).observe(masthead);
  } else {
    window.addEventListener('resize', updateOffset);
  }

  // Apply the measured offset when arriving from an article or a shared link.
  if (window.location.hash) {
    requestAnimationFrame(function () {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({ block: 'start' });
    });
  }
});
