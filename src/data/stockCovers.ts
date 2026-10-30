/**
 * Articles whose cover is still a stock photograph rather than our own
 * artwork. Their image metadata makes no creator or copyright claim, since the
 * photo is not ours. Remove a slug once its own cover replaces the stock one,
 * and it picks up the full rights metadata.
 */
export const stockCovers = new Set<string>([
  'distance-ba-kerala-psc',
  'government-jobs-distance-degree-kerala',
])
