// IMÜSIC IndexedDB Helper for Public Video Media Storage
const DB_NAME = 'imusic_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

function openVideoDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

async function storeVideoBlob(id, blob, mimeType) {
  try {
    const db = await openVideoDB();
    if (!db) return false;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ id, blob, mimeType: mimeType || blob.type, storedAt: Date.now() });
      tx.oncomplete = () => { db.close(); resolve(true); };
      tx.onabort = () => { db.close(); reject(tx.error || new Error("Video save aborted")); };
      tx.onerror = e => reject(e.target.error);
    });
  } catch (err) {
    console.warn('IndexedDB write error:', err);
    return false;
  }
}

async function retrieveVideoBlob(id) {
  try {
    const db = await openVideoDB();
    if (!db) return null;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result ? req.result.blob : null);
      req.onerror = e => reject(e.target.error);
    });
  } catch (err) {
    console.warn('IndexedDB read error:', err);
    return null;
  }
}

window.IMUSIC_MEDIA = {
  storeVideoBlob,
  retrieveVideoBlob
};
