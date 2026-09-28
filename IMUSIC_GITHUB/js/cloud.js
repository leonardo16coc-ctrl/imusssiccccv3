import { firebaseConfig } from '../config/firebase-config.js';
export const configured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.storageBucket);
let auth, db, storage, A, D, S;
export const ready = (async()=>{
 if(!configured)return;
 const base='https://www.gstatic.com/firebasejs/12.19.0/';
 const load=name=>import(/* @vite-ignore */base+name);
 const [F,a,d,s]=await Promise.all([load('firebase-app.js'),load('firebase-auth.js'),load('firebase-firestore.js'),load('firebase-storage.js')]);
 A=a;D=d;S=s;const app=F.initializeApp(firebaseConfig);auth=A.getAuth(app);db=D.getFirestore(app);storage=S.getStorage(app);await auth.authStateReady();
})();
export function user(){return auth?.currentUser||null}
export async function login(provider,email,password,register=false){await ready;if(!configured)throw Error('Account services are not connected yet. You can explore the local demo below.');let result;
 if(provider==='email'){result=await (register?A.createUserWithEmailAndPassword:A.signInWithEmailAndPassword)(auth,email,password);if(register)await A.sendEmailVerification(result.user)}
 else {const p=provider==='google'?new A.GoogleAuthProvider():new A.OAuthProvider('apple.com');if(provider==='apple'){p.addScope('email');p.addScope('name')}result=await A.signInWithPopup(auth,p)}return result.user;
}
export async function logout(){await ready;if(auth)await A.signOut(auth)}
export async function resetPassword(email){await ready;if(!configured)throw Error('Account services are not connected yet.');await A.sendPasswordResetEmail(auth,email)}
export async function profile(){await ready;if(!user())throw Error('Sign in first.');const snap=await D.getDoc(D.doc(db,'profiles',user().uid));return snap.exists()?snap.data():null}
export async function saveProfile(value){await ready;if(!user())throw Error('Sign in first.');const allowed=['artistName','tagline','bio','location','genre','website','appleMusicUrl','avatar','banner','background','theme','button','secondaryButton','buttonText','modules','stickers'];const clean={id:user().uid};for(const k of allowed)if(value[k]!==undefined)clean[k]=value[k];await D.setDoc(D.doc(db,'profiles',user().uid),clean,{merge:true});return clean}
export async function upload(file,kind,onProgress=()=>{}){await ready;if(!user())throw Error('Sign in first.');const path=`users/${user().uid}/${kind}/${crypto.randomUUID()}`;const task=S.uploadBytesResumable(S.ref(storage,path),file,{contentType:file.type});await new Promise((resolve,reject)=>task.on('state_changed',s=>onProgress(Math.round(s.bytesTransferred/s.totalBytes*100)),reject,resolve));return {url:await S.getDownloadURL(task.snapshot.ref),path}}
export async function saveVideo(value){await ready;if(!user())throw Error('Sign in first.');const v={...value,artistId:user().uid,id:crypto.randomUUID(),createdAt:new Date().toISOString()};await D.setDoc(D.doc(db,'videos',v.id),v);return v}
export async function catalog(){await ready;if(!configured)return null;const [p,v]=await Promise.all([D.getDocs(D.collection(db,'profiles')),D.getDocs(D.query(D.collection(db,'videos'),D.orderBy('createdAt','desc'),D.limit(100)))]);return {artists:p.docs.map(x=>x.data()),videos:v.docs.map(x=>x.data())}}
