# Activate accounts and cloud video storage

The delivered site has a Firebase integration, but no project credentials have been supplied. Real email accounts, Google, Apple and online video storage are therefore NOT active. Buttons report this honestly. The explicit local demo lets you test channel editing and persistent IndexedDB video storage without a real account.

## Owner setup
1. Create/select a Firebase project and register a Web app. Copy the public Web configuration into `config/firebase-config.js` including storageBucket. Do not put an admin service account or Apple private key in website code.
2. Enable Authentication providers: Email/Password, Google and Apple. Configure authorized domains including the final site domain. Email account creation sends a verification message; password reset is included.
3. Complete Apple's web Sign in with Apple configuration (Services ID, domains, return URL and signing credentials in the provider console). Apple Music artist URLs and Sign in with Apple are separate features.
4. Enable Firestore and Cloud Storage, review the provider's current billing requirements and storage costs, then deploy the included rules with the Firebase CLI to YOUR selected project: `firebase deploy --only firestore:rules,storage`.
5. Run `npm install` and `npm run build`. Publish the built output over HTTPS. Test Google popup sign-in, Apple, registration, wrong passwords, reset and sign-out on the authorized domain.
6. With two accounts, verify profile ownership, forbidden badge edits, video uploads, reload playback and viewing from another device. Test a storage quota/error case. These remote tests could not run without a configured project.

## Implemented
- Real Firebase Auth integration, no fake successful OAuth buttons and no local password storage.
- Creator Studio: profile photo, cover, background, accent, artist details and Apple Music URL; image preview before saving.
- Upload by drag/drop or file picker, title and description, permission checkbox, actual upload progress for cloud uploads, and completion only after a successful write.
- MP4/WebM/MOV up to 200 MB. Browser codec support varies; MP4 H.264/AAC is the recommended delivery format. Transcoding is not implemented.
- My videos list and a local-file backup download. IndexedDB persistence lasts until the browser clears/evicts its storage; it is not a cloud backup.
- Firestore catalog integration for public standard videos (latest 100), user-owned profile writes and cloud storage paths. Cloud reels and production engagement counts are not implemented.

## Before a public launch
This is an integration scaffold, not a production-certified service. Review and test the inherited rendering for untrusted content, add moderation/reporting and takedowns, usage quotas, server-enforced metadata validation, cleanup for orphaned uploads, retention and deletion, video processing and monitoring. Review CSP/network access for Firebase SDK and API domains. Current example rules restrict profile/video ownership and prevent client badge writes; they have not been run in the emulator in this environment. Membership billing and verified badge approval remain unconnected. No subscription or cloud costs have been activated by this delivery.

References:
https://firebase.google.com/docs/auth/web/google-signin
https://firebase.google.com/docs/auth/web/apple
https://firebase.google.com/docs/auth/web/password-auth
https://firebase.google.com/docs/storage/web/upload-files
https://firebase.google.com/docs/firestore/security/rules-conditions
