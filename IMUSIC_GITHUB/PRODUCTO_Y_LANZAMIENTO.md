# IMÜSIC — Product model

Anyone can create a channel and upload music videos or reels for free. Watching public videos does not require a paid membership. Verification is optional.

Artist Verified: proposed 9 USD/month membership for a checkmark, subject to identity review using an Apple Music artist page. No follower minimum. Approve identity first, then activate billing; grant the badge only while membership is active. Do not charge rejected applicants. Payment alone is not identity proof.

Production rule: verified = identityApproved AND membershipActive. Enforce this on the server using reviewed applications and verified payment webhooks. Subscription cancellation removes the badge at the end of the paid term, not videos or the free channel. Handle refunds, disputes, deletion and appeals before launch.

Fan Club remains a separate concept for supporting individual artists; it does not grant artist verification.

This delivery remains a local prototype. Registration and login are simulated; uploads, favorites, membership selection and verification drafts are browser-local. No payment or real verification service is connected. Sample artists, badges and counters are demonstration data. Do not treat client storage as proof of payment or identity. The production public catalog needs real authentication, storage, video delivery, a database, moderation and rights reporting.

Apple Music URLs must point to https://music.apple.com/.../artist/.../ID. The draft form validates URL structure only; it does not prove ownership or resolve the page.

Run npm install then npm run dev. For deployment, run npm run build. JavaScript syntax and URL validation were checked; a browser and Vite build are still required for final visual and production QA.
