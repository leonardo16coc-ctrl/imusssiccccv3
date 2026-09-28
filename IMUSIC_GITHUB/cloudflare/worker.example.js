/**
 * IMÜSIC Cloudflare Worker scaffold.
 * Bind secrets in Cloudflare dashboard; NEVER put R2/Stream secrets in browser code.
 * Suggested routes:
 * POST /api/r2-upload-url   -> return a short-lived presigned URL for avatar/banner/background/sticker uploads
 * POST /api/stream-upload   -> return a Cloudflare Stream Direct Creator Upload URL
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors() });
    if (url.pathname === '/api/health') return json({ ok:true, service:'imusic-api' });
    return json({ ok:false, message:'Configure IMÜSIC upload endpoints in this Worker.' }, 501);
  }
};
function cors(){return {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'GET,POST,OPTIONS'}}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json',...cors()}})}
