# Public vs Private Matches as Default

**Date:** 2026-04-15
**Status:** Decided

## Context

Initially considered requiring join codes for all matches (private by default). This would mean match creators share codes with their crew and optionally with spectators.

However, this creates friction for the common case (local grassroots matches) and limits discoverability. The question: should matches be public and searchable by default, or private with opt-in sharing?

## Options Considered

### Option 1: Private by Default (Initial Thinking)
**How it works:**
- All matches require join codes
- Creator shares code with refs and spectators
- No public match browsing

**Pros:**
- Privacy-first approach
- Refs have full control over who joins
- Simpler mental model (one way to join: codes)

**Cons:**
- Creates barrier to spectator discovery
- Requires code sharing for every match (friction)
- No platform/community feel
- Limits transparency
- Works against "public transparency" vision

### Option 2: Public by Default (Current Decision)
**How it works:**
- Matches are public and searchable by default
- Anyone can browse live/upcoming matches
- Spectators can join public matches directly
- Private matches available as opt-in (generates code)

**Pros:**
- Enables discovery ("what rugby matches are happening near me?")
- Removes friction for common case (grassroots matches)
- Builds community and platform effects
- Supports transparency vision
- Easy spectator access encourages engagement

**Cons:**
- Requires match creators to opt-in to privacy when needed
- Some refs may not want public comms (can disable spectators or go private)

## Decision

**Go with Option 2: Public by Default**

Rationale:
1. **Aligns with VISION.md transparency principle** - "Transparency by Default" is a core belief
2. **Removes barriers** - No code sharing needed for normal matches
3. **Enables platform thinking** - Discovery creates network effects
4. **Serves grassroots refs** - Most local matches benefit from transparency
5. **Privacy still available** - Refs can disable spectators or create private matches when needed

## Consequences

**For Users:**
- Match creators see public/private toggle (default: public)
- Spectators can browse and discover matches easily
- Private option available for sensitive events (paid events, closed scrimmages)

**For Product:**
- Build browse/search features (core to MVP)
- Public matches drive engagement and growth
- Platform becomes "the place" for local rugby officiating comms

**For Future:**
- Enables features like "matches near me"
- Creates foundation for referee profiles/following
- Supports community building

**Trade-offs Accepted:**
- Some refs may initially be uncomfortable with public comms
  - Mitigation: Clear communication about spectator mode, easy disable option
- Private matches are opt-in rather than default
  - Mitigation: Still available, just requires one toggle

## References
- VISION.md: "Transparency by Default" principle
- VISION.md: "Platform, Not Just a Tool"
- SPEC.md: Match data model (isPublic, allowSpectators fields)
