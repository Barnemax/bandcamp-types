/** True when the user is logged in (no login link visible). */
export function isUserConnected(): boolean {
  return document.querySelector('.login-link') === null
}

export function isDownloadPage(): boolean {
  return document.querySelector('.download-info-container.has-downloads') !== null
}

export function isAccountPage(): boolean {
  return document.querySelector('.fan-bio-inner') !== null
}

export function isAlbumPage(): boolean {
  return document.querySelector('.tralbum-page') !== null
}

export function isArtistPage(): boolean {
  return document.querySelector('#band-navbar, #bio-container') !== null && !isAlbumPage()
}

export function isRelevantPage(): boolean {
  return isAccountPage() || isAlbumPage() || isDownloadPage() || isArtistPage()
}
