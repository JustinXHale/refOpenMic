# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-04-17

### Added

- Firebase project wiring: `firebase.json`, `firestore.rules`, `firestore.indexes.json`, and `npm run deploy:firestore-rules` for deploying Security Rules.
- `public/favicon.ico` to avoid `/favicon.ico` 404s alongside existing PNG favicon.
- Home screen alert when the public Firestore listener fails (for example rules not deployed), with recovery when rules allow public reads.
- `usePublicMatchesListenerError` hook for shared public-match listener error state.

### Changed

- Public event lists use a single shared `matches` query on `isPublic == true`, with status filtering and sorting in the client, so anonymous users align with Security Rules and listing is more efficient.
- Firestore rules: single `allow read` on `matches` for public documents or authenticated users; header comments document deployment.

### Fixed

- Firestore `permission-denied` on home page for signed-out users when rules in the Firebase project matched deployed `firestore.rules` (deploy rules to the same project as `VITE_FIREBASE_PROJECT_ID`).

[0.5.0]: https://github.com/JustinXHale/refOpenMic/releases
