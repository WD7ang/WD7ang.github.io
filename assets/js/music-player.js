document.querySelectorAll('[data-music-player]').forEach((player) => {
  const frame = player.querySelector('[data-music-frame]');
  const cover = player.querySelector('[data-music-cover]');
  const coverLink = player.querySelector('[data-music-link]');
  const toggle = player.querySelector('[data-music-toggle]');
  const playlist = player.querySelector('.music-playlist');
  const status = player.querySelector('[data-music-status]');
  const tracks = [...player.querySelectorAll('[data-music-track]')];
  if (!tracks.length) return;
  let current = 0;

  const setPlaylistOpen = (open, restoreFocus = false) => {
    playlist.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (restoreFocus) toggle.focus({ preventScroll: true });
  };

  const selectTrack = (index) => {
    current = (index + tracks.length) % tracks.length;
    const track = tracks[current].dataset;
    tracks.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    cover.src = track.cover;
    cover.alt = `${track.title} — ${track.album}`;
    coverLink.href = track.url;
    coverLink.title = `${track.title} — ${track.artist} · 在网易云打开 / Open in NetEase Music`;
    frame.title = `网易云音乐播放器 — ${track.title}`;
    // A new official iframe stops the previous song. Playback stays under NetEase's permissions.
    // Only a user-triggered track change requests playback; the initial page never autoplays.
    frame.src = `https://music.163.com/outchain/player?type=2&id=${encodeURIComponent(track.id)}&auto=1&height=32`;
    status.textContent = `已选择 / Selected: ${track.title} — ${track.artist}`;
  };

  player.querySelector('[data-music-prev]').addEventListener('click', () => selectTrack(current - 1));
  player.querySelector('[data-music-next]').addEventListener('click', () => selectTrack(current + 1));
  toggle.addEventListener('click', () => {
    const open = playlist.hidden;
    setPlaylistOpen(open);
    if (open) tracks[current].focus({ preventScroll: true });
  });
  tracks.forEach((button, index) => button.addEventListener('click', () => {
    selectTrack(index);
    setPlaylistOpen(false, true);
  }));
  playlist.addEventListener('keydown', (event) => {
    const index = tracks.indexOf(document.activeElement);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % tracks.length;
    if (event.key === 'ArrowUp') next = (index - 1 + tracks.length) % tracks.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tracks.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      tracks[next].focus();
    }
  });
  player.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !playlist.hidden) {
      event.preventDefault();
      setPlaylistOpen(false, true);
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (!player.contains(event.target)) setPlaylistOpen(false);
  });
  document.addEventListener('focusin', (event) => {
    if (!player.contains(event.target)) setPlaylistOpen(false);
  });
  player.querySelector('[data-music-controls]').hidden = false;
});
