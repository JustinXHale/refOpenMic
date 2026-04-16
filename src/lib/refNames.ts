/** Display name for a ref userId (demo-only; Firebase version would look up user docs). */
const DEMO_NAMES: Record<string, string> = {
  'demo-user-001': 'You',
  'demo-organizer-001': 'Organizer',
  'ref-jordan': 'Jordan',
  'ref-casey': 'Casey',
  'ref-riley': 'Riley',
}

export function refDisplayName(
  userId: string,
  index: number,
  currentUserId?: string,
): string {
  if (userId === currentUserId) return 'You'
  return DEMO_NAMES[userId] || `Ref ${index + 1}`
}
