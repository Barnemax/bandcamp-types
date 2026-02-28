// ---------------------------------------------------------------------------
// schema.org building blocks (Bandcamp-flavoured subset)
// ---------------------------------------------------------------------------

export interface LdPropertyValue {
  '@type': 'PropertyValue'
  name: string
  value: string | number | boolean
}

export interface LdOffer {
  '@type': 'Offer'
  url: string
  priceCurrency: string
  price: number
  priceSpecification?: { minPrice: number }
  availability?: string
  additionalProperty?: LdPropertyValue[]
}

/** Stub or full MusicRelease entry inside `albumRelease[]`. */
export interface LdMusicRelease {
  '@type': 'MusicRelease' | string | string[]
  '@id': string
  name?: string
  description?: string
  musicReleaseFormat?: string
  additionalProperty?: LdPropertyValue[]
  offers?: LdOffer
  image?: string[]
}

export interface LdMusicRecording {
  '@type': 'MusicRecording'
  '@id': string
  name?: string
  /** ISO 8601 duration, e.g. `"P00H07M09S"` */
  duration?: string
  copyrightNotice?: string
  mainEntityOfPage?: string
  additionalProperty?: LdPropertyValue[]
}

export interface LdListItem {
  '@type': 'ListItem'
  position: number
  item: LdMusicRecording
}

export interface LdPerson {
  '@type': 'Person'
  url: string
  name: string
  image?: string
  additionalProperty?: LdPropertyValue[]
}

export interface LdComment {
  '@type': 'Comment'
  author: LdPerson
  text: string[]
}

export interface LdMusicGroup {
  '@type': 'MusicGroup'
  '@id'?: string
  name: string
  image?: string
  genre?: string
  description?: string
  additionalProperty?: LdPropertyValue[]
  mainEntityOfPage?: Array<{ '@type': 'WebPage'; url: string; name: string; additionalProperty?: LdPropertyValue[] }>
  foundingLocation?: { '@type': 'Place'; name: string }
  subjectOf?: Array<{ '@type': 'WebPage'; url: string; name: string; additionalProperty?: LdPropertyValue[] }>
}

// ---------------------------------------------------------------------------
// Top-level type
// ---------------------------------------------------------------------------

/**
 * Extracted from `script[type="application/ld+json"]` on release pages.
 * Follows schema.org MusicAlbum / MusicRecording shape, Bandcamp subset.
 */
export interface ReleaseLdJson {
  '@type': 'MusicAlbum' | 'MusicRecording'
  '@id': string
  name: string
  mainEntityOfPage?: string
  datePublished?: string
  dateModified?: string
  description?: string
  creditText?: string
  copyrightNotice?: string
  image?: string
  keywords?: string[]
  numTracks?: number
  albumReleaseType?: string
  byArtist?: LdMusicGroup
  publisher?: LdMusicGroup
  albumRelease?: LdMusicRelease[]
  track?: {
    '@type': 'ItemList'
    numberOfItems: number
    itemListElement: LdListItem[]
  }
  comment?: LdComment[]
  sponsor?: LdPerson[]
}
