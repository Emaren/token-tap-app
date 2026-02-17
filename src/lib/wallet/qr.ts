export function encodeAddressToQrPayload(address: string) {
  return `tokentap:${address}`
}

export function decodeQrPayload(payload: string) {
  if (payload.startsWith('tokentap:')) return payload.slice('tokentap:'.length)
  return payload
}
