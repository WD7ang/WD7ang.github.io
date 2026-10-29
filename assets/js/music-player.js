document.querySelectorAll('[data-music-player]').forEach((player) => {
  const find = (name) => player.querySelector(`[data-music-${name}]`);
  const tracks = [...player.querySelectorAll('[data-music-track]')];
  if (!tracks.length) return;
  const audio = find('audio');
  const playlist = find('playlist');
  const playButton = find('play');
  const record = find('record');
  const seek = find('seek');
  const volume = find('volume');
  const mute = find('mute');
  const status = find('status');
  const modulo = (n) => ((n % tracks.length) + tracks.length) % tracks.length;
  const clock = (seconds) => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '--:--';
  let position = 0;
  let revision = 0;
  let lastVolume = .8;

  const setPlaying = (value) => {
    player.classList.toggle('is-playing', value);
    const label = value ? '暂停 / Pause' : '播放 / Play';
    [playButton, record].forEach((button) => {
      button.setAttribute('aria-label', label);
      button.title = label;
    });
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
  const revealTrack = (button) => {
    const top = button.offsetTop;
    const bottom = top + button.offsetHeight;
    if (top < playlist.scrollTop) playlist.scrollTop = top;
    else if (bottom > playlist.scrollTop + playlist.clientHeight) playlist.scrollTop = bottom - playlist.clientHeight;
  };
  const render = () => {
    const track = tracks[position].dataset;
    tracks.forEach((button, index) => button.setAttribute('aria-current', String(index === position)));
    find('title').textContent = track.title;
    find('artist').textContent = track.artist;
    find('cover').src = track.cover;
    find('cover').alt = track.title;
    find('link').href = track.source;
    find('count').textContent = `${String(position + 1).padStart(2, '0')} / ${String(tracks.length).padStart(2, '0')}`;
    find('duration').textContent = clock(Number(track.duration) || NaN);
    revealTrack(tracks[position]);
  };
  const start = async () => {
    const request = ++revision;
    if (audio.error) audio.load();
    message('正在加载 / Loading…');
    try {
      await audio.play();
    } catch (error) {
      if (request !== revision || error.name === 'AbortError') return;
      setPlaying(false);
      if (error.name === 'NotAllowedError') message('点击播放，开启音乐 / Press play to start');
      else fail();
    }
  };
  const select = (next) => {
    next = modulo(next);
    if (next === position) { if (audio.paused) start(); return; }
    revision += 1;
    audio.pause();
    setPlaying(false);
    position = next;
    audio.src = tracks[position].dataset.source;
    seek.value = 0;
    seek.disabled = true;
    find('elapsed').textContent = '0:00';
    render();
    start();
  };
  const togglePlayback = () => {
    if (!audio.paused) {
      revision += 1;
      audio.pause();
      setPlaying(false);
      message('已暂停 / Paused');
    } else start();
  };

  find('prev').addEventListener('click', () => select(position - 1));
  find('next').addEventListener('click', () => select(position + 1));
  playButton.addEventListener('click', togglePlayback);
  record.addEventListener('click', togglePlayback);
  playlist.addEventListener('click', (event) => {
    const button = event.target.closest('[data-music-track]');
    if (button) select(tracks.indexOf(button));
  });
  playlist.addEventListener('keydown', (event) => {
    const current = tracks.indexOf(event.target.closest('[data-music-track]'));
    if (current < 0) return;
    let next;
    if (event.key === 'ArrowUp') next = modulo(current - 1);
    if (event.key === 'ArrowDown') next = modulo(current + 1);
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tracks.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      tracks[next].focus({ preventScroll: true });
      revealTrack(tracks[next]);
    }
  });
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
  audio.addEventListener('playing', () => { if (!audio.paused) { setPlaying(true); message('正在播放 / Playing'); } });
  audio.addEventListener('pause', () => { if (audio.paused) setPlaying(false); });
  audio.addEventListener('waiting', () => { if (!audio.paused) message('正在缓冲 / Buffering…'); });
  audio.addEventListener('error', fail);
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateProgress);
  audio.addEventListener('ended', () => select(position + 1));
  audio.volume = .8;
  audio.muted = false;
  audio.controls = false;
  audio.hidden = true;
  player.querySelectorAll('[data-music-enhanced]').forEach((element) => element.hidden = false);
  render();
  updateVolume();
  // Start audible playback when allowed; otherwise retain the browser's click-to-play requirement.
  start();
});
