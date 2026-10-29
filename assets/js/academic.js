document.documentElement.classList.add('js');

document.querySelectorAll('img[data-fallback-src]').forEach((image) => {
  const useFallback = () => {
    const fallback = image.dataset.fallbackSrc;
    if (!fallback) return;
    delete image.dataset.fallbackSrc;
    image.src = fallback;
  };
  image.addEventListener('error', useFallback, { once: true });
  if (image.complete && image.naturalWidth === 0) useFallback();
});

window.profileStatsReady = (async () => {
  const configuration = document.getElementById('profile-stats-config');
  if (!configuration) return;
  const { projects, snapshot } = JSON.parse(configuration.textContent);
  const githubBadge = document.querySelector('[data-github-badge]');
  const scholarBadge = document.querySelector('[data-scholar-badge]');
  const extraRepositories = projects.additional_repositories;
  const storageKey = 'profile-stats-v2:' + projects.user + ':' + extraRepositories.join(',');
  const validCount = (value) => Number.isSafeInteger(value) && value >= 0;
  const validRepositoryName = (name) => typeof name === 'string' && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(name);
  let current = { ...snapshot };
  let refreshing = false;
  let lastRefresh = 0;

  const fetchJSON = async (url) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw new Error('Statistics request unavailable');
      return await response.json();
    } finally {
      clearTimeout(timeout);
    }
  };

  const updateBadge = (badge, label, count) => {
    const display = count >= 1000 ? (Math.round(count / 100) / 10).toFixed(1) + 'k' : String(count);
    const labelWidth = label === 'stars' ? 54 : 74;
    const valueWidth = Math.max(21, display.length * 7 + 10);
    const width = labelWidth + valueWidth;
    const svg = badge.querySelector('svg');
    svg.setAttribute('width', String(width));
    svg.setAttribute('viewBox', '0 0 ' + width + ' 20');
    svg.setAttribute('aria-label', label + ': ' + count.toLocaleString('en-US'));
    svg.querySelector('title').textContent = label + ': ' + count.toLocaleString('en-US');
    svg.querySelectorAll('[data-badge-total]').forEach((rect) => rect.setAttribute('width', String(width)));
    svg.querySelector('[data-badge-value-background]').setAttribute('width', String(valueWidth));
    const value = svg.querySelector('[data-badge-value]');
    value.setAttribute('x', String(labelWidth + valueWidth / 2));
    value.textContent = display;
  };

  const validGithubStats = (stats) => {
    if (stats.github_user !== projects.user || stats.github_scope !== 'owned-and-research' || !validCount(stats.github_stars) || !Array.isArray(stats.github_repositories)) return false;
    const names = new Set();
    let sum = 0;
    for (const repository of stats.github_repositories) {
      if (!validRepositoryName(repository.name) || !validCount(repository.stars)) return false;
      const name = repository.name.toLowerCase();
      if (names.has(name)) return false;
      if (!name.startsWith(projects.user.toLowerCase() + '/') && !extraRepositories.some((extra) => extra.toLowerCase() === name)) return false;
      names.add(name);
      sum += repository.stars;
    }
    return sum === stats.github_stars && extraRepositories.every((name) => names.has(name.toLowerCase()));
  };

  const applyStats = (stats, includeGithub = true) => {
    if (!stats || typeof stats !== 'object') return;
    const olderGithub = typeof stats.github_checked_on === 'string' && typeof current.github_checked_on === 'string' && stats.github_checked_on < current.github_checked_on;
    if (githubBadge && includeGithub && !olderGithub && validGithubStats(stats)) {
      for (const field of ['github_user', 'github_scope', 'github_stars', 'github_checked_on', 'github_repositories']) current[field] = stats[field];
      updateBadge(githubBadge, 'stars', current.github_stars);
      const list = document.querySelector('[data-star-repositories]');
      list.replaceChildren(...current.github_repositories.map((repository) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = 'https://github.com/' + repository.name;
        link.textContent = repository.name;
        const count = document.createElement('span');
        count.textContent = repository.stars.toLocaleString('en-US') + ' ★';
        item.append(link, ' ', count);
        return item;
      }));
      const updated = typeof current.github_checked_on === 'string' ? current.github_checked_on.slice(0, 10) : '';
      document.querySelector('[data-stars-updated]').textContent = updated ? 'Updated ' + updated + '.' : '';
      githubBadge.title = current.github_stars.toLocaleString('en-US') + ' stars across my public repositories and coauthored research projects. View breakdown.';
      githubBadge.setAttribute('aria-label', githubBadge.title);
    }
    const olderScholar = typeof stats.scholar_checked_on === 'string' && typeof current.scholar_checked_on === 'string' && stats.scholar_checked_on < current.scholar_checked_on;
    if (!olderScholar && stats.scholar_profile_id === snapshot.scholar_profile_id && validCount(stats.scholar_citations)) {
      current.scholar_citations = stats.scholar_citations;
      current.scholar_checked_on = stats.scholar_checked_on;
      updateBadge(scholarBadge, 'citations', current.scholar_citations);
      const updated = typeof current.scholar_checked_on === 'string' ? current.scholar_checked_on.slice(0, 10) : '';
      scholarBadge.title = 'Google Scholar: ' + current.scholar_citations.toLocaleString('en-US') + ' citations' + (updated ? ' · Updated ' + updated : '');
      scholarBadge.setAttribute('aria-label', scholarBadge.title);
    }
    try { localStorage.setItem(storageKey, JSON.stringify(current)); } catch { /* Storage may be disabled. */ }
  };

  const refreshGithub = async () => {
    const fetchOwned = async () => {
      const repositories = [];
      for (let page = 1; page <= 100; page += 1) {
        const batch = await fetchJSON('https://api.github.com/users/' + encodeURIComponent(projects.user) + '/repos?type=owner&per_page=100&page=' + page);
        if (!Array.isArray(batch)) throw new Error('Invalid GitHub response');
        repositories.push(...batch);
        if (batch.length < 100) return repositories;
      }
      throw new Error('Incomplete repository list');
    };
    const [owned, ...additional] = await Promise.all([
      fetchOwned(),
      ...extraRepositories.map((name) => fetchJSON('https://api.github.com/repos/' + name))
    ]);
    const unique = new Map();
    for (const repository of [...owned, ...additional]) {
      if (!validRepositoryName(repository.full_name) || !validCount(repository.stargazers_count) || repository.private) throw new Error('Invalid repository statistics');
      const name = repository.full_name;
      unique.set(name.toLowerCase(), {
        name, stars: repository.stargazers_count, url: 'https://github.com/' + name,
        kind: name.toLowerCase().startsWith(projects.user.toLowerCase() + '/') ? 'owned' : 'research'
      });
    }
    const repositories = [...unique.values()].sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name));
    const stats = {
      github_user: projects.user, github_scope: 'owned-and-research',
      github_stars: repositories.reduce((total, repository) => total + repository.stars, 0),
      github_checked_on: new Date().toISOString().slice(0, 10), github_repositories: repositories
    };
    if (!validGithubStats(stats)) throw new Error('Incomplete GitHub statistics');
    return stats;
  };

  const refresh = async () => {
    if (refreshing) return;
    refreshing = true;
    lastRefresh = Date.now();
    try {
      const [github, feed] = await Promise.allSettled([
        githubBadge ? refreshGithub() : Promise.resolve(null),
        fetchJSON(scholarBadge.dataset.statsUrl)
      ]);
      if (feed.status === 'fulfilled') applyStats(feed.value, github.status !== 'fulfilled');
      if (github.status === 'fulfilled') applyStats(github.value);
    } finally {
      refreshing = false;
    }
  };

  // Keep the last complete value through rate limits, outages, and partial responses.
  let cached;
  try { cached = JSON.parse(localStorage.getItem(storageKey)); } catch { /* Use the built snapshot. */ }
  applyStats(snapshot);
  applyStats(cached);
  githubBadge?.addEventListener('click', () => { document.getElementById('cv-github-stars').open = true; });
  setInterval(() => { if (!document.hidden) refresh(); }, 15 * 60 * 1000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Date.now() - lastRefresh > 5 * 60 * 1000) refresh();
  });
  await refresh();
})();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-navigation');
if (menuButton && navigation) {
  menuButton.hidden = false;
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(expanded));
    navigation.classList.toggle('is-open', expanded);
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
}

const publicationControls = document.querySelector('.publication-controls');
const publicationPanels = document.querySelectorAll('[data-publication-panel]');
if (publicationControls && publicationPanels.length) {
  publicationControls.hidden = false;
  const showPublications = (view) => {
    publicationPanels.forEach((panel) => { panel.hidden = panel.dataset.publicationPanel !== view; });
    publicationControls.querySelectorAll('button').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.view === view));
    });
  };
  publicationControls.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-view]');
    if (button) showPublications(button.dataset.view);
  });
  showPublications('selected');
}

document.querySelectorAll('[data-print-cv]').forEach((button) => {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
});

if ('IntersectionObserver' in window && document.querySelector('.home-section')) {
  const sectionLinks = [...document.querySelectorAll('.primary-navigation a')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        const active = new URL(link.href).hash === '#' + entry.target.id;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
  document.querySelectorAll('.home-section').forEach((section) => observer.observe(section));
}
