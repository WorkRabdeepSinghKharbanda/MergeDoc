export function base64Encode(text: string): string {
  return btoa(unescape(encodeURIComponent(text)))
}

export function base64Decode(text: string): string {
  return decodeURIComponent(escape(atob(text)))
}

export function urlEncode(text: string): string {
  return encodeURIComponent(text)
}

export function urlDecode(text: string): string {
  return decodeURIComponent(text)
}
