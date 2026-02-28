import type { CollectionPageBlob, DownloadPageBlob, TralbumPageBlob } from './page-blob.js'

/**
 * Flat optional merge of all three page blob variants.
 * Use this when you need to access fields from an unknown page type
 * without narrowing — all accesses become optional (`blob?.fan_data?.name`).
 * For precise work, use the discriminated variants and the guards below.
 */
export type LoosePageBlob = Partial<CollectionPageBlob & TralbumPageBlob & DownloadPageBlob>

/** Narrows an unknown blob to a collection/fan profile page blob. */
export function isCollectionPage(blob: unknown): blob is CollectionPageBlob {
  return typeof blob === 'object' && blob !== null && 'fan_data' in blob
}

/** Narrows an unknown blob to an album or track page blob. */
export function isTralbumPage(blob: unknown): blob is TralbumPageBlob {
  return typeof blob === 'object' && blob !== null && 'fan_tralbum_data' in blob
}

/** Narrows an unknown blob to a download page blob. */
export function isDownloadPage(blob: unknown): blob is DownloadPageBlob {
  return typeof blob === 'object' && blob !== null && 'download_items' in blob
}
