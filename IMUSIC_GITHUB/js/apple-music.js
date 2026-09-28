export function appleMusicArtistUrl(value) {
 try { const u = new URL(value); return u.protocol === 'https:' && u.hostname === 'music.apple.com' && !u.username && !u.password && /^\/(?:[a-z]{2}\/)?artist\/(?:[^/]+\/)?\d+\/?$/.test(u.pathname) ? u.href : null; } catch { return null; }
}
