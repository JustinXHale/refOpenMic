# refAudio - Technical Specification

**Version:** 1.0
**Last Updated:** 2026-04-15
**Status:** POC Phase - PWA Implementation

---

## Table of Contents

1. [Overview](#overview)
2. [POC Strategy](#poc-strategy)
3. [Technical Constraints](#technical-constraints)
4. [User Roles](#user-roles)
5. [Feature Requirements](#feature-requirements)
6. [User Flows](#user-flows)
7. [Data Models](#data-models)
8. [Technical Architecture](#technical-architecture)
9. [API Specifications](#api-specifications)
10. [Security & Privacy](#security--privacy)
11. [Performance Requirements](#performance-requirements)
12. [Future Considerations](#future-considerations)

---

## Overview

refAudio is a mobile-first platform that enables real-time voice communication for referee teams using existing smartphones and Bluetooth headsets. Matches are public and searchable by default, with optional private mode for sensitive events.

### Core Use Case
A referee creates a public match for "Oak Park HS vs Lincoln". Four other refs join the match room. They all connect their Bluetooth headsets and communicate via full-duplex voice. Meanwhile, 23 spectators browse the app, find the match, and listen to the referee communications in real-time.

---

## POC Strategy

**Decision:** Build PWA first to validate concept, then rebuild as Flutter native app.
**Rationale:** See `.design/decisions/2026-04-15-pwa-poc-strategy.md`

### Phase 0: PWA Proof of Concept (2-3 weeks)

**Tech Stack:**
- **Frontend:** React + TypeScript + Vite
- **Auth:** Firebase Authentication
- **Database:** Cloud Firestore
- **Voice:** LiveKit React SDK
- **Hosting:** Vercel or Firebase Hosting

**Goals:**
- Validate audio quality over cellular/WiFi
- Test spectator mode (listen-only) reliability
- Validate public match discovery model
- Measure real-world latency
- Identify critical UX issues

**Scope:**
- Core MVP features only
- 5-10 local refs testing during real matches
- Basic UI (mobile-optimized web)
- No app store submission

**Success Criteria:**
1. Audio latency <500ms (acceptable for officiating)
2. 5+ refs test during actual matches
3. Spectator mode works without dropouts
4. Refs say they would use this over radios
5. No critical UX blockers

### Phase 1: Flutter Production App (4-6 weeks)

**Tech Stack:**
- **Frontend:** Flutter (iOS + Android)
- **Auth:** Firebase Authentication (same)
- **Database:** Cloud Firestore (same)
- **Voice:** LiveKit Flutter SDK
- **Distribution:** App Store + Google Play

**Migration:**
- Firebase backend stays identical
- LiveKit configuration stays identical
- Data models reuse from POC
- UI/client code rewritten in Flutter

**Improvements over POC:**
- Full Bluetooth headset optimization
- Background audio support
- Native performance
- App store presence
- Phase 2 features based on POC learnings

### Why This Approach

**Advantages:**
- Faster to user feedback (1-2 weeks vs 4-6 weeks)
- Lower risk (validate before major investment)
- Learn what refs actually need
- Informed Flutter build (build the right thing)

**Trade-offs:**
- Rebuild work after POC
- PWA limitations during testing (Bluetooth, background audio)
- No app store presence initially

---

## Technical Constraints

### Hard Limits (MVP)

| Constraint | Value | Rationale |
|------------|-------|-----------|
| Max active refs per match | 5 | Typical crew: Ref + 2 ARs + TMO + reserve |
| Max spectators per match | 100 | Start conservative, scale based on testing |
| Audio latency target | <300ms | Acceptable for real-time officiating |
| Minimum supported iOS | 14.0 | WebRTC support |
| Minimum supported Android | 8.0 (API 26) | WebRTC support |
| Network requirement | Cellular data or WiFi | No mesh networking in MVP |

### Accepted Trade-offs

**We Accept:**
- Dependency on cellular/WiFi coverage
- Potential for network dropouts
- Battery drain from continuous audio

**We Do NOT Accept:**
- High audio latency (>500ms unusable)
- Frequent disconnections
- Poor audio quality
- Complex setup flows

---

## User Roles

### 1. Match Creator (Referee)
**Capabilities:**
- Create new matches (public or private)
- Configure match metadata
- Enable/disable spectator access
- End match
- Remove participants (future)

**Limitations:**
- Same audio permissions as other refs
- Cannot modify match after it goes live (MVP)

### 2. Referee (Active Participant)
**Capabilities:**
- Join match as active participant
- Full-duplex voice transmission and reception
- See connection status of other participants
- Leave match

**Limitations:**
- Max 5 per match
- Cannot join as both ref and spectator

### 3. Spectator (Listener)
**Capabilities:**
- Browse public matches (live and upcoming)
- Join public matches as listener
- Receive audio stream from refs
- Leave match

**Limitations:**
- Zero transmission capability (receive-only)
- Cannot join private matches without code
- Subject to max spectator limit per match

### 4. Unauthenticated User
**Capabilities:**
- Browse public matches (read-only)
- View match details

**Limitations:**
- Cannot join matches (audio)
- Cannot create matches

---

## Feature Requirements

### MVP (Must-Have)

#### Authentication
- [ ] Sign in with Google (Firebase Auth)
- [ ] Sign in with Phone Number (Firebase Auth)
- [ ] Basic user profile (name, avatar)
- [ ] Anonymous browsing (no auth required to view match list)

#### Match Management
- [ ] Create public match
- [ ] Create private match (with generated code)
- [ ] Set match metadata (title, level, location, scheduled time)
- [ ] Configure spectator access (on/off)
- [ ] End match
- [ ] Match status: `upcoming`, `live`, `ended`

#### Match Discovery
- [ ] Browse live matches
- [ ] Browse upcoming matches
- [ ] View match details (metadata, participant count, spectator count)
- [ ] Join public match (as ref or spectator)
- [ ] Join private match with code

#### Audio Communication
- [ ] Full-duplex voice for refs (always-on, no push-to-talk)
- [ ] Receive-only audio for spectators
- [ ] Bluetooth headset support
- [ ] Connection status indicators
- [ ] Automatic reconnection on network drop
- [ ] Mute/unmute self (refs only)

#### UI/UX
- [ ] Home screen with live/upcoming matches
- [ ] Match creation flow
- [ ] Join match flow (ref vs spectator selection)
- [ ] In-match view (participant list, connection status)
- [ ] Simple, clean interface optimized for field use

### Phase 2 (Post-MVP)

#### Enhanced Discovery
- [ ] Search matches by title, location, level
- [ ] Filter by match level (MLR, club, youth, etc.)
- [ ] Geolocation-based discovery ("matches near me")
- [ ] Follow specific referees

#### Match Features
- [ ] Edit match metadata before going live
- [ ] Scheduled notifications (upcoming matches you're in)
- [ ] Match history (past matches you participated in)
- [ ] Remove participants (creator only)

#### Audio Enhancements
- [ ] Audio quality settings (bandwidth optimization)
- [ ] Echo cancellation tuning
- [ ] Background noise suppression controls

#### Monetization
- [ ] Spectator mode pricing (first X minutes free, then $1)
- [ ] Creator can charge for spectator access
- [ ] Payment processing (Stripe)

### Future (Not Planned Yet)

- [ ] Match recording/archives
- [ ] Spectator chat (text)
- [ ] Integration API for reflog
- [ ] Multi-language support
- [ ] Desktop/web client
- [ ] Offline mode with sync

---

## User Flows

### Flow 1: Create Public Match (Match Creator)

```
1. User opens app
2. Taps "Create Match"
3. Enters match details:
   - Title (required)
   - Level: dropdown (MLR, Club, Youth, High School, Other)
   - Location (required)
   - Scheduled time (required)
4. Toggle "Allow Spectators" (default: ON)
5. Toggle "Private Match" (default: OFF)
6. Taps "Create Match"
7. Match is created → status: "upcoming"
8. User sees match room with:
   - Match details
   - Join code (if private)
   - "Start Match" button
   - Share button
9. User connects Bluetooth headset
10. Taps "Start Match"
11. Match status → "live"
12. LiveKit room created
13. User joins voice channel as ref
14. Match appears in public "Live Now" list
```

### Flow 2: Create Private Match (Match Creator)

```
1-3. Same as public match
4. Toggle "Private Match" → ON
5. System generates 6-digit code
6. Taps "Create Match"
7. User sees match room with:
   - Match details
   - Join code: "ABC123"
   - "Copy Code" button
   - "Start Match" button
8-13. Same as public match
14. Match does NOT appear in public list
```

### Flow 3: Join Public Match as Referee

```
1. User opens app
2. Browses "Upcoming" matches
3. Taps match: "Oak Park HS vs Lincoln"
4. Views match details
5. Taps "Join Match"
6. Selects role: "Referee" (vs "Spectator")
7. If match is live:
   - Joins LiveKit room immediately
   - Full-duplex audio enabled
8. If match is upcoming:
   - Joins waiting room
   - Notified when match starts
9. Connects Bluetooth headset
10. Starts communicating with other refs
```

### Flow 4: Join Public Match as Spectator

```
1. User opens app (no auth required for browsing)
2. Browses "Live Now" matches
3. Taps match: "Seattle vs San Diego - MLR"
4. Views match details (23 spectators listening)
5. If not authenticated:
   - Prompted to sign in
   - Continues after auth
6. Taps "Listen"
7. Joins LiveKit room as receive-only participant
8. Hears referee communications
9. Can leave at any time
```

### Flow 5: Join Private Match with Code

```
1. User opens app
2. Taps "Join with Code"
3. Enters 6-digit code: "ABC123"
4. System looks up match
5. If valid:
   - Shows match details
   - Continues to role selection (ref/spectator)
6. If invalid:
   - Error: "Match not found"
7. Proceeds as Flow 3 or 4 depending on role
```

### Flow 6: End Match (Match Creator)

```
1. Creator taps "End Match"
2. Confirmation dialog: "End match for all participants?"
3. Confirms
4. Match status → "ended"
5. LiveKit room closed
6. All participants disconnected
7. Match moves to "Past Matches" (future feature)
```

---

## Data Models

### User

```typescript
interface User {
  id: string;                    // Firebase Auth UID
  createdAt: Timestamp;
  updatedAt: Timestamp;

  // Profile
  displayName: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;

  // Stats (future)
  matchesCreated?: number;
  matchesJoined?: number;
  totalListeningTime?: number;
}
```

### Match

```typescript
interface Match {
  id: string;                    // Auto-generated
  createdAt: Timestamp;
  updatedAt: Timestamp;

  // Basic Info
  title: string;                 // "Oak Park HS vs Lincoln"
  level: MatchLevel;             // "MLR" | "club" | "youth" | "high-school" | "other"
  location: string;              // "Seattle, WA" or "Oak Park Field 2"
  scheduledTime: Timestamp;

  // Status
  status: MatchStatus;           // "upcoming" | "live" | "ended"
  startedAt?: Timestamp;         // When match went live
  endedAt?: Timestamp;           // When match ended

  // Privacy
  isPublic: boolean;             // Default: true
  allowSpectators: boolean;      // Default: true
  isPrivate: boolean;            // Default: false
  joinCode?: string;             // 6-char code, only if isPrivate

  // Participants
  creatorId: string;             // User ID of creator
  activeRefs: string[];          // Array of User IDs (max 5)
  spectators: string[];          // Array of User IDs (max 100)
  spectatorCount: number;        // Real-time count

  // LiveKit
  roomId: string;                // LiveKit room identifier
  roomName: string;              // Human-readable room name

  // Limits
  maxRefs: number;               // Default: 5
  maxSpectators: number;         // Default: 100

  // Future
  isPaid?: boolean;
  spectatorPrice?: number;       // USD cents
}

type MatchLevel = "MLR" | "club" | "youth" | "high-school" | "other";
type MatchStatus = "upcoming" | "live" | "ended";
```

### Participant

```typescript
interface Participant {
  id: string;                    // Auto-generated
  matchId: string;
  userId: string;

  // Role
  role: ParticipantRole;         // "creator" | "referee" | "spectator"

  // Status
  joinedAt: Timestamp;
  leftAt?: Timestamp;
  isConnected: boolean;          // Real-time audio connection status

  // Audio
  isMuted?: boolean;             // Only for refs
  audioQuality?: "good" | "poor" | "disconnected";
}

type ParticipantRole = "creator" | "referee" | "spectator";
```

### LiveKitRoom (Ephemeral - not stored in Firestore)

```typescript
interface LiveKitRoom {
  roomId: string;
  matchId: string;

  // Participants
  publishers: string[];          // Ref User IDs (can transmit)
  subscribers: string[];         // Spectator User IDs (receive only)

  // Settings
  maxPublishers: 5;
  maxSubscribers: 100;
  audioCodec: "opus";
  videEnabled: false;
}
```

---

## Technical Architecture

### Tech Stack

#### POC (Current Phase)

**Frontend (PWA):**
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **State Management:** React Context + Hooks
- **Audio:** LiveKit React SDK
- **UI:** Tailwind CSS (mobile-first)
- **PWA:** Vite PWA Plugin

**Backend:**
- **Auth:** Firebase Authentication (Google, Phone)
- **Database:** Cloud Firestore
- **Cloud Functions:** Firebase Functions (match management logic)
- **Voice Infrastructure:** LiveKit Cloud

**Deployment:**
- **Hosting:** Vercel or Firebase Hosting
- **Analytics:** Firebase Analytics

#### Production (After POC)

**Frontend (Mobile App):**
- **Framework:** Flutter (cross-platform)
- **State Management:** Riverpod or Provider
- **Audio:** LiveKit Flutter SDK
- **UI:** Material Design 3

**Backend:** (Same as POC)
- **Auth:** Firebase Authentication (Google, Phone)
- **Database:** Cloud Firestore
- **Cloud Functions:** Firebase Functions (match management logic)
- **Voice Infrastructure:** LiveKit Cloud (MVP) → Self-hosted (future)

**Distribution:**
- **iOS:** App Store
- **Android:** Google Play Store
- **Analytics:** Firebase Analytics
- **Crash Reporting:** Firebase Crashlytics

### Architecture Diagram

**POC Architecture (Current):**

```
┌─────────────────┐
│   React PWA     │
│ (Mobile Browser)│
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────────┐
│ Firebase Auth   │  │ Cloud Firestore  │
│ (User Auth)     │  │ (Match Data)     │
└─────────────────┘  └──────────────────┘
         │                 │
         │                 ▼
         │        ┌──────────────────┐
         │        │ Cloud Functions  │
         │        │ (Business Logic) │
         │        └──────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│         LiveKit Cloud               │
│  ┌──────────────────────────────┐   │
│  │  Match Room (Live)           │   │
│  │  - Publishers: 5 refs        │   │
│  │  - Subscribers: 100 specs    │   │
│  │  - Codec: Opus               │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Data Flow

**1. Match Creation**
```
User → Flutter App → Cloud Function (createMatch)
                  → Firestore (create Match doc)
                  → LiveKit API (create room)
                  → Return match ID to app
```

**2. Join Match (Referee)**
```
User → Flutter App → Cloud Function (joinMatch)
                  → Verify: match exists, <5 refs
                  → Firestore (add to activeRefs)
                  → Generate LiveKit token (publisher)
                  → Flutter connects to LiveKit room
                  → Start transmitting/receiving audio
```

**3. Join Match (Spectator)**
```
User → Flutter App → Cloud Function (joinMatchAsSpectator)
                  → Verify: spectators allowed, <100 specs
                  → Firestore (increment spectatorCount)
                  → Generate LiveKit token (subscriber)
                  → Flutter connects to LiveKit room
                  → Start receiving audio (no transmission)
```

**4. Browse Matches**
```
User → Flutter App → Firestore query:
                     WHERE status == "live"
                     AND isPublic == true
                     ORDER BY scheduledTime DESC
                  → Display list
```

---

## API Specifications

### Cloud Functions

#### `createMatch`
**Trigger:** HTTPS Callable
**Auth:** Required

**Input:**
```typescript
{
  title: string;
  level: MatchLevel;
  location: string;
  scheduledTime: Timestamp;
  isPrivate: boolean;
  allowSpectators: boolean;
}
```

**Output:**
```typescript
{
  matchId: string;
  roomId: string;
  joinCode?: string;  // Only if isPrivate
}
```

**Logic:**
1. Validate user is authenticated
2. Generate unique match ID
3. Create LiveKit room
4. If private, generate 6-char join code
5. Create Match document in Firestore
6. Add creator to activeRefs
7. Return match data

---

#### `startMatch`
**Trigger:** HTTPS Callable
**Auth:** Required (must be creator)

**Input:**
```typescript
{
  matchId: string;
}
```

**Output:**
```typescript
{
  success: boolean;
  liveKitToken: string;  // JWT for LiveKit
}
```

**Logic:**
1. Verify user is match creator
2. Update match status to "live"
3. Set startedAt timestamp
4. Generate LiveKit token for creator (publisher role)
5. Return token

---

#### `joinMatch`
**Trigger:** HTTPS Callable
**Auth:** Required

**Input:**
```typescript
{
  matchId: string;
  role: "referee" | "spectator";
  joinCode?: string;  // Required if private match
}
```

**Output:**
```typescript
{
  success: boolean;
  liveKitToken: string;
  participantId: string;
}
```

**Logic:**
1. Verify match exists
2. If private, verify join code
3. If role === "referee":
   - Check activeRefs.length < 5
   - Add user to activeRefs
   - Generate token with publisher permissions
4. If role === "spectator":
   - Check allowSpectators === true
   - Check spectatorCount < maxSpectators
   - Increment spectatorCount
   - Generate token with subscriber permissions
5. Create Participant document
6. Return token

---

#### `leaveMatch`
**Trigger:** HTTPS Callable
**Auth:** Required

**Input:**
```typescript
{
  matchId: string;
  participantId: string;
}
```

**Output:**
```typescript
{
  success: boolean;
}
```

**Logic:**
1. Get Participant document
2. If role === "referee":
   - Remove from activeRefs
3. If role === "spectator":
   - Decrement spectatorCount
4. Update Participant.leftAt
5. Set isConnected = false

---

#### `endMatch`
**Trigger:** HTTPS Callable
**Auth:** Required (must be creator)

**Input:**
```typescript
{
  matchId: string;
}
```

**Output:**
```typescript
{
  success: boolean;
}
```

**Logic:**
1. Verify user is creator
2. Update match status to "ended"
3. Set endedAt timestamp
4. Close LiveKit room
5. Disconnect all participants
6. Return success

---

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection
    match /users/{userId} {
      allow read: if true;  // Public profiles
      allow write: if request.auth.uid == userId;  // Own profile only
    }

    // Matches collection
    match /matches/{matchId} {
      // Anyone can read public matches
      allow read: if resource.data.isPublic == true || request.auth != null;

      // Only authenticated users can create
      allow create: if request.auth != null;

      // Only creator can update/delete
      allow update, delete: if request.auth.uid == resource.data.creatorId;
    }

    // Participants sub-collection
    match /matches/{matchId}/participants/{participantId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;  // Managed by Cloud Functions
    }
  }
}
```

---

## Security & Privacy

### Authentication
- Firebase Authentication required to join matches
- Anonymous browsing allowed (read-only)
- No social features in MVP (no following, no DMs)

### Private Matches
- Join codes are 6 characters (alphanumeric, case-insensitive)
- ~2.1 billion possible combinations (36^6)
- Codes expire when match ends
- Private matches not indexed in search

### Audio Privacy
- Spectators are receive-only (enforced by LiveKit)
- No recording in MVP
- Creators can disable spectators entirely
- Private matches require explicit code sharing

### Data Privacy
- User emails/phone numbers never exposed publicly
- Only display names visible in match
- No PII in match metadata
- GDPR/CCPA compliance (future)

---

## Performance Requirements

### Audio Quality
- **Latency:** <300ms end-to-end (target)
- **Codec:** Opus (48kHz, stereo)
- **Bitrate:** Adaptive (16-64 kbps)
- **Packet Loss Tolerance:** Up to 10% graceful degradation

### Network Requirements
- **Minimum bandwidth:** 50 kbps up/down per participant
- **Recommended:** 100+ kbps up/down
- **Jitter tolerance:** <30ms

### App Performance
- **Cold start:** <3 seconds
- **Match list load:** <1 second
- **Join match:** <2 seconds from tap to audio
- **Memory usage:** <150 MB typical
- **Battery:** <10% drain per hour (audio streaming)

### Scalability (MVP Targets)
- **Concurrent matches:** 100+
- **Total users:** 10,000+
- **Peak concurrent users:** 1,000+

---

## Future Considerations

### Phase 2 Enhancements
- Match recording and playback
- Advanced search/filtering
- Geolocation-based discovery
- Payment processing for paid events
- Web client (spectator mode)

### Integration API
- REST API for reflog integration
- Webhook events (match started, match ended)
- OAuth for third-party apps

### Platform Expansion
- Multi-sport support (soccer, basketball, etc.)
- Desktop client
- Offline mode with sync
- Mesh networking fallback (advanced)

### Analytics & Insights
- Match quality metrics
- Audio quality monitoring
- User engagement tracking
- Retention analysis

---

## Open Questions

**To Be Decided:**

1. **Match visibility window**
   - How long before scheduled time should upcoming matches appear?
   - Recommendation: 24 hours

2. **Abandoned matches**
   - Auto-end matches if no activity after X minutes?
   - Recommendation: 15 minutes after scheduled time

3. **User moderation**
   - Report/block features?
   - Not in MVP, add if abuse emerges

4. **Match editing**
   - Can creators edit metadata after creation?
   - Recommendation: Yes, but only before match starts

5. **Spectator notifications**
   - Push notifications for followed matches?
   - Phase 2 feature

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-15 | Initial specification |

---

**This spec is a living document. As we build and learn, it will evolve.**
