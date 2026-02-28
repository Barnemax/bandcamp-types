/** 'a' = album, 't' = track */
export type TralbumType = 'a' | 't'

/** Per-track info from the Tralbum API or `data-tralbum` attribute. */
export interface TralbumTrackInfo {
  id: number
  track_id: number
  title: string
  artist: string | null
  track_num: number
  duration: number
  file: Record<string, string> | null
  title_link: string
  streaming: number
  is_downloadable: boolean
  has_lyrics: boolean
  lyrics: string | null
  play_count: number
  is_capped: boolean
  album_preorder: boolean
  unreleased_track: boolean
}
