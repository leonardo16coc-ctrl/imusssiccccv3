// IMÜSIC Public Video & Verified Reels Upload Engine
let selectedVideoFile = null;
let generatedThumbnail = null;
let videoDurationFormatted = '3:30';
let uploadType = 'video'; // 'video' | 'reel'

function initUploadPage() {
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');
  if (typeParam === 'reel' || typeParam === 'short') {
    setUploadType('reel');
  } else {
    setUploadType('video');
  }

  populateArtistSelector();
  setupDropZone();
  checkPreselectedArtist();
}

function setUploadType(type) {
  uploadType = type;
  const btnVideo = document.getElementById('btnTypeVideo');
  const btnReel = document.getElementById('btnTypeReel');
  const verifiedBanner = document.getElementById('verifiedNoticeBanner');
  const reelAudioField = document.getElementById('reelAudioField');
  const mainHeading = document.getElementById('uploadMainHeading');
  const step1Title = document.getElementById('step1Title');
  const step1Note = document.getElementById('step1FormatNote');
  const dropTitle = document.getElementById('dropTitle');
  const dropSubtitle = document.getElementById('dropSubtitle');
  const dropIcon = document.getElementById('dropIcon');
  const titleLabel = document.getElementById('titleInputLabel');
  const descLabel = document.getElementById('descriptionInputLabel');
  const publishBtn = document.getElementById('publishBtn');
  const thumbWrap = document.getElementById('thumbPreviewWrapper');

  if (type === 'reel') {
    btnReel?.classList.add('active');
    btnVideo?.classList.remove('active');
    if (verifiedBanner) verifiedBanner.style.display = 'block';
    if (reelAudioField) reelAudioField.style.display = 'block';
    if (mainHeading) mainHeading.innerHTML = '★ Upload a Music Reel / Short';
    if (step1Title) step1Title.textContent = '1. Vertical Reel / Short File (9:16)';
    if (step1Note) step1Note.textContent = 'Optimized for Shorts and Reels (up to 60 seconds)';
    if (dropIcon) dropIcon.textContent = '📱';
    if (dropTitle) dropTitle.textContent = 'Drag and drop your vertical reel here';
    if (dropSubtitle) dropSubtitle.textContent = 'Portrait 9:16 (1080x1920 or 720x1280)';
    if (titleLabel) titleLabel.textContent = 'Reel title / hook *';
    if (descLabel) descLabel.textContent = 'Caption and hashtags (#)';
    if (publishBtn) publishBtn.innerHTML = '★ Post Reel on IMÜSIC';

    if (thumbWrap) {
      thumbWrap.style.width = '120px';
      thumbWrap.style.height = '213px'; // 9:16 vertical preview
    }

    renderSampleButtons('reel');
  } else {
    btnVideo?.classList.add('active');
    btnReel?.classList.remove('active');
    if (verifiedBanner) verifiedBanner.style.display = 'none';
    if (reelAudioField) reelAudioField.style.display = 'none';
    if (mainHeading) mainHeading.innerHTML = '★ Upload a New Music Video';
    if (step1Title) step1Title.textContent = '1. Music Video File';
    if (step1Note) step1Note.textContent = 'Supports MP4, WebM, MOV or video URL';
    if (dropIcon) dropIcon.textContent = '☁';
    if (dropTitle) dropTitle.textContent = 'Drag and drop your music video here';
    if (dropSubtitle) dropSubtitle.textContent = 'Recommended: MP4, WebM at 1080p / 720p / 360p';
    if (titleLabel) titleLabel.textContent = 'Music Video Title *';
    if (descLabel) descLabel.textContent = 'Description / Credits / Lyrics';
    if (publishBtn) publishBtn.innerHTML = '★ Post Music Video on IMÜSIC';

    if (thumbWrap) {
      thumbWrap.style.width = '180px';
      thumbWrap.style.height = '102px'; // 16:9 landscape preview
    }

    renderSampleButtons('video');
  }
}

function renderSampleButtons(type) {
  const container = document.getElementById('sampleButtonsWrap');
  if (!container) return;
  container.innerHTML = '';

  if (type === 'reel') {
    const samples = [
      {
        name: 'Sample Reel 1 (Behind the scenes)',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        title: 'Behind the scenes in California 🎬✨',
        sound: 'NYELO — Stars Tonight (Original Sound ♫)',
        tags: '#Shorts, #Reels, #BehindTheScenes, #NYELO, #Viral',
        duration: '0:34',
        color: '#8b13f4'
      },
      {
        name: 'Sample Reel 2 (Lo-Fi Acoustic)',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        title: '3 AM acoustic session in the rain 🌧️🎸',
        sound: 'LUNASOUND — Better (Acoustic Rain Edit ♫)',
        tags: '#Acoustic, #Lofi, #Shorts, #RainyDay, #StudioSession',
        duration: '0:42',
        color: '#2065d6'
      },
      {
        name: 'Sample Reel 3 (Live Solo)',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        title: 'Live guitar solo in Brooklyn! 🔥🤘',
        sound: 'THE ORBIT — Letter to Me (Live Arena Raw ♫)',
        tags: '#Rock, #Live, #GuitarSolo, #Shorts, #Tour',
        duration: '0:28',
        color: '#d92c2c'
      }
    ];

    samples.forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'small-btn';
      btn.style.background = s.color;
      btn.style.fontSize = '11px';
      btn.style.padding = '4px 8px';
      btn.textContent = s.name;
      btn.onclick = () => useSampleReel(s.url, s.title, s.sound, s.tags, s.duration);
      container.appendChild(btn);
    });
  } else {
    const samples = [
      {
        name: 'Sample 1 (Electronic)',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        title: 'Dreaming High (Music Visualizer)',
        duration: '3:45',
        color: '#5a1599'
      },
      {
        name: 'Sample 2 (Acoustic)',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        title: 'Acoustic Rain (Live Studio)',
        duration: '4:20',
        color: '#205bb7'
      }
    ];

    samples.forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'small-btn';
      btn.style.background = s.color;
      btn.style.fontSize = '11px';
      btn.style.padding = '4px 8px';
      btn.textContent = s.name;
      btn.onclick = () => useSampleVideo(s.url, s.title, s.duration);
      container.appendChild(btn);
    });
  }
}

function checkPreselectedArtist() {
  const params = new URLSearchParams(window.location.search);
  const artistParam = params.get('artist') || params.get('id');
  if (artistParam) {
    const sel = document.getElementById('uploadArtistSelect');
    if (sel) sel.value = artistParam;
  }
}

function populateArtistSelector() {
  const sel = document.getElementById('uploadArtistSelect');
  if (!sel) return;

  const artists = window.IMUSIC.getRegisteredArtists();
  const currentArtist = window.IMUSIC.getProfile();

  sel.innerHTML = '';
  artists.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.id;
    opt.textContent = `${a.artistName} (${a.verified ? "Verified demo · " : ""}${a.genre})`;
    if (currentArtist && currentArtist.id === a.id) {
      opt.selected = true;
    }
    sel.appendChild(opt);
  });

  // Option to create a new artist channel directly
  const newOpt = document.createElement('option');
  newOpt.value = '__new__';
  newOpt.textContent = '＋ Register a new artist channel...';
  sel.appendChild(newOpt);

  sel.addEventListener('change', () => {
    const newArtistBlock = document.getElementById('newArtistInputs');
    if (newArtistBlock) {
      newArtistBlock.style.display = sel.value === '__new__' ? 'block' : 'none';
    }
  });
}

function setupDropZone() {
  const dropZone = document.getElementById('videoDropZone');
  const fileInput = document.getElementById('videoFileInput');
  if (!dropZone || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');
    }, false);
  });

  dropZone.addEventListener('drop', e => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files.length > 0) {
      fileInput.files = files;
      handleVideoSelected(files[0]);
    }
  });

  fileInput.addEventListener('change', e => {
    if (e.target.files && e.target.files.length > 0) {
      handleVideoSelected(e.target.files[0]);
    }
  });
}

function stampImusicWatermark(canvas, isVertical = false) {
  try {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Responsive font size based on thumbnail resolution
    const fontSize = isVertical ? Math.max(16, Math.round(w * 0.065)) : Math.max(14, Math.round(w * 0.045));
    ctx.save();
    ctx.font = `900 ${fontSize}px "Arial Black", Arial, sans-serif`;
    
    const textMain = 'imüsic';
    const textStar = '★';
    const mainWidth = ctx.measureText(textMain).width;
    const starWidth = ctx.measureText(textStar).width;
    const totalTextWidth = mainWidth + starWidth + 3;
    
    const padX = Math.round(fontSize * 0.45);
    const padY = Math.round(fontSize * 0.3);
    const badgeW = totalTextWidth + padX * 2;
    const badgeH = fontSize + padY * 2;
    
    const posX = Math.round(w * 0.04);
    const posY = isVertical ? Math.round(h * 0.05) : (h - badgeH - Math.round(w * 0.03));
    const radius = 4;
    
    // Drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    
    // Badge background plate
    ctx.fillStyle = 'rgba(12, 10, 18, 0.9)';
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(posX, posY, badgeW, badgeH, radius);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    } else {
      ctx.fillRect(posX, posY, badgeW, badgeH);
    }
    
    // Reset shadow for crisp text rendering
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Text: "imüsic" in crisp white
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    const textY = posY + badgeH / 2;
    ctx.fillText(textMain, posX + padX, textY);
    
    // Star: "★" in vibrant IMÜSIC purple/magenta
    ctx.fillStyle = '#c644fc';
    ctx.fillText(textStar, posX + padX + mainWidth + 2, textY);
    
    ctx.restore();
  } catch (e) {
    console.warn('Error stamping watermark on canvas:', e);
  }
}

function handleVideoSelected(file) {
  if (!file) return;
  selectedVideoFile = file;

  const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
  const statusEl = document.getElementById('videoFileName');
  if (statusEl) {
    statusEl.innerHTML = `<b>${file.name}</b> (${sizeMb} MB) — <span style="color:#008822">✓ ${uploadType === 'reel' ? 'Reel ready to share' : 'Video ready to upload'}</span>`;
  }

  // Pre-fill title if empty
  const titleInput = document.getElementById('videoTitle');
  if (titleInput && !titleInput.value.trim()) {
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
    titleInput.value = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  }

  // Generate thumbnail and duration via temporary object URL
  try {
    const tempUrl = URL.createObjectURL(file);
    const tempVideo = document.createElement('video');
    tempVideo.src = tempUrl;
    tempVideo.preload = 'metadata';
    tempVideo.muted = true;
    tempVideo.playsInline = true;

    tempVideo.onloadedmetadata = () => {
      // Check if uploaded video is vertical
      if (tempVideo.videoHeight > tempVideo.videoWidth && uploadType !== 'reel') {
        // Automatically suggest or switch to Reel mode
        setUploadType('reel');
      }

      // Format duration
      const totalSec = Math.floor(tempVideo.duration) || (uploadType === 'reel' ? 30 : 210);
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      videoDurationFormatted = `${m}:${s < 10 ? '0' : ''}${s}`;

      tempVideo.currentTime = Math.min(1.5, tempVideo.duration / 2);
    };

    tempVideo.onseeked = () => {
      try {
        const isVert = uploadType === 'reel';
        const canvas = document.createElement('canvas');
        if (isVert) {
          canvas.width = 360;
          canvas.height = 640;
        } else {
          canvas.width = 640;
          canvas.height = 360;
        }
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
        stampImusicWatermark(canvas, isVert);
        generatedThumbnail = canvas.toDataURL('image/jpeg', 0.88);

        const thumbPreview = document.getElementById('thumbnailPreview');
        if (thumbPreview) {
          thumbPreview.src = generatedThumbnail;
          thumbPreview.style.display = 'block';
        }
      } catch (err) {
        console.warn('Could not generate canvas thumbnail:', err);
      }
      URL.revokeObjectURL(tempUrl);
    };
  } catch (err) {
    console.warn('Error processing video metadata:', err);
  }

  // Show live preview box
  const previewBox = document.getElementById('uploadedPreviewBox');
  if (previewBox) previewBox.style.display = 'block';
}

function handleCustomThumbnail(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const isVert = uploadType === 'reel';
      const canvas = document.createElement('canvas');
      if (isVert) {
        canvas.width = 360;
        canvas.height = 640;
      } else {
        canvas.width = 640;
        canvas.height = 360;
      }
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      stampImusicWatermark(canvas, isVert);
      generatedThumbnail = canvas.toDataURL('image/jpeg', 0.88);
      const thumbPreview = document.getElementById('thumbnailPreview');
      if (thumbPreview) {
        thumbPreview.src = generatedThumbnail;
        thumbPreview.style.display = 'block';
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function useSampleVideo(url, title, duration) {
  document.getElementById('videoUrlInput').value = url;
  if (title) document.getElementById('videoTitle').value = title;
  if (duration) videoDurationFormatted = duration;
  const statusEl = document.getElementById('videoFileName');
  if (statusEl) {
    statusEl.innerHTML = `<b>Sample video:</b> ${title || url} — <span style="color:#008822">✓ Ready</span>`;
  }
}

function useSampleReel(url, title, sound, tags, duration) {
  document.getElementById('videoUrlInput').value = url;
  if (title) document.getElementById('videoTitle').value = title;
  if (sound) document.getElementById('reelSoundInput').value = sound;
  if (tags) document.getElementById('videoTags').value = tags;
  if (duration) videoDurationFormatted = duration;
  const statusEl = document.getElementById('videoFileName');
  if (statusEl) {
    statusEl.innerHTML = `<b>Sample reel:</b> ${title} — <span style="color:#008822">✓ Ready to share</span>`;
  }
}

function appendTag(tag) {
  const tagsInput = document.getElementById('videoTags');
  if (!tagsInput) return;
  const current = tagsInput.value.trim();
  if (!current.includes(tag)) {
    tagsInput.value = current ? `${current}, ${tag}` : tag;
  }
}

async function publishContent() {
  const title = document.getElementById('videoTitle')?.value?.trim();
  if (!title) {
    alert(uploadType === 'reel' ? 'Please enter a title or hook for your reel.' : 'Please enter a music video title.');
    document.getElementById('videoTitle')?.focus();
    return;
  }

  const artistSelect = document.getElementById('uploadArtistSelect');
  let artistId = artistSelect ? artistSelect.value : 'nyelo';
  let artistName = 'NYELO';

  if (artistId === '__new__') {
    const newName = document.getElementById('newArtistNameInput')?.value?.trim();
    const newGenre = document.getElementById('newArtistGenreInput')?.value?.trim() || 'Pop / Rock';
    if (!newName) {
      alert('Please enter your new artist channel name.');
      document.getElementById('newArtistNameInput')?.focus();
      return;
    }
    const createdArtist = window.IMUSIC.registerNewArtist({
      artistName: newName,
      genre: newGenre,
      tagline: `Official channel of ${newName} on IMÜSIC ★`
    });
    artistId = createdArtist.id;
    artistName = createdArtist.artistName;
  } else {
    const artistObj = window.IMUSIC.getArtistById(artistId);
    artistName = artistObj ? artistObj.artistName : 'Artista IMÜSIC';
  }

  const description = document.getElementById('videoDescription')?.value?.trim() || `${uploadType === 'reel' ? 'New music reel' : 'New music video'} by ${artistName} on IMÜSIC.`;
  const genre = document.getElementById('videoGenre')?.value?.trim() || 'Music';
  const tags = document.getElementById('videoTags')?.value?.trim() || (uploadType === 'reel' ? '#Shorts, #Reels, #Musica' : 'music, imusic, video');
  const externalUrl = document.getElementById('videoUrlInput')?.value?.trim() || '';
  const reelSound = document.getElementById('reelSoundInput')?.value?.trim() || `${artistName} — Original Sound (IMÜSIC ♫)`;

  // Confirm ownership / permission check
  const consent = document.getElementById('confirmCopyright');
  if (consent && !consent.checked) {
    alert('Please confirm you own or have permission to share this content.');
    return;
  }

  // Upload UI state & simulated progress
  const uploadBtn = document.getElementById('publishBtn');
  const progressContainer = document.getElementById('uploadProgressContainer');
  const progressBar = document.getElementById('uploadProgressBar');
  const progressPercent = document.getElementById('uploadProgressPercent');

  if (uploadBtn) uploadBtn.disabled = true;
  if (progressContainer) progressContainer.style.display = 'block';

  let blobId = null;

  // If a local file was selected, save to IndexedDB
  if (selectedVideoFile && window.IMUSIC_MEDIA) {
    blobId = 'blob-' + Date.now();
    try {
      await window.IMUSIC_MEDIA.storeVideoBlob(blobId, selectedVideoFile);
    } catch (e) {
      console.warn('Could not store video in IndexedDB, proceeding with fallback:', e);
    }
  }

  // Animate progress smoothly
  let progress = 10;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 22 + 18);
    if (progress > 100) progress = 100;
    if (progressBar) progressBar.style.width = progress + '%';
    if (progressPercent) progressPercent.textContent = progress + '%';

    if (progress === 100) {
      clearInterval(interval);

      if (uploadType === 'reel') {
        // Save public Reel
        const newReel = window.IMUSIC.addPublicReel({
          title,
          artistId,
          artistName,
          caption: description,
          sound: reelSound,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          duration: videoDurationFormatted || '0:30',
          thumbnail: generatedThumbnail || ('assets/upload-' + Math.floor(Math.random() * 6 + 1) + '.jpg'),
          videoUrl: externalUrl,
          blobId: blobId
        });

        const toastEl = document.getElementById('toast');
        if (toastEl) {
          toastEl.textContent = '★ Reel saved to the IMÜSIC demo!';
          toastEl.classList.add('show');
        }

        setTimeout(() => {
          window.location.href = `reels.html?id=${encodeURIComponent(newReel.id)}&uploaded=1`;
        }, 1100);
      } else {
        // Save public standard video
        const newVideo = window.IMUSIC.addPublicVideo({
          title,
          artistId,
          artistName,
          genre,
          description,
          tags,
          duration: videoDurationFormatted || '3:30',
          thumbnail: generatedThumbnail || ('assets/upload-' + Math.floor(Math.random() * 6 + 1) + '.jpg'),
          videoUrl: externalUrl,
          blobId: blobId,
          privacy: 'Public'
        });

        const toastEl = document.getElementById('toast');
        if (toastEl) {
          toastEl.textContent = '★ Music video saved to the IMÜSIC demo!';
          toastEl.classList.add('show');
        }

        setTimeout(() => {
          window.location.href = `artist.html?id=${encodeURIComponent(artistId)}&video=${encodeURIComponent(newVideo.id)}&uploaded=1`;
        }, 1100);
      }
    }
  }, 160);
}

// Window bindings
window.setUploadType = setUploadType;
window.useSampleVideo = useSampleVideo;
window.useSampleReel = useSampleReel;
window.handleCustomThumbnail = handleCustomThumbnail;
window.publishContent = publishContent;
window.appendTag = appendTag;

document.addEventListener('DOMContentLoaded', initUploadPage);
