# bandcamp-types

A TypeScript package providing types, constants, and DOM utilities for Bandcamp's internal data structures, page data blobs, JSON-LD schemas, and collection APIs. Used as a shared dev dependency across Bandcamp-related projects.

## Package name

`@barnemax/bandcamp-types`

When consuming in another project:
```json
// package.json devDependencies
"@barnemax/bandcamp-types": "file:../bandcamp-types"
```

## What belongs here

Only native Bandcamp data — shapes you read from the DOM or receive from Bandcamp's APIs. No extension-constructed or project-specific abstractions.

### Types — page blob (`page-blob.ts`)

`PageBlob` is a discriminant union — narrow with `'fan_data' in blob`, `'fan_tralbum_data' in blob`, or `'download_items' in blob`.

| Type | Source |
|---|---|
| `PageBlob` | Union of the three below |
| `CollectionPageBlob` | `#pagedata[data-blob]` on collection/profile pages |
| `TralbumPageBlob` | `#pagedata[data-blob]` on album/track pages |
| `DownloadPageBlob` | `#pagedata[data-blob]` on download pages |
| `FanData` | `CollectionPageBlob.fan_data` |
| `FanTralbumData` | `TralbumPageBlob.fan_tralbum_data` |
| `CollectionData` | Pagination state for collection/wishlist tabs |
| `DownloadItem` | `DownloadPageBlob.download_items[]` |
| `DownloadFile` | Per-format entry in `DownloadItem.downloads` |

### Types — collection (`collection.ts`)

| Type | Source |
|---|---|
| `TracklistEntry` | `CollectionPageBlob.tracklists.collection[key][]` — `artist` is optional |
| `CollectionCacheItem` | `CollectionPageBlob.item_cache.collection[key]` |
| `CollectorThumb` | `/api/tralbumcollectors/1/thumbs` — thumb entry + `token` cursor |
| `CollectorReview` | Same endpoint — extends `CollectorThumb` with `why` |
| `CollectorsBlob` | Full response: `thumbs`, `reviews`, `shown_thumbs`, `shown_reviews`, `band_thanks_text` |
| `BandcampCollectionItem` | `/api/fancollection/1/collection_items` item |
| `BandcampCollectionResponse` | Full response wrapper |

### Types — JSON-LD (`ld-json.ts`)

| Type | Source |
|---|---|
| `ReleaseLdJson` | `script[type="application/ld+json"]` on release pages |
| `LdMusicGroup` | `byArtist` / `publisher` |
| `LdMusicRelease` | Entry in `albumRelease[]` |
| `LdMusicRecording` | Track within `track.itemListElement[].item` |
| `LdPerson` | `sponsor[]` (buyers) and `comment[].author` |
| `LdComment` | Written review |
| `LdOffer` | Purchase offer with price/currency |
| `LdPropertyValue` | `{ "@type": "PropertyValue", name, value }` — appears everywhere |
| `LdListItem` | `track.itemListElement[]` wrapper with `position` |

### Types — tralbum (`tralbum.ts`)

| Type | Source |
|---|---|
| `TralbumType` | `'a' \| 't'` — album or track |
| `TralbumTrackInfo` | Tralbum API / `data-tralbum` attribute |

### Constants (`constants.ts`)

```ts
BANDCAMP_COLLECTION_URL  // https://bandcamp.com/api/fancollection/1/collection_items
BANDCAMP_COLLECTORS_URL  // https://bandcamp.com/api/tralbumcollectors/1/thumbs
BANDCAMP_REDEEM_PATH     // /api/codes/1/redeem (relative — prepend band origin)

SEL_PAGE_BLOB            // #pagedata[data-blob]
SEL_COLLECTORS_BLOB      // #collectors-data[data-blob]
SEL_LD_JSON              // script[type="application/ld+json"]
SEL_CRUMBS               // #js-crumbs-data[data-crumbs]
```

### Page detection (`page-detection.ts`)

Browser-context only (`document` required). Do not import in Node.js.

```ts
isUserConnected()   // no .login-link visible
isDownloadPage()    // .download-info-container.has-downloads
isAccountPage()     // .fan-bio-inner
isAlbumPage()       // .tralbum-page
isArtistPage()      // #band-navbar or #bio-container, not an album page
isRelevantPage()    // union of the above
```

## What does NOT belong here

- Extension-constructed types: `CollectionTrackItem`, `CollectionTracklists`, `WindowBandcampData` — built from DOM attributes, not native Bandcamp data
- Extension state: `ItemStatus`, `ItemData`, `PlaylistData`, `ArtistWatchData`, etc.
- UI types, storage keys, rate-limit config, concurrency helpers

## File structure

```
bandcamp-types/
  src/
    index.ts            # Re-exports everything — single public surface
    page-blob.ts        # PageBlob union + all sub-types
    ld-json.ts          # ReleaseLdJson + Ld* sub-types
    tralbum.ts          # TralbumType, TralbumTrackInfo
    collection.ts       # TracklistEntry, CollectionCacheItem,
                        # CollectorThumb/Review/Blob,
                        # BandcampCollectionItem/Response
    constants.ts        # API URLs + DOM selectors
    page-detection.ts   # isAlbumPage, isAccountPage, etc.
  sample_data/          # Real Bandcamp JSON samples used to derive types
  package.json
  tsconfig.json
  .gitignore
  CLAUDE.md
```

## Consuming in other projects

```json
"devDependencies": {
  "@barnemax/bandcamp-types": "file:../bandcamp-types"
}
```

Run `pnpm install`, then import:
```ts
import type { PageBlob, CollectionPageBlob, TralbumPageBlob, ReleaseLdJson, TralbumTrackInfo } from '@barnemax/bandcamp-types'
import { SEL_PAGE_BLOB, isAlbumPage } from '@barnemax/bandcamp-types'
```

## Maintenance notes

- Types are reverse-engineered from Bandcamp's live DOM — Bandcamp can change them without notice. Bump patch version when correcting a field.
- `PageBlob` is partial by design — only observed fields are typed. Don't add `[key: string]: unknown` everywhere.
- `ReleaseLdJson` follows schema.org shapes but Bandcamp omits many optional fields — keep non-critical fields optional.
- `TracklistEntry.artist` is optional — single-artist albums may omit it from the blob.
- Sample data in `sample_data/` is the source of truth for field shapes. Consult it before adding or changing types.
