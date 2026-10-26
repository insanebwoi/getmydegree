/**
 * Articles whose cover is still a stock photograph rather than our own
 * artwork. Their image metadata makes no creator or copyright claim, since the
 * photo is not ours. Remove a slug once its own cover replaces the stock one,
 * and it picks up the full rights metadata.
 */
export const stockCovers = new Set<string>([
  'credit-transfer-degree-kerala',
  'complete-discontinued-degree-kerala',
  'distance-education-thrissur',
  'distance-education-malappuram',
  'bharathidasan-university-distance-education',
  'prist-university-online-degree',
  'rabindranath-tagore-university-distance-degree',
  'marjon-university-uk-mba-kerala',
  'online-mba-kerala-working-professionals',
  'distance-bcom-kerala',
  'online-bca-kerala',
  'distance-msw-kerala',
  'distance-ba-kerala-psc',
  'distance-degree-valid-kerala-psc',
  'online-degree-valid-gulf-jobs',
  'degree-attestation-gulf',
  'lateral-entry-degree',
  'degree-with-supplementary-papers',
  'degree-after-long-gap',
  'degree-after-plus-two-working',
  'spot-fake-degree-provider',
  'credit-transfer-vs-lateral-entry',
  'online-vs-regular-mba',
  'mcom-vs-mba',
  'government-jobs-distance-degree-kerala',
  'degree-for-gulf-returnees',
  'degree-for-housewives-kerala',
  'degree-for-kerala-government-employees',
  'dropout-to-graduate-success-story',
  'distance-degree-faq-kerala',
])
