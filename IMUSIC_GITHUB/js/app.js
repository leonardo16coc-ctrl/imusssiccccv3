// IMÜSIC Global App Scripts
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function toggleFriend(btn) {
  const added = btn.dataset.added === '1';
  btn.dataset.added = added ? '0' : '1';
  btn.textContent = added ? '＋ Add as Friend' : '✓ Friends';
  btn.style.background = added ? '' : '#388e3c';
  toast(added ? 'Removed from friends' : 'Added to your IMÜSIC friends!');
}

function toggleLike(btn) {
  const active = btn.classList.toggle('active');
  btn.textContent = active ? '♥ Like (Guardado)' : '♡ Like';
  toast(active ? 'Video liked!' : 'Like removed');
}

function addComment() {
  const input = document.getElementById('commentInput');
  const list = document.getElementById('commentList');
  if (!input || !input.value.trim()) return;

  const row = document.createElement('div');
  row.className = 'comment-row';
  const cleanVal = input.value.replace(/[<>]/g, '');
  row.innerHTML = `
    <img src="assets/fan-8.jpg" alt="You">
    <div>
      <b style="color:var(--purple)">You (Public)</b>
      <p>${cleanVal}</p>
    </div>
    <div class="comment-count">♡ 0</div>
  `;
  list.prepend(row);
  input.value = '';
  toast('Comment added!');
}

function shareProfile() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(location.href);
    toast('Link copied!');
  } else {
    toast('Link: ' + location.href);
  }
}

// ----------------- HOME PAGE DYNAMIC RENDERING -----------------
function renderHomeContent() {
  const reelsGrid = document.getElementById('homeReelsGrid');
  const videosGrid = document.getElementById('homeTrendingVideosGrid');
  const artistsGrid = document.getElementById('homeFeaturedArtistsGrid');

  if (reelsGrid && window.IMUSIC) {
    const reels = window.IMUSIC.getPublicReels();
    reelsGrid.innerHTML = '';
    reels.forEach(r => {
      const card = document.createElement('a');
      card.href = `reels.html?id=${encodeURIComponent(r.id)}`;
      card.className = 'home-reel-card';
      card.style.textDecoration = 'none';
      card.style.color = 'inherit';

      const viewsFormatted = r.views >= 1000000 ? (r.views / 1000000).toFixed(1) + 'M' : (r.views >= 1000 ? (r.views / 1000).toFixed(0) + 'K' : r.views);
      const likesFormatted = r.likes >= 1000 ? (r.likes / 1000).toFixed(1) + 'K' : r.likes;

      card.innerHTML = `
        <div class="reel-thumb-wrap">
          <img src="${r.thumbnail || 'assets/upload-1.jpg'}" alt="${r.title}">
          <div class="reel-card-gradient"></div>
          <span class="imusic-watermark" style="left:6px;top:6px;bottom:auto;font-size:9px;padding:2px 5px">imüsic<span class="star-mark">★</span></span>
          ${r.artistVerified ? '<span class="reel-verified-tag">✓ Verified · demo</span>' : ''}
          <div class="reel-card-play-icon">▶</div>
          <span class="video-duration-tag" style="right:6px;bottom:6px">${r.duration || '0:30'}</span>
          
          <div class="reel-card-info">
            <div class="reel-card-artist">
              <img src="${r.artistAvatar || 'assets/avatar.jpg'}" alt="${r.artistName}">
              <span>${r.artistName} ★</span>
            </div>
            <b class="reel-card-title">${r.title}</b>
            <div class="reel-card-stats">
              <span>▶ ${viewsFormatted}</span>
              <span>♥ ${likesFormatted}</span>
            </div>
          </div>
        </div>
      `;
      reelsGrid.appendChild(card);
    });
  }

  if (videosGrid && window.IMUSIC) {
    const videos = window.IMUSIC.getPublicVideos();
    videosGrid.innerHTML = '';
    videos.forEach(v => {
      const card = document.createElement('a');
      card.href = `artist.html?id=${encodeURIComponent(v.artistId)}&video=${encodeURIComponent(v.id)}`;
      card.className = 'home-card';
      card.style.textDecoration = 'none';
      card.style.color = 'inherit';
      card.style.display = 'block';

      const viewsFormatted = v.views >= 1000000 ? (v.views / 1000000).toFixed(1) + 'M' : (v.views >= 1000 ? (v.views / 1000).toFixed(0) + 'K' : v.views);

      card.innerHTML = `
        <div class="video-thumb-wrap">
          <img src="${v.thumbnail || 'assets/upload-1.jpg'}" alt="${v.title}">
          <span class="imusic-watermark">imüsic<span class="star-mark">★</span></span>
          <span class="video-duration-tag">${v.duration || '3:30'}</span>
          <span style="position:absolute;left:6px;top:6px;background:var(--purple);color:#fff;font-size:9px;padding:2px 5px;border-radius:2px;font-weight:bold;z-index:5">PÚBLICO</span>
        </div>
        <div style="padding:10px">
          <b style="color:#2b1842;font-size:13px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${v.title}</b>
          <small style="color:#6e657c;display:block;margin-top:3px">${v.artistName} ★ · ${viewsFormatted} views</small>
          <div style="font-size:11px;color:var(--purple);font-weight:bold;margin-top:6px">▶ Watch video and channel ›</div>
        </div>
      `;
      videosGrid.appendChild(card);
    });
  }

  if (artistsGrid && window.IMUSIC) {
    const artists = window.IMUSIC.getRegisteredArtists();
    artistsGrid.innerHTML = '';
    artists.forEach(a => {
      const card = document.createElement('a');
      card.href = `artist.html?id=${encodeURIComponent(a.id)}`;
      card.className = 'home-card';
      card.style.textDecoration = 'none';
      card.style.color = 'inherit';
      card.style.display = 'block';

      card.innerHTML = `
        <div style="position:relative;height:145px;overflow:hidden;background:#201136">
          <img src="${a.avatar || 'assets/avatar.jpg'}" alt="${a.artistName}" style="width:100%;height:100%;object-fit:cover;display:block">
          <span style="position:absolute;right:6px;top:6px;background:var(--purple);color:#fff;font-size:9px;padding:2px 6px;border-radius:10px;font-weight:bold">${a.verified ? 'Verified · demo' : 'Artist channel'}</span>
        </div>
        <div style="padding:10px">
          <b style="color:var(--purple);font-size:14px;display:block">${a.artistName} ★</b>
          <small style="color:#5e546c;display:block;margin:2px 0">${a.genre || 'Music'} · ${a.location || 'Global'}</small>
          <div style="font-size:11px;color:#857a94">${a.subscribers || '1'} registered fans</div>
          <button class="primary-btn" style="padding:6px;font-size:11px;margin:8px 0 0">Visit Channel →</button>
        </div>
      `;
      artistsGrid.appendChild(card);
    });
  }
}

window.toast = toast;
window.toggleFriend = toggleFriend;
window.toggleLike = toggleLike;
window.addComment = addComment;
window.shareProfile = shareProfile;
window.renderHomeContent = renderHomeContent;

document.addEventListener('DOMContentLoaded', () => {
  renderHomeContent();
  document.querySelectorAll('[data-like]').forEach(b => {
    b.addEventListener('click', () => toggleLike(b));
  });
});
