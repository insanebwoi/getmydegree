import { posts } from './posts'

/**
 * The articles each page should link to, most relevant first. Search engines
 * read these links to find an article and to judge what it is about, so a
 * course page points at the guides on that course rather than the same two
 * everywhere. A slug not yet released is skipped until the daily rebuild.
 */
const pageGuides: Record<string, string[]> = {
  '/courses/btech': ['distance-btech-kerala', 'lateral-entry-degree', 'bsc-vs-bca-for-tech-jobs', 'online-bca-kerala'],
  '/courses/bcom': ['distance-bcom-kerala', 'bba-vs-bcom-for-career-growth', 'degree-after-plus-two-working', 'credit-transfer-degree-kerala'],
  '/courses/bba': ['bba-vs-bcom-for-career-growth', 'degree-after-plus-two-working', 'best-degree-options-for-working-professionals', 'credit-transfer-degree-kerala'],
  '/courses/bca': ['online-bca-kerala', 'distance-btech-kerala', 'bsc-vs-bca-for-tech-jobs', 'kerala-online-mca-msc-it-programs', 'credit-transfer-degree-kerala'],
  '/courses/ba': ['distance-ba-kerala-psc', 'distance-degree-valid-kerala-psc', 'government-jobs-distance-degree-kerala', 'credit-transfer-degree-kerala'],
  '/courses/bsc': ['bsc-vs-bca-for-tech-jobs', 'lateral-entry-degree', 'degree-with-supplementary-papers', 'credit-transfer-degree-kerala'],
  '/courses/mba': ['online-mba-kerala-working-professionals', 'online-vs-regular-mba', 'mcom-vs-mba', 'marjon-university-uk-mba-kerala'],
  '/courses/mca': ['kerala-online-mca-msc-it-programs', 'masters-degree-while-working-full-time', 'top-online-masters-for-corporate-careers', 'bsc-vs-bca-for-tech-jobs'],
  '/courses/mcom': ['mcom-vs-mba', 'masters-degree-while-working-full-time', 'pg-diploma-vs-masters-degree', 'degree-requirements-for-executive-promotions'],
  '/courses/msw': ['distance-msw-kerala', 'masters-degree-while-working-full-time', 'government-jobs-distance-degree-kerala', 'pg-diploma-vs-masters-degree'],
  '/universities/rabindranath-tagore-university': ['rabindranath-tagore-university-distance-degree', 'ugc-deb-approval-search-verify-recognition', 'spot-fake-degree-provider'],
  '/universities/prist-deemed-university': ['prist-university-online-degree', 'ugc-deb-approval-search-verify-recognition', 'naac-grades-and-nirf-rankings-explained'],
  '/universities/bharathidasan-university': ['bharathidasan-university-distance-education', 'ugc-deb-approval-search-verify-recognition', 'naac-grades-and-nirf-rankings-explained'],
  '/universities/marjon-university': ['marjon-university-uk-mba-kerala', 'online-degree-valid-gulf-jobs', 'nri-and-international-students-indian-degrees'],
  '/credit-transfer': ['credit-transfer-degree-kerala', 'complete-discontinued-degree-kerala', 'credit-transfer-vs-lateral-entry', 'lateral-entry-degree', 'degree-with-supplementary-papers', 'degree-after-long-gap'],
  '/contact': ['distance-education-thrissur', 'distance-education-malappuram', 'distance-degree-faq-kerala', 'spot-fake-degree-provider'],
}

export function guidesFor(path: string) {
  return (pageGuides[path] ?? []).flatMap((slug) => posts.find((p) => p.slug === slug) ?? [])
}
