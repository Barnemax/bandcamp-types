# @barnemax/bandcamp-types

TypeScript types for Bandcamp's internal DOM structures, page data blobs, and collection APIs.

## Page blob

Bandcamp embeds a JSON blob in `#pagedata[data-blob]` on every page. The shape varies by page type — modelled here as a discriminated union.

```ts
import type { PageBlob } from '@barnemax/bandcamp-types'
import { SEL_PAGE_BLOB } from '@barnemax/bandcamp-types'

const el = document.querySelector(SEL_PAGE_BLOB)
const blob: PageBlob = JSON.parse(el!.getAttribute('data-blob')!)
```

### Narrowing with guards

```ts
import { isCollectionPage, isTralbumPage, isDownloadPage } from '@barnemax/bandcamp-types'

if (isCollectionPage(blob)) {
  // blob is CollectionPageBlob
  console.log(blob.fan_data.username)
} else if (isTralbumPage(blob)) {
  // blob is TralbumPageBlob
  // album if blob.track_id is absent, track if present
  console.log(blob.fan_tralbum_data.is_purchased)
} else if (isDownloadPage(blob)) {
  // blob is DownloadPageBlob
  console.log(blob.download_items)
}
```

The guards also accept `unknown`, so they work directly on a freshly parsed value without an intermediate cast.

### LoosePageBlob — skip narrowing

A flat optional merge of all three variants. Every field is optional, so accesses are safe without committing to a specific page type. Useful for quick ad-hoc access when the page type is genuinely unknown.

```ts
import type { LoosePageBlob } from '@barnemax/bandcamp-types'

const blob = JSON.parse(el!.getAttribute('data-blob')!) as LoosePageBlob

const username = blob.fan_data?.username
const isPurchased = blob.fan_tralbum_data?.is_purchased
const downloads = blob.download_items
```

## Other exports

| Export | Description |
|---|---|
| `ReleaseLdJson` | `script[type="application/ld+json"]` on release pages (schema.org `MusicAlbum` / `MusicRecording`) |
| `TralbumTrackInfo` | Track data from the `data-tralbum` attribute or Tralbum API |
| `CollectorsBlob`, `BandcampCollectionItem`, etc. | Collection API response shapes |
| `BANDCAMP_COLLECTION_URL` | `https://bandcamp.com/api/fancollection/1/collection_items` |
| `BANDCAMP_COLLECTORS_URL` | `https://bandcamp.com/api/tralbumcollectors/1/thumbs` |
| `SEL_PAGE_BLOB`, `SEL_LD_JSON`, etc. | DOM selectors |

## Notes

Types are reverse-engineered from Bandcamp's live DOM — Bandcamp can change them without notice.

These types are **intentionally partial**: only properties useful to a consuming project are included. Internal Bandcamp fields (rendering hints, A/B flags, payment config, CAPTCHA keys, etc.) are omitted even when present in the real blob. If you need a field that isn't typed, open an issue or add it directly.
