const publicationAuthorRows = [];
const maximumVisibleAuthors = 6;

function fitPublicationAuthors() {
  publicationAuthorRows.forEach(({ row, visible, authors }) => {
    if (!row.getClientRects().length || !row.clientWidth) return;

    row.style.removeProperty('font-size');
    const availableWidth = row.getBoundingClientRect().width;
    const included = authors.map(() => true);
    let visibleCount = authors.length;

    function render() {
      const parts = [];
      authors.forEach((author, index) => {
        if (included[index]) {
          parts.push(author.html);
        } else if (index === 0 || included[index - 1]) {
          parts.push('<span class="pub-author-ellipsis">…</span>');
        }
      });
      visible.innerHTML = parts.join(', ');
    }

    // Keep the first/last author, the highlighted author and every † author.
    // Keep long lists compact even when the row has room for more names.
    // Remove complete names from the middle, never clip a corresponding name.
    const middle = (authors.length - 1) / 2;
    const removable = authors.map((author, index) => ({ author, index }))
      .filter(({ author, index }) => index > 0 && index < authors.length - 1 && !author.protected)
      .sort((a, b) => Math.abs(a.index - middle) - Math.abs(b.index - middle));

    render();
    for (const { index } of removable) {
      if (visibleCount <= maximumVisibleAuthors && visible.getBoundingClientRect().width <= availableWidth) break;
      included[index] = false;
      visibleCount -= 1;
      render();
    }

    // On narrow screens, fit the remaining essential names without hiding them.
    const remainingWidth = visible.getBoundingClientRect().width;
    if (remainingWidth > availableWidth) {
      const fontSize = parseFloat(getComputedStyle(row).fontSize);
      row.style.fontSize = `${fontSize * (availableWidth - 1) / remainingWidth}px`;
    }
    row.classList.toggle('pub-authors-shortened', included.includes(false));
  });
}

function initializePublicationAuthors() {
  document.querySelectorAll('.publication-card .pub-authors').forEach((row) => {
    const fullAuthors = document.createElement('span');
    fullAuthors.innerHTML = row.dataset.authorsFull || row.innerHTML;
    const fullText = fullAuthors.textContent.replace(/\s+/g, ' ').trim();
    const authors = row.innerHTML.trim().split(/\s*,\s*/).map((html) => {
      const author = document.createElement('span');
      author.innerHTML = html;
      return { html, protected: author.textContent.includes('†') || !!author.querySelector('strong') };
    });
    const visible = document.createElement('span');
    visible.className = 'pub-authors-visible';
    visible.setAttribute('aria-hidden', 'true');
    const complete = document.createElement('span');
    complete.className = 'pub-authors-complete';
    complete.textContent = fullText;
    row.replaceChildren(visible, complete);
    row.classList.add('pub-author-line');
    row.title = fullText;
    publicationAuthorRows.push({ row, visible, authors });
  });

  let frame;
  const scheduleFit = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fitPublicationAuthors);
  };
  const observer = new ResizeObserver(scheduleFit);
  publicationAuthorRows.forEach(({ row }) => observer.observe(row));
  document.fonts.ready.then(scheduleFit);
}

document.addEventListener('DOMContentLoaded', () => {
  initializePublicationAuthors();
  fitPublicationAuthors();
});
