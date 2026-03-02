import type { TralbumType } from './tralbum.js'
import type { TracklistEntry, CollectionCacheItem } from './collection.js'

// ---------------------------------------------------------------------------
// Shared sub-types
// ---------------------------------------------------------------------------

export interface DownloadFile {
  size_mb: string
  description: string
  encoding_name: string
  url: string
}

export interface DownloadItem {
  index: number
  item_id: number
  item_type: string
  type: string
  band_id: number
  title: string
  artist: string
  art_id: number
  thumb_title: string
  page_url: string
  release_date: string
  track_count: number
  desc_track_count: number
  desc: string
  url_hints: {
    subdomain: string
    custom_domain: string | null
    custom_domain_verified: unknown | null
    item_type: string
    slug: string
  }
  downloads: Record<string, DownloadFile>
  download_pref: number
  ready: boolean
  shareable: boolean
  is_preorder: boolean
  is_pure_free: boolean
  is_name_your_price: boolean
  paid_for: boolean
  payment_id: number
  payment_type: string
  currency: string
  min_price: number | null
  download_type_str: string
  genre_id: number | null
  stale_free_download: unknown | null
  band_enabled: number | null
  killed: unknown | null
}

/** Full fan/user data on their own collection page. */
export interface FanData {
  trackpipe_url: string
  username: string
  name: string
  fan_id: number
  location: string
  raw_location: string
  bio: string
  photo: { image_id: number; width: number; height: number } | null
  website_url: string | null
  is_own_page: boolean | null
  followers_count: number
  following_bands_count: number
  following_fans_count: number
  following_genres_count: number
  subscriptions_count: number
  fav_genre: string | null
}

/** Fan ownership/wishlist data on album and track pages. */
export interface FanTralbumData {
  band_id: number
  tralbum_type: TralbumType
  tralbum_id: number
  fan_id: number
  fan_username: string
  fan_name: string
  fan_photo: number | null
  is_purchased: boolean
  is_wishlisted: boolean
  part_of_purchased_album: boolean
  follows_band: boolean
  follows_label: boolean
  subscribed_to_band: boolean | null
  subscribed_to_selling_band: boolean | null
  subscribed_to_licensor: boolean | null
  member_of_band: boolean
}

/** Pagination/sequence state for a collection or wishlist tab. */
export interface CollectionData {
  redownload_urls: Record<string, string>
  last_token: string
  item_count: number
  batch_size: number
  hidden_items_count: number
  small_collection: boolean
  small_wishlist: boolean
  sequence: string[]
  pending_sequence: string[]
}

// ---------------------------------------------------------------------------
// Page-specific blob shapes
// ---------------------------------------------------------------------------

/**
 * Collection / fan profile page (bandcamp.com/username or fan.bandcamp.com).
 * Discriminant: `fan_data` is present.
 */
export interface CollectionPageBlob {
  fan_data: FanData
  collection_count: number
  collection_data: CollectionData
  wishlist_data?: CollectionData
  tracklists: {
    collection: Record<string, TracklistEntry[]>
    wishlist?: Record<string, TracklistEntry[]>
  }
  item_cache: {
    collection: Record<string, CollectionCacheItem>
    wishlist?: Record<string, CollectionCacheItem>
  }
  fan_stats?: {
    other_visits: number
    other_plays: number
  }
  active_tab?: 'collection' | 'wishlist'
}

/**
 * Album or track page (artist.bandcamp.com/album/… or /track/…).
 * Discriminant: `fan_tralbum_data` is present.
 * Narrow further via `track_id`: absent = album, present = track.
 */
export interface TralbumPageBlob {
  /** Null when the page is viewed without authentication. */
  fan_tralbum_data: FanTralbumData | null
  album_id: number
  track_id?: number
  band?: { name: string }
  show_buy_full_disco?: boolean | null
  buyfulldisco?: {
    tralbums: Array<{ item_id: number }>
  }
}

/**
 * Download page (bandcamp.com/download?…).
 * Discriminant: `download_items` and `has_downloads` are present.
 */
export interface DownloadPageBlob {
  download_items: DownloadItem[]
  has_downloads: boolean
  download_format: string
  download_formats?: Array<{ description: string; encoding_name: string }>
  digital_items?: unknown[]
  fan_email?: string
  multidownload: boolean
  is_redownload: boolean
}

// ---------------------------------------------------------------------------
// Yum (band/artist homepage) sub-types
// ---------------------------------------------------------------------------

export interface BandSite {
  url: string
  title: string
  nav_type: string | null
}

export interface BandNavbarItem {
  url: string
  title: string
  nav_type: string
}

/** The `mband` field — the band/artist's full profile data. */
export interface MBand {
  id: number
  create_date: string
  disabled_date: string | null
  name: string
  subdomain: string
  url: string
  https_url: string
  local_url: string
  https_local_url: string
  url_hints: {
    subdomain: string
    custom_domain: string | null
    custom_domain_verified: unknown | null
  }
  currency: string
  fan_email: string | null
  thanks_enabled: number
  reviews_enabled: number
  is_label: boolean
  has_label: boolean
  merch_enabled: boolean
  google_analytics_id: string | null
  has_recommendations: boolean
  has_tralbums: boolean
  has_public_tralbums: boolean
  has_public_merch: boolean
  has_any_downloads: boolean
  has_discounts: boolean
  has_download_codes: boolean
  has_policies: boolean
  sites: BandSite[]
  navbar_items: BandNavbarItem[]
  has_items_for_sale: boolean
  playback_limits: {
    streaming_limits_enabled: boolean
    streaming_limit: number
  }
  genre_id: number | null
  meets_buy_full_discography_criteria: boolean
}

export interface YumIdentities {
  user: { id: number }
  ip_country_code: string
  fan: {
    id: number
    username: string
    name: string
    photo: number
    private: boolean
    verified: boolean
    url: string
  } | null
  is_page_band_member: boolean | null
  subscribed_to_page_band: boolean | null
  bands: unknown[]
  is_admin: boolean | null
  labels: unknown[]
  page_band: unknown | null
}

export interface FanOnboarding {
  tooltips: unknown | null
  num_tooltips: number
  tooltip_number: unknown | null
  current_index: unknown | null
  complete: boolean
  show_collection_banner: boolean
  show_feed_banner: boolean
  show_verify_banner: boolean
  first_wishlisted_item_title: string | null
  first_wishlisted_item_type: string | null
  first_purchased_item_title: string | null
  first_purchased_item_type: string | null
  template: unknown | null
  email: string
  has_collection: number
  has_seen_tooltips: boolean
  show_first_wishlist_tooltip: boolean
  deferred: boolean
}

/**
 * Band/artist homepage (artist.bandcamp.com or artist.bandcamp.com/music).
 * Discriminant: `mband` is present.
 */
export interface YumPageBlob {
  mband: MBand
  identities: YumIdentities
  fan_onboarding?: FanOnboarding
  api_params: {
    is_corp: boolean
    band_id: number
    platform_closed: boolean
    hard_to_download: boolean
    fan_logged_in: boolean
    band_url: string
    was_logged_out: unknown | null
    is_https: boolean
    ref_url: string | null
  }
  localize_page?: boolean
  locale?: string
  languages?: Record<string, string>
}

// ---------------------------------------------------------------------------
// Union — narrow with 'fan_data' in blob, 'fan_tralbum_data' in blob, etc.
// ---------------------------------------------------------------------------

/**
 * Extracted from `#pagedata[data-blob]`.
 *
 * Narrow by checking for discriminant fields:
 * - `'fan_data' in blob`         → CollectionPageBlob
 * - `'fan_tralbum_data' in blob` → TralbumPageBlob  (album or track)
 * - `'download_items' in blob`   → DownloadPageBlob
 * - `'mband' in blob`            → YumPageBlob
 */
export type PageBlob = CollectionPageBlob | TralbumPageBlob | DownloadPageBlob | YumPageBlob
