// --- Bandcamp API endpoints ---

export const BANDCAMP_COLLECTION_URL = 'https://bandcamp.com/api/fancollection/1/collection_items'
export const BANDCAMP_COLLECTORS_URL = 'https://bandcamp.com/api/tralbumcollectors/1/thumbs'

/** Token used to fetch the full collection from the beginning (Bandcamp API sentinel value) */
export const BANDCAMP_COLLECTION_INITIAL_TOKEN = '9999999999::a::'

/** Relative path — prepend the band's origin, e.g. `https://artist.bandcamp.com` */
export const BANDCAMP_REDEEM_PATH = '/api/codes/1/redeem'

// --- DOM selectors ---

export const SEL_PAGE_BLOB = '#pagedata[data-blob]'
export const SEL_COLLECTORS_BLOB = '#collectors-data[data-blob]'
export const SEL_LD_JSON = 'script[type="application/ld+json"]'
export const SEL_CRUMBS = '#js-crumbs-data[data-crumbs]'
