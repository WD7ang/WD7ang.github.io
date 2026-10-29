document.querySelectorAll('[data-music-player]').forEach((player) => {
  const find = (name) => player.querySelector(`[data-music-${name}]`);
  const tracks = [...player.querySelectorAll('[data-music-track]')];
  if (!tracks.length) return;
  const audio = find('audio');
  const stage = find('stage');
  const ring = find('ring');
  const playButton = find('play');
  const seek = find('seek');
  const volume = find('volume');
  const mute = find('mute');
  const status = find('status');
  const step = 360 / tracks.length;
  const modulo = (n) => ((n % tracks.length) + tracks.length) % tracks.length;
  const clock = (seconds) => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '--:--';
  let position = 0;
  let revision = 0;
  let playing = false;
  let lastVolume = .8;
  let gesture = null;
  let suppressClickUntil = 0;

  const setPlaying = (value) => {
    playing = value;
    player.classList.toggle('is-playing', value);
    const label = value ? '暂停 / Pause' : '播放 / Play';
    playButton.setAttribute('aria-label', label);
    playButton.title = label;
  };
  const message = (text, error = false) => {
    status.textContent = text;
    player.classList.toggle('has-error', error);
  };
  const fail = () => {
    setPlaying(false);
    seek.disabled = true;
    message('音频加载失败，请重试或打开歌曲。 / Try again or open the track.', true);
  };
  const updateVolume = () => {
    const silent = audio.muted || audio.volume === 0;
    player.classList.toggle('is-muted', silent);
    volume.value = Math.round(audio.volume * 100);
    find('volume-value').value = silent ? '0%' : `${volume.value}%`;
    mute.setAttribute('aria-pressed', String(silent));
    mute.setAttribute('aria-label', silent ? '开启声音 / Unmute' : '静音 / Mute');
    mute.title = mute.getAttribute('aria-label');
  };
  const updateProgress = () => {
    find('elapsed').textContent = clock(audio.currentTime || 0);
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      find('duration').textContent = clock(audio.duration);
      seek.max = audio.duration;
      seek.value = audio.currentTime;
      seek.disabled = false;
      seek.setAttribute('aria-valuetext', `${clock(audio.currentTime)} / ${clock(audio.duration)}`);
    }
  };
  const rotate = (angle = -position * step) => ring.style.setProperty('--ring-angle', `${angle}deg`);
  const render = () => {
    const current = modulo(position);
    const track = tracks[current].dataset;
    rotate();
    tracks.forEach((button, index) => {
      const selected = index === current;
      button.style.setProperty('--card-angle', `${index * step}deg`);
      button.setAttribute('aria-pressed', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    find('title').textContent = track.title;
    find('artist').textContent = track.artist;
    find('link').href = track.source;
    find('count').textContent = `${String(current + 1).padStart(2, '0')} / ${String(tracks.length).padStart(2, '0')}`;
    find('duration').textContent = clock(Number(track.duration) || NaN);
    stage.setAttribute('aria-label', `${track.title} — ${track.artist}；左右滑动选歌 / Swipe or use arrow keys to choose a song`);
  };
  const start = async () => {
    const request = revision;
    if (audio.error) audio.load();
    message('正在加载 / Loading…');
    try {
      await audio.play();
    } catch (error) {
      if (request !== revision || error.name === 'AbortError') return;
      setPlaying(false);
      if (error.name === 'NotAllowedError') message('请点击播放按钮 / Press play to enable audio.');
      else fail();
    }
  };
  const select = (next, resume = playing) => {
    next = Math.round(next);
    if (next === position) { rotate(); return; }
    revision += 1;
    audio.pause();
    setPlaying(false);
    position = next;
    const track = tracks[modulo(position)].dataset;
    audio.src = track.source;
    seek.value = 0;
    seek.disabled = true;
    find('elapsed').textContent = '0:00';
    render();
    message('已选曲，点击播放 / Selected · Press play');
    if (resume) start();
  };
  const selectIndex = (index) => {
    let delta = index - modulo(position);
    if (delta > tracks.length / 2) delta -= tracks.length;
    if (delta < -tracks.length / 2) delta += tracks.length;
    select(position + delta);
  };

  find('prev').addEventListener('click', () => select(position - 1));
  find('next').addEventListener('click', () => select(position + 1));
  playButton.addEventListener('click', () => {
    if (playing) { audio.pause(); message('已暂停 / Paused'); }
    else start();
  });
  stage.addEventListener('click', (event) => {
    if (performance.now() < suppressClickUntil) return;
    const button = event.target.closest('[data-music-track]');
    if (button) selectIndex(tracks.indexOf(button));
  });
  stage.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowLeft') next = position - 1;
    if (event.key === 'ArrowRight') next = position + 1;
    if (event.key === 'Home') next = position - modulo(position);
    if (event.key === 'End') next = position - modulo(position) + tracks.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      select(next);
      stage.focus({ preventScroll: true });
    }
  });
  stage.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, dragging: false };
  });
  stage.addEventListener('pointermove', (event) => {
    if (!gesture || event.pointerId !== gesture.id) return;
    if (event.pointerType === 'mouse' && event.buttons !== 1) { gesture = null; return; }
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.dragging && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) { gesture = null; return; }
    if (!gesture.dragging && Math.abs(dx) < 7) return;
    if (!gesture.dragging) {
      gesture.dragging = true;
      stage.classList.add('is-dragging');
      stage.setPointerCapture(event.pointerId);
    }
    gesture.dx = dx;
    event.preventDefault();
    rotate(-position * step + Math.max(-step * 1.25, Math.min(step * 1.25, dx * step / 85)));
  });
  const finishGesture = (event) => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const drag = gesture;
    gesture = null;
    stage.classList.remove('is-dragging');
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    if (drag.dragging) {
      suppressClickUntil = performance.now() + 350;
      if (event.type === 'pointerup' && Math.abs(drag.dx) > 25) select(position + (drag.dx < 0 ? 1 : -1));
      else rotate();
    }
  };
  stage.addEventListener('pointerup', finishGesture);
  stage.addEventListener('pointercancel', finishGesture);
  stage.addEventListener('pointerleave', () => { if (gesture && !gesture.dragging) gesture = null; });
  seek.addEventListener('input', () => {
    if (Number.isFinite(audio.duration)) audio.currentTime = Number(seek.value);
    updateProgress();
  });
  volume.addEventListener('input', () => {
    audio.volume = Math.min(1, Math.max(0, Number(volume.value) / 100));
    audio.muted = audio.volume === 0;
    if (audio.volume > 0) lastVolume = audio.volume;
    updateVolume();
  });
  mute.addEventListener('click', () => {
    if (audio.muted || audio.volume === 0) { audio.volume = lastVolume; audio.muted = false; }
    else audio.muted = true;
  });
  audio.addEventListener('volumechange', updateVolume);
  audio.addEventListener('playing', () => { setPlaying(true); message('正在播放 / Playing'); });
  audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('waiting', () => { if (!audio.paused) message('正在缓冲 / Buffering…'); });
  audio.addEventListener('error', fail);
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateProgress);
  audio.addEventListener('ended', () => select(position + 1, true));
  const resize = () => {
    const size = Math.max(88, Math.min(124, Math.floor(stage.clientWidth * .46)));
    player.style.setProperty('--cover-size', `${size}px`);
    const radius = size / (2 * Math.tan(Math.PI / Math.max(3, tracks.length)));
    player.style.setProperty('--ring-radius', `${Math.round(radius)}px`);
  };
  audio.volume = .8;
  audio.muted = false;
  audio.controls = false;
  audio.hidden = true;
  stage.hidden = false;
  player.querySelectorAll('[data-music-enhanced]').forEach((element) => element.hidden = false);
  render();
  updateVolume();
  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
  else window.addEventListener('resize', resize);
});
