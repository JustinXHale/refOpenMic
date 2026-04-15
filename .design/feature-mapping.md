# Feature Mapping

This file maps code paths to design feature areas for design history tracking.

## Code Path to Feature Mapping

| Code Path | Design Feature | Design History |
|-----------|----------------|----------------|
| (product-wide) | Core Product | `.design/features/core/design-history.md` |
| `lib/features/auth/` | Authentication | `.design/features/auth/design-history.md` |
| `lib/features/match_creation/` | Match Creation | `.design/features/match-creation/design-history.md` |
| `lib/features/match_discovery/` | Match Discovery | `.design/features/match-discovery/design-history.md` |
| `lib/features/audio/` | Audio Engine | `.design/features/audio/design-history.md` |
| `lib/features/spectator/` | Spectator Mode | `.design/features/spectator/design-history.md` |

## How to Use This File

When making design-related changes:

1. Find the code path you're modifying in the table above
2. Add your design-history entry to the corresponding `design-history.md`
3. If your code path isn't listed, create a new feature area (see `.design/README.md`)

## Notes

- Paths are relative to repo root
- Use the most specific path that matches your changes
- Shared/utility code usually doesn't need design history unless it impacts UX
