# IMÜSIC production architecture

## Public browsing
Public pages query published Artist World and video metadata. No login gate should wrap the entire site.

## Authenticated actions
Create account / sign in only when a visitor wants to participate: comment, like/save, follow/add friend, upload, message or customize.

## Profile editor flow
1. Upload profile photo.
2. Upload banner.
3. Upload background.
4. Add optional stickers/decorations.
5. Choose generic preset colors or a custom button color.
6. Toggle modules.
7. Preview live.
8. Save changes.

For production, images go to R2 using signed URLs; profile settings and URLs go to Firestore.
