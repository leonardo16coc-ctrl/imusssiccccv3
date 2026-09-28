import * as Cloud from './cloud.js';
let cloudCatalog = null;
try { if(Cloud.configured) cloudCatalog = await Cloud.catalog(); } catch(e) { console.warn('Cloud catalog unavailable',e); }
import { appleMusicArtistUrl } from './apple-music.js';
// IMÜSIC Global State Management - Public Videos & Registered Artists

const DEFAULT_ARTISTS = [
  {
    id: 'nyelo',
    artistName: 'NYELO',
    username: 'nyelo',
    tagline: 'just a kid with big dreams.',
    location: 'Los Angeles, CA',
    genre: 'Pop / R&B / Alternative',
    joined: 'Mar 22, 2009',
    bio: 'Music is how I tell the truth. Thanks for being here. You guys make this real.',
    website: 'https://www.nyelo-music.com',
    theme: '#8b13f4',
    button: '#8b13f4',
    secondaryButton: '#f7f4fb',
    buttonText: '#ffffff',
    avatar: 'assets/avatar.jpg',
    banner: 'assets/banner.jpg',
    background: 'assets/artist-world-bg.jpg',
    subscribers: '892,341',
    totalViews: '124,509,317',
    channelViews: '4,231,908',
    verified: true,
    stickers: [],
    modules: { uploads: true, playlists: true, activity: true, fans: true, comments: true, likes: true }
  },
  {
    id: 'lunasound',
    artistName: 'LUNASOUND',
    username: 'lunasound',
    tagline: 'soundscapes for late nights and rainy drives',
    location: 'Seattle, WA',
    genre: 'Indie / Pop / Lo-Fi',
    joined: 'Jun 14, 2010',
    bio: 'Bedroom producer turned touring artist. All songs written, recorded, and mixed in my attic studio.',
    website: 'https://lunasound.bandcamp.com',
    theme: '#2065d6',
    button: '#2065d6',
    secondaryButton: '#f0f5ff',
    buttonText: '#ffffff',
    avatar: 'assets/fan-1.jpg',
    banner: 'assets/banner.jpg',
    background: 'assets/community.jpg',
    subscribers: '540,192',
    totalViews: '48,204,119',
    channelViews: '1,980,450',
    verified: true,
    stickers: [],
    modules: { uploads: true, playlists: true, activity: true, fans: true, comments: true, likes: true }
  },
  {
    id: 'the-orbit',
    artistName: 'THE ORBIT',
    username: 'theorbit',
    tagline: 'loud guitars, genuine feelings',
    location: 'Brooklyn, NY',
    genre: 'Alternative / Rock',
    joined: 'Aug 09, 2011',
    bio: 'Four friends making honest post-punk and alternative rock since 2009. New EP dropping soon.',
    website: 'https://theorbitband.com',
    theme: '#d92c2c',
    button: '#d92c2c',
    secondaryButton: '#fff2f2',
    buttonText: '#ffffff',
    avatar: 'assets/fan-2.jpg',
    banner: 'assets/banner.jpg',
    background: 'assets/artist-world-bg.jpg',
    subscribers: '318,405',
    totalViews: '29,840,112',
    channelViews: '980,120',
    verified: true,
    stickers: [],
    modules: { uploads: true, playlists: true, activity: true, fans: true, comments: true, likes: true }
  },
  {
    id: 'novalune',
    artistName: 'NOVALUNE',
    username: 'novalune',
    tagline: 'lucid dreams and shimmering synths',
    location: 'London, UK',
    genre: 'Dream Pop / Electronic',
    joined: 'Jan 17, 2012',
    bio: 'Dream pop project from London. Creating nostalgic soundscapes inspired by the late 2000s web aesthetic.',
    website: 'https://novalune.fm',
    theme: '#b91cc9',
    button: '#b91cc9',
    secondaryButton: '#fdf2ff',
    buttonText: '#ffffff',
    avatar: 'assets/fan-3.jpg',
    banner: 'assets/banner.jpg',
    background: 'assets/community.jpg',
    subscribers: '185,290',
    totalViews: '14,750,000',
    channelViews: '640,000',
    verified: true,
    stickers: [],
    modules: { uploads: true, playlists: true, activity: true, fans: true, comments: true, likes: true }
  }
];

const DEFAULT_VIDEOS = [
  {
    id: 'vid-1',
    title: 'Stars Tonight (Official Music Video)',
    artistId: 'nyelo',
    artistName: 'NYELO',
    genre: 'Pop / R&B',
    views: 2348921,
    likes: 24102,
    duration: '3:24',
    uploadedAt: '3 weeks ago',
    thumbnail: 'assets/upload-1.jpg',
    description: 'Stars Tonight is about finding yourself, even when the world feels too loud. Filmed on location in California.',
    tags: 'pop, r&b, alternative, stars',
    privacy: 'Public',
    videoUrl: ''
  },
  {
    id: 'vid-2',
    title: 'Running',
    artistId: 'nyelo',
    artistName: 'NYELO',
    genre: 'Pop / Alternative',
    views: 1125430,
    likes: 18450,
    duration: '4:10',
    uploadedAt: '2 months ago',
    thumbnail: 'assets/upload-2.jpg',
    description: 'Official music video for Running. Filmed on 35mm in downtown Los Angeles.',
    tags: 'acoustic, running, nyelo',
    privacy: 'Public',
    videoUrl: ''
  },
  {
    id: 'vid-3',
    title: 'Better',
    artistId: 'lunasound',
    artistName: 'LUNASOUND',
    genre: 'Indie / Pop',
    views: 892104,
    likes: 12890,
    duration: '3:05',
    uploadedAt: '3 months ago',
    thumbnail: 'assets/upload-3.jpg',
    description: 'Written on an old cassette deck during a stormy night. Music connects us.',
    tags: 'lofi, indie, bedroompop',
    privacy: 'Public',
    videoUrl: ''
  },
  {
    id: 'vid-4',
    title: 'Letter to Me',
    artistId: 'the-orbit',
    artistName: 'THE ORBIT',
    genre: 'Rock / Alternative',
    views: 654218,
    likes: 9540,
    duration: '3:45',
    uploadedAt: '4 months ago',
    thumbnail: 'assets/upload-4.jpg',
    description: 'A personal reminder to keep going when the tour gets exhausting.',
    tags: 'rock, alternative, live',
    privacy: 'Public',
    videoUrl: ''
  },
  {
    id: 'vid-5',
    title: 'City Lights',
    artistId: 'nyelo',
    artistName: 'NYELO',
    genre: 'Electronic / Pop',
    views: 1021995,
    likes: 14200,
    duration: '3:50',
    uploadedAt: '5 months ago',
    thumbnail: 'assets/upload-5.jpg',
    description: 'Late night cruising down the highway with the skyline glowing.',
    tags: 'synthwave, pop, night',
    privacy: 'Public',
    videoUrl: ''
  },
  {
    id: 'vid-6',
    title: 'Fade Away',
    artistId: 'novalune',
    artistName: 'NOVALUNE',
    genre: 'Dream Pop',
    views: 1423118,
    likes: 21980,
    duration: '4:18',
    uploadedAt: '6 months ago',
    thumbnail: 'assets/upload-6.jpg',
    description: 'Shimmering dream pop visuals inspired by nostalgic late 2000s music television.',
    tags: 'dreampop, synth, ethereal',
    privacy: 'Public',
    videoUrl: ''
  }
];

const DEFAULT_REELS = [
  {
    id: 'reel-1',
    type: 'reel',
    title: 'Behind the scenes of Stars Tonight in California',
    artistId: 'nyelo',
    artistName: 'NYELO',
    artistAvatar: 'assets/avatar.jpg',
    artistVerified: true,
    caption: 'A late-night shoot under neon lights. Thank you to the whole crew! #BehindTheScenes',
    sound: 'NYELO — Stars Tonight (Original Sound ♫)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'assets/upload-1.jpg',
    views: 384500,
    likes: 42100,
    commentsCount: 842,
    shares: 2450,
    duration: '0:34',
    uploadedAt: '2 days ago',
    tags: ['Shorts', 'Reels', 'BehindTheScenes', 'NYELO', 'Pop'],
    comments: [
      { id: 'c1', user: 'stargirl08', avatar: 'assets/fan-2.jpg', text: 'That final shot is incredible!', time: '1h ago', likes: 142 },
      { id: 'c2', user: 'musiclife', avatar: 'assets/fan-3.jpg', text: 'My favorite guitar solo.', time: '3h ago', likes: 89 },
      { id: 'c3', user: 'neonheart', avatar: 'assets/fan-6.jpg', text: 'Love discovering artists here!', time: '5h ago', likes: 45 }
    ]
  },
  {
    id: 'reel-2',
    type: 'reel',
    title: 'Recording acoustic guitars in the rain',
    artistId: 'lunasound',
    artistName: 'LUNASOUND',
    artistAvatar: 'assets/fan-1.jpg',
    artistVerified: true,
    caption: 'Recording the rain outside the studio at 3 AM. #Acoustic #Lofi',
    sound: 'LUNASOUND — Better (Acoustic Rain Edit ♫)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'assets/upload-3.jpg',
    views: 521900,
    likes: 68300,
    commentsCount: 1120,
    shares: 4120,
    duration: '0:42',
    uploadedAt: '3 days ago',
    tags: ['Acoustic', 'Lofi', 'Shorts', 'Reels', 'Chill'],
    comments: [
      { id: 'c4', user: 'ellie.wav', avatar: 'assets/fan-7.jpg', text: 'I could listen to this all night.', time: '2h ago', likes: 210 },
      { id: 'c5', user: 'daydreamz', avatar: 'assets/fan-5.jpg', text: 'The rain sounds amazing.', time: '4h ago', likes: 98 }
    ]
  },
  {
    id: 'reel-3',
    type: 'reel',
    title: 'Live guitar solo in Brooklyn',
    artistId: 'the-orbit',
    artistName: 'THE ORBIT',
    artistAvatar: 'assets/fan-2.jpg',
    artistVerified: true,
    caption: 'Brooklyn brought the energy. Where should we play next? #LiveMusic',
    sound: 'THE ORBIT — Letter to Me (Live Arena Raw ♫)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'assets/upload-4.jpg',
    views: 412700,
    likes: 54900,
    commentsCount: 934,
    shares: 3290,
    duration: '0:28',
    uploadedAt: '4 days ago',
    tags: ['Rock', 'Live', 'GuitarSolo', 'Shorts', 'Tour'],
    comments: [
      { id: 'c6', user: 'sk8erboii', avatar: 'assets/fan-8.jpg', text: 'Please come play in Mexico!', time: '30m ago', likes: 167 },
      { id: 'c7', user: 'jooniera', avatar: 'assets/fan-4.jpg', text: 'Such great stage energy.', time: '2h ago', likes: 73 }
    ]
  },
  {
    id: 'reel-4',
    type: 'reel',
    title: 'Vintage synths: building the drop',
    artistId: 'novalune',
    artistName: 'NOVALUNE',
    artistAvatar: 'assets/fan-3.jpg',
    artistVerified: true,
    caption: 'A vintage synth inspired this track. #SoundDesign',
    sound: 'NOVALUNE — Fade Away (Synth Wave Drop ♫)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'assets/upload-6.jpg',
    views: 689000,
    likes: 91400,
    commentsCount: 1640,
    shares: 7200,
    duration: '0:38',
    uploadedAt: '5 days ago',
    tags: ['DreamPop', 'Synths', 'Shorts', 'Reels', 'Producer'],
    comments: [
      { id: 'c8', user: 'neonheart', avatar: 'assets/fan-6.jpg', text: 'That synth sounds nostalgic.', time: '1h ago', likes: 312 },
      { id: 'c9', user: 'luv4music', avatar: 'assets/fan-1.jpg', text: 'Beautiful production.', time: '3h ago', likes: 154 }
    ]
  },
  {
    id: 'reel-5',
    type: 'reel',
    title: 'Vocal rehearsal, no effects',
    artistId: 'nyelo',
    artistName: 'NYELO',
    artistAvatar: 'assets/avatar.jpg',
    artistVerified: true,
    caption: 'Warming up before the show. #Vocals #SingerLife',
    sound: 'NYELO — Running (Raw Studio Vocals ♫)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'assets/upload-2.jpg',
    views: 478200,
    likes: 62400,
    commentsCount: 1050,
    shares: 3890,
    duration: '0:31',
    uploadedAt: '6 days ago',
    tags: ['Vocals', 'Acapella', 'Shorts', 'Singer', 'VerifiedArtist'],
    comments: [
      { id: 'c10', user: 'stargirl08', avatar: 'assets/fan-2.jpg', text: 'Your voice is incredible.', time: '45m ago', likes: 230 }
    ]
  },
  {
    id: 'reel-6',
    type: 'reel',
    title: 'Turning a coffee cup into a beat',
    artistId: 'lunasound',
    artistName: 'LUNASOUND',
    artistAvatar: 'assets/fan-1.jpg',
    artistVerified: true,
    caption: 'Everyday sounds can become music. #Beatmaker #ProducerLife',
    sound: 'LUNASOUND — Coffee Groove (Lo-Fi Beat ♫)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'assets/upload-5.jpg',
    views: 345000,
    likes: 47800,
    commentsCount: 780,
    shares: 2190,
    duration: '0:25',
    uploadedAt: 'Hace 1 semana',
    tags: ['Beatmaker', 'Producer', 'Shorts', 'Reels', 'SampleFlip'],
    comments: [
      { id: 'c11', user: 'daydreamz', avatar: 'assets/fan-5.jpg', text: 'Such a creative groove!', time: '6h ago', likes: 112 }
    ]
  }
];

// Helper to sanitize slugs
function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-') || 'artist-' + Date.now();
}

// ----------------- ARTISTS MANAGEMENT -----------------
function getRegisteredArtists() {
  if(Cloud.configured) return cloudCatalog?.artists || [];
  try {
    const custom = JSON.parse(localStorage.getItem('imusic_registered_artists') || '[]');
    // Merge: custom artists override or prepend default artists
    const merged = [...custom];
    DEFAULT_ARTISTS.forEach(def => {
      if (!merged.some(a => a.id === def.id)) {
        merged.push(def);
      }
    });
    return merged;
  } catch (e) {
    return DEFAULT_ARTISTS;
  }
}

function saveRegisteredArtists(artists) {
  localStorage.setItem('imusic_registered_artists', JSON.stringify(artists));
}

function getArtistById(idOrSlug) {
  const artists = getRegisteredArtists();
  if (!idOrSlug) return artists[0];
  const target = idOrSlug.toString().toLowerCase().trim();
  const found = artists.find(a => (a.id && a.id.toLowerCase() === target) || (a.username && a.username.toLowerCase() === target) || (a.artistName && a.artistName.toLowerCase() === target));
  return found || artists[0];
}

function registerNewArtist(data) {
  const artists = getRegisteredArtists();
  const baseId = slugify(data.artistName || data.username || 'artist');
  let id = baseId;
  let counter = 1;
  while (artists.some(a => a.id === id)) {
    id = `${baseId}-${counter++}`;
  }

  const newArtist = {
    id,
    artistName: data.artistName || 'New Artist',
    username: data.username || id,
    tagline: data.tagline || 'Welcome to my IMÜSIC channel ★',
    location: data.location || 'Global',
    genre: data.genre || 'Music / Artista',
    joined: data.joined || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    bio: data.bio || 'Welcome to my IMÜSIC channel. Listen to my songs and videos.',
    website: data.website || '',
    appleMusicUrl: appleMusicArtistUrl(data.appleMusicUrl) || '',
    theme: data.theme || '#8b13f4',
    button: data.button || '#8b13f4',
    secondaryButton: data.secondaryButton || '#f7f4fb',
    buttonText: data.buttonText || '#ffffff',
    avatar: data.avatar || 'assets/fan-' + Math.floor(Math.random() * 8 + 1) + '.jpg',
    banner: data.banner || 'assets/banner.jpg',
    background: data.background || 'assets/artist-world-bg.jpg',
    subscribers: '1',
    totalViews: '0',
    channelViews: '1',
    verified: false,
    stickers: [],
    modules: { uploads: true, playlists: true, activity: true, fans: true, comments: true, likes: true }
  };

  const existingIndex = artists.findIndex(a => a.id === id);
  if (existingIndex >= 0) {
    artists[existingIndex] = newArtist;
  } else {
    artists.unshift(newArtist); // New artists show first
  }

  saveRegisteredArtists(artists);
  localStorage.setItem('imusic_current_artist_id', id);
  return newArtist;
}

function updateArtistProfile(artistId, patch) {
  const artists = getRegisteredArtists();
  const index = artists.findIndex(a => a.id === artistId);
  if (index >= 0) {
    artists[index] = { ...artists[index], ...patch };
    saveRegisteredArtists(artists);
    return artists[index];
  }
  return null;
}

// ----------------- PUBLIC VIDEOS MANAGEMENT -----------------
function getPublicVideos() {
  if(Cloud.configured) return cloudCatalog?.videos || [];
  try {
    const stored = JSON.parse(localStorage.getItem('imusic_public_videos') || '[]');
    const merged = [...stored];
    DEFAULT_VIDEOS.forEach(def => {
      if (!merged.some(v => v.id === def.id)) {
        merged.push(def);
      }
    });
    return merged;
  } catch (e) {
    return DEFAULT_VIDEOS;
  }
}

function savePublicVideos(videos) {
  localStorage.setItem('imusic_public_videos', JSON.stringify(videos));
}

function getVideosByArtist(artistId) {
  const all = getPublicVideos();
  const target = (artistId || '').toString().toLowerCase();
  return all.filter(v => (v.artistId && v.artistId.toLowerCase() === target) || (v.artistName && v.artistName.toLowerCase() === target));
}

function getVideoById(id) {
  const all = getPublicVideos();
  return all.find(v => v.id === id) || all[0];
}

function addPublicVideo(videoData) {
  const videos = getPublicVideos();
  const newVideo = {
    id: 'vid-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    title: videoData.title || 'Untitled Music Video',
    artistId: videoData.artistId || 'nyelo',
    artistName: videoData.artistName || 'NYELO',
    genre: videoData.genre || 'Music',
    views: 1,
    likes: 1,
    duration: videoData.duration || '3:30',
    uploadedAt: 'Just now',
    thumbnail: videoData.thumbnail || 'assets/upload-' + Math.floor(Math.random() * 6 + 1) + '.jpg',
    description: videoData.description || 'Public music video uploaded to IMÜSIC community.',
    tags: videoData.tags || 'music, imusic',
    privacy: 'Public',
    videoUrl: videoData.videoUrl || '',
    blobId: videoData.blobId || null,
    createdAt: new Date().toISOString()
  };

  videos.unshift(newVideo);
  savePublicVideos(videos);

  // Update artist video count / activity
  return newVideo;
}

function incrementVideoViews(videoId) {
  const videos = getPublicVideos();
  const v = videos.find(x => x.id === videoId);
  if (v) {
    v.views = (v.views || 0) + 1;
    savePublicVideos(videos);
  }
}

// ----------------- PUBLIC REELS / SHORTS (TIKTOKS) MANAGEMENT -----------------
function getPublicReels() {
  if(Cloud.configured) return [];
  try {
    const stored = JSON.parse(localStorage.getItem('imusic_public_reels') || '[]');
    const merged = [...stored];
    DEFAULT_REELS.forEach(def => {
      if (!merged.some(r => r.id === def.id)) {
        merged.push(def);
      }
    });
    return merged;
  } catch (e) {
    return DEFAULT_REELS;
  }
}

function savePublicReels(reels) {
  localStorage.setItem('imusic_public_reels', JSON.stringify(reels));
}

function getReelsByArtist(artistId) {
  const all = getPublicReels();
  const target = (artistId || '').toString().toLowerCase();
  return all.filter(r => (r.artistId && r.artistId.toLowerCase() === target) || (r.artistName && r.artistName.toLowerCase() === target));
}

function getReelById(id) {
  const all = getPublicReels();
  return all.find(r => r.id === id) || all[0];
}

function addPublicReel(reelData) {
  const reels = getPublicReels();
  const artistObj = getArtistById(reelData.artistId);
  const isVerified = artistObj ? !!artistObj.verified : false;

  const newReel = {
    id: 'reel-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    type: 'reel',
    title: reelData.title || 'Nuevo Reel Musical',
    artistId: reelData.artistId || (artistObj ? artistObj.id : 'nyelo'),
    artistName: reelData.artistName || (artistObj ? artistObj.artistName : 'Artista IMÜSIC'),
    artistAvatar: (artistObj && artistObj.avatar) ? artistObj.avatar : 'assets/avatar.jpg',
    artistVerified: isVerified,
    caption: reelData.caption || reelData.description || 'New music reel on IMÜSIC. #Shorts #Reels #Music',
    sound: reelData.sound || `${reelData.artistName || 'Artista'} — Original Sound (IMÜSIC ♫)`,
    videoUrl: reelData.videoUrl || '',
    blobId: reelData.blobId || null,
    thumbnail: reelData.thumbnail || 'assets/upload-1.jpg',
    views: 1,
    likes: 1,
    commentsCount: 0,
    shares: 0,
    duration: reelData.duration || '0:30',
    uploadedAt: 'Just uploaded',
    tags: reelData.tags || ['Shorts', 'Reels', 'Music', 'ArtistaVerified'],
    comments: [],
    createdAt: new Date().toISOString()
  };

  reels.unshift(newReel);
  savePublicReels(reels);
  return newReel;
}

function incrementReelViews(reelId) {
  const reels = getPublicReels();
  const r = reels.find(x => x.id === reelId);
  if (r) {
    r.views = (r.views || 0) + 1;
    savePublicReels(reels);
  }
}

function incrementReelLikes(reelId) {
  const reels = getPublicReels();
  const r = reels.find(x => x.id === reelId);
  if (r) {
    r.likes = (r.likes || 0) + 1;
    savePublicReels(reels);
    return r.likes;
  }
  return 1;
}

function addReelComment(reelId, commentText, userName = 'Fan de IMÜSIC', userAvatar = 'assets/fan-8.jpg') {
  const reels = getPublicReels();
  const r = reels.find(x => x.id === reelId);
  if (r) {
    if (!r.comments) r.comments = [];
    const newComment = {
      id: 'rc-' + Date.now(),
      user: userName,
      avatar: userAvatar,
      text: commentText,
      time: 'Justo ahora',
      likes: 0
    };
    r.comments.unshift(newComment);
    r.commentsCount = (r.commentsCount || 0) + 1;
    savePublicReels(reels);
    return newComment;
  }
  return null;
}

// ----------------- PROFILE APPLICATION TO DOM -----------------
function getActiveArtist() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('id') || urlParams.get('artist');
  if (requestedId) {
    return getArtistById(requestedId);
  }
  const loggedArtistId = localStorage.getItem('imusic_current_artist_id');
  if (loggedArtistId) {
    const artist = getArtistById(loggedArtistId);
    if (artist) return artist;
  }
  return getRegisteredArtists()[0];
}

function applyProfileState() {
  const p = getActiveArtist();
  if (!p) return;

  document.documentElement.style.setProperty('--purple', p.theme || '#8b13f4');
  document.documentElement.style.setProperty('--button', p.button || p.theme || '#8b13f4');
  document.documentElement.style.setProperty('--buttonText', p.buttonText || '#fff');
  document.documentElement.style.setProperty('--secondaryButton', p.secondaryButton || '#f7f4fb');
  document.documentElement.style.setProperty('--world-bg', `url('${p.background || 'assets/artist-world-bg.jpg'}')`);
  document.documentElement.style.setProperty('--banner', `url('${p.banner || 'assets/banner.jpg'}')`);
  document.documentElement.style.setProperty('--avatar', `url('${p.avatar || 'assets/avatar.jpg'}')`);

  document.querySelectorAll('[data-apple-music]').forEach(el => { const url=appleMusicArtistUrl(p.appleMusicUrl); el.hidden=!url; if(url) el.href=url; else el.removeAttribute('href'); });
  document.querySelectorAll('.verified').forEach(el => el.hidden = !p.verified);
  document.querySelectorAll('[data-artist-name]').forEach(el => el.textContent = p.artistName);
  document.querySelectorAll('[data-tagline]').forEach(el => el.textContent = p.tagline);
  document.querySelectorAll('[data-location]').forEach(el => el.textContent = p.location);
  document.querySelectorAll('[data-genre]').forEach(el => el.textContent = p.genre);
  document.querySelectorAll('[data-joined]').forEach(el => el.textContent = p.joined);
  document.querySelectorAll('[data-bio]').forEach(el => el.textContent = p.bio);
  document.querySelectorAll('[data-subscribers]').forEach(el => el.textContent = p.subscribers || '1');
  document.querySelectorAll('[data-total-views]').forEach(el => el.textContent = p.totalViews || '1,200');
  document.querySelectorAll('[data-channel-views]').forEach(el => el.textContent = p.channelViews || '850');
  document.querySelectorAll('[data-avatar]').forEach(el => {
    if (el.tagName === 'IMG') el.src = p.avatar;
  });
  document.querySelectorAll('[data-banner]').forEach(el => el.style.backgroundImage = `url('${p.banner}')`);
  document.querySelectorAll('[data-world]').forEach(el => el.style.backgroundImage = `linear-gradient(#09060dc7,#09060db2),url('${p.background}')`);

  Object.entries(p.modules || {}).forEach(([k, v]) => {
    document.querySelectorAll(`[data-module="${k}"]`).forEach(el => el.style.display = v ? '' : 'none');
  });
}

// Backward compatibility with previous API
window.IMUSIC = {
  getProfile: getActiveArtist,
  saveProfile: (p) => {
    if (p && p.id) {
      updateArtistProfile(p.id, p);
    } else {
      const active = getActiveArtist();
      updateArtistProfile(active.id, p);
    }
  },
  applyProfileState,
  getRegisteredArtists,
  getArtistById,
  registerNewArtist,
  updateArtistProfile,
  getPublicVideos,
  getVideosByArtist,
  getVideoById,
  addPublicVideo,
  incrementVideoViews,
  getPublicReels,
  getReelsByArtist,
  getReelById,
  addPublicReel,
  incrementReelViews,
  incrementReelLikes,
  addReelComment
};

document.addEventListener('DOMContentLoaded', applyProfileState);
