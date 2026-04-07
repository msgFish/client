import { createDidResolver, createHandleResolver, type Did } from '@atproto/oauth-client-node';

export function normalize(uri: string) {
  const u = new URL(uri);
  u.hash = '';
  return u.toString();
}

export async function resolveClientMetadata(uri: string) {
  const res = await fetch(normalize(uri));
  if (!res.ok) return null;

  return await res.json();
}

export async function resolveDid(did: Did) {
  return await createDidResolver({}).resolve(did);
}

export async function resolveDidByHandle(handle: string) {
  const did = await createHandleResolver({ handleResolver: 'https://public.api.bsky.app' }).resolve(handle);
  if (!did) return null;

  return resolveDid(did);
}