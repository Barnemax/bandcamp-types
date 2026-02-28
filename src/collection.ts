import type { TralbumType } from './tralbum.js'

// ---------------------------------------------------------------------------
// Raw page blob types
// ---------------------------------------------------------------------------

/** Single track entry as it appears in `PageBlob.tracklists.collection[key][]`. */
export interface TracklistEntry {
  id: number
  title: string
  artist?: string
  track_number: number
  duration: number
  file: Record<string, string>
}

/** Single album/track entry in `PageBlob.item_cache.collection[key]`. */
export interface CollectionCacheItem {
  item_id: number
  item_type: string
  tralbum_id: number
  tralbum_type: TralbumType
  album_id: number
  item_title: string
  band_id: number
  band_name: string
  featured_track: number | null
  featured_track_title: string | null
  featured_track_url: string | null
  featured_track_is_custom: boolean
  also_collected_count: number
  why: unknown | null
  url_hints: {
    subdomain: string
    custom_domain: string | null
    custom_domain_verified: unknown | null
    slug: string
    item_type: string
  }
  item_art_id: number
  item_url: string
  package_details: unknown | null
  num_streamable_tracks: number
  is_purchasable: boolean
  is_private: boolean
  is_preorder: boolean
  is_giftable: boolean
  is_subscriber_only: boolean
  is_subscription_item: boolean
  hidden: boolean | null
  gift_sender_name: string | null
  gift_sender_note: string | null
  gift_id: number | null
  gift_recipient_name: string | null
  sale_item_id: number | null
  sale_item_type: string | null
  band_image_id: number | null
  band_location: string | null
  release_count: number | null
  message_count: number | null
  service_name: string | null
  service_url_fragment: string | null
  download_available: boolean
  purchased: string | null
}

// --- Collectors API (`/api/tralbumcollectors/1/thumbs`) ---

export interface CollectorThumb {
  fan_id: number
  username: string
  name: string
  image_id: number
  /** Pagination cursor: `"version:timestamp:fan_id:flags"` */
  token: string
}

export interface CollectorReview extends CollectorThumb {
  why: string
}

export interface CollectorsBlob {
  thumbs: CollectorThumb[]
  more_thumbs_available: boolean
  shown_thumbs: CollectorThumb[]
  reviews: CollectorReview[]
  more_reviews_available: boolean
  shown_reviews: CollectorReview[]
  band_thanks_text: string
}

// --- Fan collection API (`/api/fancollection/1/collection_items`) ---

export interface BandcampCollectionItem {
  id: number
  item_url: string
}

export interface BandcampCollectionResponse {
  items: BandcampCollectionItem[]
}
