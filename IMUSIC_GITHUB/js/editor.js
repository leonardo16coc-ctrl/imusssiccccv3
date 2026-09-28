import { appleMusicArtistUrl } from './apple-music.js';
let draft;
const $=id=>document.getElementById(id);
function readAsDataURL(file,cb){if(!file)return;const r=new FileReader();r.onload=e=>cb(e.target.result);r.readAsDataURL(file)}
function editorToast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}
function syncPreview(){
  const p=draft;
  $('liveName').textContent=p.artistName;
  $('liveTag').textContent=p.tagline;
  $('liveLocation').textContent=p.location;
  $('liveGenre').textContent=p.genre;
  $('liveAvatar').src=p.avatar;
  $('liveBanner').style.backgroundImage=`url('${p.banner}')`;
  document.documentElement.style.setProperty('--purple',p.theme);
  document.documentElement.style.setProperty('--button',p.button);
  document.documentElement.style.setProperty('--buttonText',p.buttonText);
  document.documentElement.style.setProperty('--secondaryButton',p.secondaryButton||'#f7f4fb');
}
function bindText(id,key){$(id).value=draft[key]||'';$(id).addEventListener('input',e=>{draft[key]=e.target.value;syncPreview()})}
function bindUpload(id,key,preview){$(id).addEventListener('change',e=>readAsDataURL(e.target.files[0],url=>{draft[key]=url;if(preview){const el=$(preview); if(el.tagName==='IMG')el.src=url; else el.style.backgroundImage=`url('${url}')`}syncPreview()}))}
function toggleModule(key,el){draft.modules[key]=!draft.modules[key];el.classList.toggle('off',!draft.modules[key]);editorToast(`${key} ${draft.modules[key]?'shown':'hidden'}`)}
function setTheme(color){draft.theme=color;syncPreview()}
function setButtonPreset(color,text='#ffffff'){draft.button=color;draft.buttonText=text;syncPreview(); if($('buttonPicker')) $('buttonPicker').value=color; if($('buttonTextPicker')) $('buttonTextPicker').value=text;}
function resetDesign(){draft.theme='#8b13f4';draft.button='#8b13f4';draft.secondaryButton='#f7f4fb';draft.buttonText='#ffffff';syncPreview(); $('themePicker').value=draft.theme;$('buttonPicker').value=draft.button;$('secondaryButtonPicker').value=draft.secondaryButton;$('buttonTextPicker').value=draft.buttonText;editorToast('Default IMÜSIC colors restored')}
function saveChanges(){if(draft.appleMusicUrl && !appleMusicArtistUrl(draft.appleMusicUrl)){editorToast("Enter a valid Apple Music artist URL.");return;}IMUSIC.saveProfile(draft);editorToast('Changes saved');setTimeout(()=>location.href='artist.html',650)}
function renderStickers(){const box=$('savedStickers'); if(!box)return; box.innerHTML=''; (draft.stickers||[]).forEach((st,i)=>{const item=document.createElement('button');item.className='saved-sticker'; if(st.type==='image'){const img=document.createElement('img');img.src=st.value;item.appendChild(img)}else item.textContent=st.value; item.title='Click to remove'; item.onclick=()=>{draft.stickers.splice(i,1);renderStickers();syncPreview()}; box.appendChild(item)})}
function addSticker(symbol){draft.stickers=draft.stickers||[];draft.stickers.push({type:'text',value:symbol});renderStickers();syncPreview()}
function stickerChosen(input){const f=input.files?.[0];if(!f)return;readAsDataURL(f,url=>{draft.stickers=draft.stickers||[];draft.stickers.push({type:'image',value:url});renderStickers();syncPreview()})}
function videoChosen(input){const f=input.files?.[0];$('videoFileName').textContent=f?`${f.name} · ${(f.size/1024/1024).toFixed(1)} MB`:'No video selected'}
document.addEventListener('DOMContentLoaded',()=>{
 draft=structuredClone(IMUSIC.getProfile());
 if(!$('artistName')) return; // upload-only page uses the helper functions but not the full editor
 bindText('artistName','artistName');bindText('tagline','tagline');bindText('bio','bio');bindText('location','location');bindText('genre','genre');bindText('website','website');bindText('appleMusicUrl','appleMusicUrl');
 bindUpload('avatarInput','avatar','profilePreviewImg');bindUpload('bannerInput','banner','bannerPreview');bindUpload('backgroundInput','background','backgroundPreview');
 $('themePicker').value=draft.theme;$('buttonPicker').value=draft.button;$('secondaryButtonPicker').value=draft.secondaryButton||'#f7f4fb';$('buttonTextPicker').value=draft.buttonText;
 $('themePicker').oninput=e=>setTheme(e.target.value);$('buttonPicker').oninput=e=>{draft.button=e.target.value;syncPreview()};$('secondaryButtonPicker').oninput=e=>{draft.secondaryButton=e.target.value;syncPreview()};$('buttonTextPicker').oninput=e=>{draft.buttonText=e.target.value;syncPreview()};
 document.querySelectorAll('[data-toggle]').forEach(el=>{const key=el.dataset.toggle;el.classList.toggle('off',!draft.modules[key]);el.onclick=()=>toggleModule(key,el)});
 renderStickers();
 syncPreview();
});

window.addSticker = addSticker;
window.stickerChosen = stickerChosen;
window.setTheme = setTheme;
window.setButtonPreset = setButtonPreset;
window.resetDesign = resetDesign;
window.saveChanges = saveChanges;
window.toggleModule = toggleModule;
window.videoChosen = videoChosen;
