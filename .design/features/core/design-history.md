# Design History

This file contains a chronological record of key design updates and decisions for refAudio core product. See `.design/README.md` for format guidelines.

---

## 2026-04-15

### [Decision] PWA POC then Flutter production
- See decision doc: `.design/decisions/2026-04-15-pwa-poc-strategy.md`
- Building React PWA first to validate concept in 2-3 weeks
- Will rebuild as Flutter native app after validation
- Faster to user feedback, lower risk approach

### [Discussion] Public vs private matches as default
- See decision doc: `.design/decisions/2026-04-15-public-by-default.md`
- Decided matches should be public and searchable by default

### [Decision] Communication layer only
- Scoped refAudio to voice communication and match discovery only
- Match timers, event logging, and referee workflows belong in reflog (separate app)
- Maintains focus and enables integration with other apps

### [Decision] Spectator mode as core feature
- Spectators can listen to referee communications (receive-only)
- Supports transparency and community engagement
- Match creators can disable if needed for private events

### [Update] Removed push-to-talk from MVP
- Decided on full-duplex (always-on) voice for MVP
- Simpler UX, matches traditional referee radio behavior
- Push-to-talk may be added as optional mode in Phase 2

### [Decision] Accept cellular dependency trade-off
- App requires cellular/WiFi connection (no mesh networking in MVP)
- Trade-off: Lower cost and use existing hardware vs offline capability
- Acceptable because most fields have coverage and grassroots refs are primary users
