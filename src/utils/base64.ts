export function base64ToUint8Array(base64: string) {
  if (!base64) {
    throw new Error('Missing base64 data');
  }

  if (typeof Buffer !== 'undefined') {
    return Uint8Array.from(Buffer.from(base64, 'base64'));
  }

  const binary =
    typeof atob === 'function'
      ? atob(base64)
      : globalThis.atob
        ? globalThis.atob(base64)
        : (() => {
            throw new Error('No base64 decoder available in this environment');
          })();

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
