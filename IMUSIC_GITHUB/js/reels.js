// IMÜSIC Reels & Shorts Controller (TikTok / Shorts Feed)
let allReelsList = [];
let currentReelsList = [];
let currentReelIndex = 0;
let currentReel = null;
let isMuted = false;
let currentTab = 'all';

function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

function initReelsPage() {
  if (!window.IMUSIC) {
    setTimeout(initReelsPage, 100);
    return;
  }

  allReelsList = window.IMUSIC.getPublicReels();
  filterReels();

  // Check URL query for specific reel id
  const params = new URLSearchParams(window.location.search);
  const targetId = params.get('id');
  if (targetId) {
    const idx = currentReelsList.findIndex(r => r.id === targetId);
    if (idx >= 0) {
      currentReelIndex = idx;
    }
  }

  loadReel(currentReelIndex, true);
  setupReelsInteractions();
}

function filterReels() {
  if (currentTab === 'verified') {
    currentReelsList = allReelsList.filter(r => r.artistVerified === true);

  } else {
    currentReelsList = allReelsList;
  }
}

function switchReelsTab(tab) {
  currentTab = tab;
  document.getElementById('tabVerified')?.classList.toggle('active', tab === 'verified');
  document.getElementById('tabAll')?.classList.toggle('active', tab === 'all');
  
  filterReels();
  currentReelIndex = 0;
  loadReel(0, true);
  toast(tab === 'verified' ? '★ Showing verified artist reels' : '🔥 Showing all shorts and reels');
}

async function loadReel(index, autoPlay = true) {
  if (currentReelsList.length === 0) return;
  if (index < 0) index = 0;
  if (index >= currentReelsList.length) index = currentReelsList.length - 1;

  currentReelIndex = index;
  currentReel = currentReelsList[index];

  // Update counter
  const counterEl = document.getElementById('reelsCounter');
  if (counterEl) {
    counterEl.textContent = `${index + 1} / ${currentReelsList.length}`;
  }

  // Update elements
  const video = document.getElementById('reelVideo');
  const avatar = document.getElementById('reelArtistAvatar');
  const discCover = document.getElementById('discCover');
  const artistName = document.getElementById('reelArtistName');
  const caption = document.getElementById('reelCaption');
  const soundTitle = document.getElementById('reelSoundTitle');
  const likesCount = document.getElementById('reelLikesCount');
  const commentsCount = document.getElementById('reelCommentsCount');
  const verifiedBadge = document.getElementById('reelVerifiedBadge');
  const ambient = document.getElementById('ambientBackdrop');
  const likeBtn = document.getElementById('reelLikeBtn');

  if (avatar) avatar.src = currentReel.artistAvatar || 'assets/avatar.jpg';
  if (discCover) discCover.src = currentReel.artistAvatar || 'assets/avatar.jpg';
  if (artistName) artistName.textContent = currentReel.artistName;
  if (caption) {
    // Format hashtags with bold styling
    const styledCaption = (currentReel.caption || '')
      .replace(/(#\w+)/g, '<b style="color:#d991ff">$1</b>');
    caption.innerHTML = styledCaption;
  }
  if (soundTitle) soundTitle.textContent = currentReel.sound || `${currentReel.artistName} — Original Sound (IMÜSIC ♫)`;
  
  const formattedLikes = currentReel.likes >= 1000 ? (currentReel.likes / 1000).toFixed(1) + 'K' : currentReel.likes;
  if (likesCount) likesCount.textContent = formattedLikes;
  if (commentsCount) commentsCount.textContent = currentReel.commentsCount || (currentReel.comments ? currentReel.comments.length : 0);

  if (verifiedBadge) {
    verifiedBadge.style.display = currentReel.artistVerified ? 'inline-flex' : 'none';
  }

  // Ambient backdrop styling
  if (ambient) {
    ambient.style.backgroundImage = `url('${currentReel.thumbnail || 'assets/upload-1.jpg'}')`;
  }

  // Check like state in localStorage
  const likedReels = JSON.parse(localStorage.getItem('imusic_liked_reels') || '[]');
  const isLiked = likedReels.includes(currentReel.id);
  if (likeBtn) {
    likeBtn.classList.toggle('active', isLiked);
  }

  // Resolve video media source (blob vs public URL)
  let videoSrc = currentReel.videoUrl || '';
  if (currentReel.blobId && window.IMUSIC_MEDIA) {
    try {
      const blob = await window.IMUSIC_MEDIA.retrieveVideoBlob(currentReel.blobId);
      if (blob) {
        videoSrc = URL.createObjectURL(blob);
      }
    } catch (e) {
      console.warn('Error retrieving reel blob:', e);
    }
  }

  if (!videoSrc) {
    videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  }

  if (video) {
    video.src = videoSrc;
    video.poster = currentReel.thumbnail || 'assets/upload-1.jpg';
    video.muted = isMuted;

    if (autoPlay) {
      video.play().then(() => {
        window.IMUSIC.incrementReelViews(currentReel.id);
        const playBadge = document.getElementById('playStateBadge');
        if (playBadge) playBadge.classList.add('hide');
      }).catch(err => {
        console.log('Autoplay prevented:', err);
      });
    }
  }
}

function nextReel() {
  if (currentReelIndex < currentReelsList.length - 1) {
    loadReel(currentReelIndex + 1, true);
  } else {
    // Loop back to first reel
    loadReel(0, true);
    toast('★ Volviendo al inicio de los Reels');
  }
}

function prevReel() {
  if (currentReelIndex > 0) {
    loadReel(currentReelIndex - 1, true);
  } else {
    toast('You are at the first reel');
  }
}

function toggleReelPlay() {
  const video = document.getElementById('reelVideo');
  const playBadge = document.getElementById('playStateBadge');
  if (!video) return;

  if (video.paused) {
    video.play();
    if (playBadge) playBadge.classList.add('hide');
  } else {
    video.pause();
    if (playBadge) {
      playBadge.classList.remove('hide');
      playBadge.textContent = '⏸';
      setTimeout(() => {
        if (video.paused && playBadge) playBadge.textContent = '▶';
      }, 500);
    }
  }
}

function toggleReelMute() {
  const video = document.getElementById('reelVideo');
  const btn = document.getElementById('reelMuteBtn');
  if (!video) return;

  isMuted = !isMuted;
  video.muted = isMuted;
  if (btn) btn.textContent = isMuted ? '🔇' : '🔊';
  toast(isMuted ? 'Audio silenciado' : 'Audio activado ♫');
}

function likeCurrentReel() {
  if (!currentReel) return;
  const likedReels = JSON.parse(localStorage.getItem('imusic_liked_reels') || '[]');
  const likeBtn = document.getElementById('reelLikeBtn');
  const likesCount = document.getElementById('reelLikesCount');

  const idx = likedReels.indexOf(currentReel.id);
  if (idx >= 0) {
    likedReels.splice(idx, 1);
    currentReel.likes = Math.max(0, (currentReel.likes || 1) - 1);
    if (likeBtn) likeBtn.classList.remove('active');
    toast('Like removed');
  } else {
    likedReels.push(currentReel.id);
    currentReel.likes = window.IMUSIC.incrementReelLikes(currentReel.id);
    if (likeBtn) {
      likeBtn.classList.add('active');
      likeBtn.style.transform = 'scale(1.3)';
      setTimeout(() => likeBtn.style.transform = '', 200);
    }
    toast('♥ Reel liked!');
  }

  localStorage.setItem('imusic_liked_reels', JSON.stringify(likedReels));
  const formattedLikes = currentReel.likes >= 1000 ? (currentReel.likes / 1000).toFixed(1) + 'K' : currentReel.likes;
  if (likesCount) likesCount.textContent = formattedLikes;
}

function shareCurrentReel() {
  if (!currentReel) return;
  const shareUrl = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(currentReel.id)}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast('★ Reel link copied!');
    });
  } else {
    prompt('Copia el enlace de este Reel:', shareUrl);
  }
}

function goToCurrentArtist() {
  if (!currentReel) return;
  window.location.href = `artist.html?id=${encodeURIComponent(currentReel.artistId)}`;
}

function toggleFollowReelArtist(btn) {
  if (!currentReel) return;
  const isFollowing = btn.textContent === '✓';
  btn.textContent = isFollowing ? '＋' : '✓';
  btn.style.background = isFollowing ? '#8b13f4' : '#28a745';
  toast(isFollowing ? `Unfollowed ${currentReel.artistName}` : `✓ Now following ${currentReel.artistName}!`);
}

// ----------------- COMMENTS DRAWER -----------------
function openCommentsDrawer() {
  if (!currentReel) return;
  const drawer = document.getElementById('commentsDrawer');
  const backdrop = document.getElementById('commentsBackdrop');
  const countEl = document.getElementById('drawerCommentsCount');
  const listEl = document.getElementById('commentsDrawerList');

  const comments = currentReel.comments || [];
  if (countEl) countEl.textContent = comments.length;

  if (listEl) {
    listEl.innerHTML = '';
    if (comments.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center;padding:30px 10px;color:#857c93">
          <div style="font-size:28px;margin-bottom:8px">💬</div>
          <b>Be the first to comment</b>
          <p style="font-size:12px;margin:4px 0 0">Share your thoughts with the artist and community.</p>
        </div>
      `;
    } else {
      comments.forEach(c => {
        const item = document.createElement('div');
        item.className = 'comment-drawer-item';
        item.innerHTML = `
          <img src="${c.avatar || 'assets/fan-1.jpg'}" alt="${c.user}">
          <div class="comment-content">
            <div class="comment-header">
              <b>${c.user}</b>
              <small>${c.time || 'Reciente'}</small>
            </div>
            <p>${c.text}</p>
          </div>
          <button class="comment-like-btn" onclick="this.classList.toggle('liked');this.textContent = this.classList.contains('liked') ? '♥ 1' : '♡ 0'">♡ 0</button>
        `;
        listEl.appendChild(item);
      });
    }
  }

  drawer?.classList.add('open');
  backdrop?.classList.add('open');
}

function closeCommentsDrawer() {
  document.getElementById('commentsDrawer')?.classList.remove('open');
  document.getElementById('commentsBackdrop')?.classList.remove('open');
}

function submitReelComment(e) {
  e.preventDefault();
  if (!currentReel) return;

  const input = document.getElementById('drawerCommentInput');
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const newComment = window.IMUSIC.addReelComment(
    currentReel.id,
    text,
    'You (Fan IMÜSIC)',
    'assets/fan-8.jpg'
  );

  if (input) input.value = '';

  // Update current reel object comments count
  const commentsCount = document.getElementById('reelCommentsCount');
  if (commentsCount) {
    commentsCount.textContent = (currentReel.comments ? currentReel.comments.length : 1);
  }

  openCommentsDrawer();
  toast('★ Comment added to the reel!');
}

// ----------------- USER INTERACTIONS & GESTURES -----------------
function setupReelsInteractions() {
  const container = document.getElementById('reelContainer');
  const video = document.getElementById('reelVideo');

  if (video) {
    video.onclick = (e) => {
      // Don't trigger if clicked on child control elements
      if (e.target === video) {
        toggleReelPlay();
      }
    };

    video.ontimeupdate = () => {
      const progressBar = document.getElementById('reelProgressBar');
      if (progressBar && video.duration) {
        const pct = (video.currentTime / video.duration) * 100;
        progressBar.style.width = pct + '%';
      }
    };
  }

  // Keyboard navigation
  window.addEventListener('keydown', e => {
    // If typing in a comment input, don't hijack keys
    if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault();
      nextReel();
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault();
      prevReel();
    } else if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      toggleReelPlay();
    } else if (e.key === 'm' || e.key === 'M') {
      toggleReelMute();
    } else if (e.key === 'l' || e.key === 'L') {
      likeCurrentReel();
    }
  });

  // Mouse wheel snap scrolling
  let wheelTimeout = null;
  window.addEventListener('wheel', e => {
    // Don't scroll reels if comments drawer is open
    const drawer = document.getElementById('commentsDrawer');
    if (drawer && drawer.classList.contains('open')) return;

    if (wheelTimeout) return;
    if (Math.abs(e.deltaY) > 40) {
      if (e.deltaY > 0) {
        nextReel();
      } else {
        prevReel();
      }
      wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
      }, 700);
    }
  }, { passive: true });

  // Touch swipe support (Mobile)
  let touchStartY = 0;
  window.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', e => {
    const drawer = document.getElementById('commentsDrawer');
    if (drawer && drawer.classList.contains('open')) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        nextReel();
      } else {
        prevReel();
      }
    }
  }, { passive: true });
}

// Export for global access in HTML handlers
window.switchReelsTab = switchReelsTab;
window.nextReel = nextReel;
window.prevReel = prevReel;
window.toggleReelPlay = toggleReelPlay;
window.toggleReelMute = toggleReelMute;
window.likeCurrentReel = likeCurrentReel;
window.shareCurrentReel = shareCurrentReel;
window.goToCurrentArtist = goToCurrentArtist;
window.toggleFollowReelArtist = toggleFollowReelArtist;
window.openCommentsDrawer = openCommentsDrawer;
window.closeCommentsDrawer = closeCommentsDrawer;
window.submitReelComment = submitReelComment;
window.toast = toast;

document.addEventListener('DOMContentLoaded', initReelsPage);
