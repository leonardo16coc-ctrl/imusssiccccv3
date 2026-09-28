// IMÜSIC Artist Page Controller - Public Video Player & Registered Artist Channels
let currentVideoObj = null;
let videoPlayerEl = null;

function formatViews(num) {
  if (!num) return '0 views';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M views';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K views';
  return num + ' views';
}

function initArtistPage() {
  const params = new URLSearchParams(window.location.search);
  const activeArtist = window.IMUSIC.getProfile();

  // Check if welcoming a new artist
  if (params.get('welcome') === '1') {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = `★ Welcome to your new artist channel, ${activeArtist.artistName}!`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }
  }

  // Check if just uploaded a video
  if (params.get('uploaded') === '1') {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = `★ Your music video is available in this browser demo!`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }
  }

  renderArtistsDirectory();
  renderArtistUploads(activeArtist.id);
  renderArtistReels(activeArtist.id);
  renderRelatedVideos(activeArtist.id);
  setupVideoPlayer(activeArtist);
}

// ----------------- ARTIST'S VERIFIED REELS & SHORTS -----------------
function renderArtistReels(artistId) {
  const container = document.getElementById('artistReelsList');
  const countSpan = document.getElementById('artistReelsCountSpan');
  const uploadLink = document.getElementById('uploadReelChannelLink');
  const profileLink = document.getElementById('artistReelsProfileLink');
  if (!container) return;

  if (uploadLink) {
    uploadLink.href = `upload.html?type=reel&artist=${encodeURIComponent(artistId)}`;
  }

  const reels = window.IMUSIC.getReelsByArtist(artistId);
  if (countSpan) {
    countSpan.textContent = `Reels & Shorts (${reels.length}) ★`;
  }

  if (profileLink && reels.length > 0) {
    profileLink.href = `reels.html?id=${encodeURIComponent(reels[0].id)}`;
  }

  container.innerHTML = '';

  if (reels.length === 0) {
    container.innerHTML = `
      <div style="padding:16px 10px;text-align:center;color:#6b5f7b">
        <div style="font-size:24px;margin-bottom:6px">📱</div>
        <p style="margin:0 0 8px;font-size:12px">This channel has no reels yet.</p>
        <a href="upload.html?type=reel&artist=${encodeURIComponent(artistId)}" class="small-btn" style="display:inline-block;padding:6px 12px;font-size:11px">＋ Upload Primer Reel</a>
      </div>
    `;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'artist-reels-mini-grid';
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(110px, 1fr))';
  grid.style.gap = '8px';
  grid.style.padding = '8px';

  reels.forEach(reel => {
    const item = document.createElement('a');
    item.href = `reels.html?id=${encodeURIComponent(reel.id)}`;
    item.className = 'artist-reel-card';
    item.style.textDecoration = 'none';
    item.style.color = 'inherit';
    item.style.display = 'block';

    const viewsFormatted = reel.views >= 1000 ? (reel.views / 1000).toFixed(0) + 'K' : reel.views;

    item.innerHTML = `
      <div class="reel-mini-thumb" style="position:relative;width:100%;aspect-ratio:9/16;background:#0d0914;border-radius:4px;overflow:hidden">
        <img src="${reel.thumbnail || 'assets/upload-1.jpg'}" alt="${reel.title}" style="width:100%;height:100%;object-fit:cover;display:block">
        <div style="position:absolute;inset:0;background:linear-gradient(transparent 50%, rgba(0,0,0,0.85))"></div>
        <span class="imusic-watermark" style="left:4px;top:4px;bottom:auto;font-size:7.5px;padding:1.5px 3.5px">imüsic<span class="star-mark">★</span></span>
        <span class="video-duration-tag" style="right:4px;bottom:4px;font-size:8px;padding:1px 3px">${reel.duration || '0:30'}</span>
        <div style="position:absolute;left:5px;bottom:6px;right:5px;color:#fff">
          <div style="font-size:10px;font-weight:bold;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${reel.title}</div>
          <div style="font-size:9px;color:#d5c9e6;margin-top:2px">▶ ${viewsFormatted} views</div>
        </div>
      </div>
    `;
    grid.appendChild(item);
  });

  container.appendChild(grid);
}

// ----------------- DIRECTORY OF REGISTERED ARTISTS -----------------
function renderArtistsDirectory(filterQuery = '') {
  const container = document.getElementById('artistChannelsGrid');
  const countEl = document.getElementById('registeredArtistsCount');
  if (!container) return;

  const allArtists = window.IMUSIC.getRegisteredArtists();
  const activeArtist = window.IMUSIC.getProfile();

  if (countEl) {
    countEl.textContent = allArtists.length;
  }

  const query = filterQuery.toLowerCase().trim();
  const filtered = query
    ? allArtists.filter(a =>
        a.artistName.toLowerCase().includes(query) ||
        (a.genre && a.genre.toLowerCase().includes(query)) ||
        (a.location && a.location.toLowerCase().includes(query))
      )
    : allArtists;

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;padding:12px;color:#776d85;text-align:center">No se encontraron artistas con "${filterQuery}".</div>`;
    return;
  }

  filtered.forEach(artist => {
    const isActive = activeArtist && activeArtist.id === artist.id;
    const card = document.createElement('a');
    card.href = `artist.html?id=${encodeURIComponent(artist.id)}`;
    card.className = `channel-card ${isActive ? 'active' : ''}`;
    card.id = `channel-card-${artist.id}`;

    card.innerHTML = `
      <img src="${artist.avatar || 'assets/avatar.jpg'}" class="channel-card-avatar" alt="${artist.artistName}">
      <div class="channel-card-info">
        <div class="channel-card-name">
          ${artist.artistName} <span style="color:var(--purple)">★</span>
          ${isActive ? '<span class="channel-badge">Viendo</span>' : ''}
        </div>
        <div class="channel-card-meta">${artist.genre || 'Music'} · ${artist.location || 'Global'}</div>
        <div style="font-size:10px;color:#897e97;margin-top:2px">${artist.subscribers || '1'} fans</div>
      </div>
      <span class="channel-card-btn">${isActive ? 'Canal Activo' : 'View Channel →'}</span>
    `;

    container.appendChild(card);
  });
}

function filterArtists(query) {
  renderArtistsDirectory(query);
}

// ----------------- ARTIST'S PUBLIC UPLOADS -----------------
function renderArtistUploads(artistId) {
  const listContainer = document.getElementById('artistUploadsList');
  const countSpan = document.getElementById('uploadsCountSpan');
  if (!listContainer) return;

  const uploads = window.IMUSIC.getVideosByArtist(artistId);
  if (countSpan) {
    countSpan.textContent = `Uploads (${uploads.length})`;
  }

  listContainer.innerHTML = '';

  if (uploads.length === 0) {
    listContainer.innerHTML = `
      <div style="padding:16px 10px;text-align:center;color:#6b5f7b">
        <p style="margin:0 0 8px">This channel has no music videos yet.</p>
        <a href="upload.html?artist=${encodeURIComponent(artistId)}" class="small-btn" style="display:inline-block;padding:6px 12px">＋ Upload Primer Video</a>
      </div>
    `;
    return;
  }

  uploads.forEach(video => {
    const item = document.createElement('div');
    const isPlaying = currentVideoObj && currentVideoObj.id === video.id;
    item.className = `list-item interactive-list-item ${isPlaying ? 'playing-now' : ''}`;
    item.id = `upload-item-${video.id}`;
    item.onclick = () => playSelectedVideo(video);

    item.innerHTML = `
      <div class="video-thumb-wrap">
        <img src="${video.thumbnail || 'assets/upload-1.jpg'}" alt="${video.title}">
        <span class="imusic-watermark">imüsic<span class="star-mark">★</span></span>
        <span class="video-duration-tag">${video.duration || '3:30'}</span>
      </div>
      <div>
        <b>${video.title}</b>
        <small>${formatViews(video.views)} · ${video.uploadedAt || 'Recently'}</small>
        <div style="font-size:9px;color:var(--purple);font-weight:bold;margin-top:2px">▶ Reproducir ahora</div>
      </div>
    `;
    listContainer.appendChild(item);
  });
}

// ----------------- RELATED COMMUNITY VIDEOS -----------------
function renderRelatedVideos(currentArtistId) {
  const container = document.getElementById('relatedVideosList');
  if (!container) return;

  const allVideos = window.IMUSIC.getPublicVideos();
  // Filter other artists' videos or show popular
  const related = allVideos.filter(v => !currentArtistId || v.artistId !== currentArtistId);
  const displayList = related.length > 0 ? related : allVideos;

  container.innerHTML = '';

  displayList.slice(0, 6).forEach(video => {
    const item = document.createElement('div');
    item.className = 'list-item interactive-list-item';
    item.id = `related-item-${video.id}`;
    item.onclick = () => playSelectedVideo(video);

    item.innerHTML = `
      <div class="video-thumb-wrap">
        <img src="${video.thumbnail || 'assets/upload-2.jpg'}" alt="${video.title}">
        <span class="imusic-watermark">imüsic<span class="star-mark">★</span></span>
        <span class="video-duration-tag">${video.duration || '3:30'}</span>
      </div>
      <div>
        <b>${video.artistName} - ${video.title}</b>
        <small>${formatViews(video.views)}</small>
        <a href="artist.html?id=${encodeURIComponent(video.artistId)}" onclick="event.stopPropagation()" style="font-size:9px;display:block;margin-top:2px">View channel: ${video.artistName} ›</a>
      </div>
    `;
    container.appendChild(item);
  });
}

// ----------------- VIDEO PLAYER SETUP & PLAYBACK -----------------
async function setupVideoPlayer(activeArtist) {
  videoPlayerEl = document.getElementById('mainVideoPlayer');
  if (!videoPlayerEl) return;

  const params = new URLSearchParams(window.location.search);
  const requestedVideoId = params.get('video');

  const artistVideos = window.IMUSIC.getVideosByArtist(activeArtist.id);
  const allVideos = window.IMUSIC.getPublicVideos();

  let targetVideo = null;
  if (requestedVideoId) {
    targetVideo = window.IMUSIC.getVideoById(requestedVideoId);
  } else if (artistVideos.length > 0) {
    targetVideo = artistVideos[0];
  } else {
    targetVideo = allVideos[0];
  }

  if (targetVideo) {
    await loadVideoIntoPlayer(targetVideo, false);
  }

  // Setup retro control listeners
  setupPlayerControls();
}

async function loadVideoIntoPlayer(videoObj, autoPlay = true) {
  currentVideoObj = videoObj;
  videoPlayerEl = document.getElementById('mainVideoPlayer');
  const overlayPlayBtn = document.getElementById('playerOverlayPlay');
  const playPauseBtn = document.getElementById('playerPlayPauseBtn');

  // Update UI copy
  const titleEl = document.getElementById('playerVideoTitle');
  const viewsEl = document.getElementById('playerVideoViews');
  const fromEl = document.getElementById('playerVideoFrom');
  const descEl = document.getElementById('playerVideoDescription');
  const likesBtn = document.getElementById('videoLikeBtn');

  if (titleEl) titleEl.innerHTML = `${videoObj.artistName} ★ — ${videoObj.title}`;
  if (viewsEl) viewsEl.textContent = formatViews(videoObj.views);
  if (fromEl) {
    fromEl.innerHTML = `De: <a href="artist.html?id=${encodeURIComponent(videoObj.artistId)}" style="color:var(--purple);font-weight:bold">${videoObj.artistName}</a> · ${videoObj.uploadedAt || 'Hoy'} · <span style="color:#008822;font-weight:bold">● Public</span>`;
  }
  if (descEl) descEl.textContent = videoObj.description || 'Music video on IMÜSIC.';
  if (likesBtn) likesBtn.textContent = `♡ Like (${videoObj.likes || 1})`;

  // Determine media source: IndexedDB blob vs URL vs sample video
  let mediaSrc = videoObj.videoUrl || '';

  if (videoObj.blobId && window.IMUSIC_MEDIA) {
    try {
      const blob = await window.IMUSIC_MEDIA.retrieveVideoBlob(videoObj.blobId);
      if (blob) {
        mediaSrc = URL.createObjectURL(blob);
      }
    } catch (err) {
      console.warn('Could not load blob from IndexedDB:', err);
    }
  }

  // Fallback if no specific video file or URL is bound
  if (!mediaSrc) {
    // Provide a valid, lightweight public MP4 stream
    mediaSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  }

  if (videoPlayerEl) {
    videoPlayerEl.src = mediaSrc;
    videoPlayerEl.poster = videoObj.thumbnail || 'assets/video-main.jpg';

    if (autoPlay) {
      videoPlayerEl.play().then(() => {
        if (overlayPlayBtn) overlayPlayBtn.classList.add('playing');
        if (playPauseBtn) playPauseBtn.textContent = '⏸';
        window.IMUSIC.incrementVideoViews(videoObj.id);
        if (viewsEl) viewsEl.textContent = formatViews((videoObj.views || 0) + 1);
      }).catch(() => {
        if (overlayPlayBtn) overlayPlayBtn.classList.remove('playing');
      });
    } else {
      if (overlayPlayBtn) overlayPlayBtn.classList.remove('playing');
      if (playPauseBtn) playPauseBtn.textContent = '▶';
    }
  }

  // Re-highlight uploads list
  const activeArtist = window.IMUSIC.getProfile();
  renderArtistUploads(activeArtist.id);
}

function playSelectedVideo(videoObj) {
  loadVideoIntoPlayer(videoObj, true);
  // Smoothly scroll to video player if on mobile
  const player = document.getElementById('playerSection');
  if (player && window.innerWidth < 820) {
    player.scrollIntoView({ behavior: 'smooth' });
  }
}

function setupPlayerControls() {
  const vid = document.getElementById('mainVideoPlayer');
  const overlayPlay = document.getElementById('playerOverlayPlay');
  const playPauseBtn = document.getElementById('playerPlayPauseBtn');
  const progressWrap = document.getElementById('playerProgressWrap');
  const progressFill = document.getElementById('playerProgressFill');
  const timeDisplay = document.getElementById('playerTimeDisplay');
  const muteBtn = document.getElementById('playerMuteBtn');
  const fsBtn = document.getElementById('playerFullscreenBtn');

  if (!vid) return;

  function togglePlay() {
    if (vid.paused || vid.ended) {
      vid.play();
    } else {
      vid.pause();
    }
  }

  if (overlayPlay) overlayPlay.onclick = togglePlay;
  if (playPauseBtn) playPauseBtn.onclick = togglePlay;

  vid.onplay = () => {
    if (overlayPlay) overlayPlay.classList.add('playing');
    if (playPauseBtn) playPauseBtn.textContent = '⏸';
  };

  vid.onpause = () => {
    if (overlayPlay) overlayPlay.classList.remove('playing');
    if (playPauseBtn) playPauseBtn.textContent = '▶';
  };

  vid.ontimeupdate = () => {
    if (!vid.duration) return;
    const pct = (vid.currentTime / vid.duration) * 100;
    if (progressFill) progressFill.style.width = pct + '%';

    if (timeDisplay) {
      const curM = Math.floor(vid.currentTime / 60);
      const curS = Math.floor(vid.currentTime % 60);
      const durM = Math.floor(vid.duration / 60);
      const durS = Math.floor(vid.duration % 60);
      timeDisplay.textContent = `${curM}:${curS < 10 ? '0' : ''}${curS} / ${durM}:${durS < 10 ? '0' : ''}${durS}`;
    }
  };

  if (progressWrap) {
    progressWrap.onclick = e => {
      const rect = progressWrap.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (vid.duration) {
        vid.currentTime = pos * vid.duration;
      }
    };
  }

  if (muteBtn) {
    muteBtn.onclick = () => {
      vid.muted = !vid.muted;
      muteBtn.textContent = vid.muted ? '🔇' : '🔊';
    };
  }

  if (fsBtn) {
    fsBtn.onclick = () => {
      if (vid.requestFullscreen) {
        vid.requestFullscreen();
      } else if (vid.webkitRequestFullscreen) {
        vid.webkitRequestFullscreen();
      }
    };
  }
}

// Export functions to global scope
window.IMUSIC_ARTIST = {
  filterArtists,
  playSelectedVideo
};
window.filterArtists = filterArtists;
window.playSelectedVideo = playSelectedVideo;

document.addEventListener('DOMContentLoaded', initArtistPage);
