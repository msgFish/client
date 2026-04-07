  import { xrpc as xrpcFetch } from '@atproto/lex';
import { getStoredProperty } from './storage';

export function events() {
  const server = getStoredProperty('server');
  const token = getStoredProperty('token');
  if (!server || !token) throw new Error('Failed to initialize websocket');

  const host = server.startsWith('http://')
    ? server.replace('http://', 'ws://')
    : server.replace('https://', 'wss://');

  const url = new URL('/streams/events', host);
  url.searchParams.set('___authorization', token);

  return new WebSocket(url);
}

export async function api(path: string, init?: RequestInit): Promise<Response> {
  const server = getStoredProperty('server');
  const token = getStoredProperty('token');

  if (!server) throw new Error("Invalid connection url");

  return fetch(new URL(path, server), {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ` + token,
    }
  });
}

export async function xrpc<P extends Parameters<typeof xrpcFetch>>(
  ns: P[1],
  options: P[2]
) {
  const server = getStoredProperty('server');
  if (!server) throw new Error("no server specified");

  return xrpcFetch(server, ns, options);
}

export function method(method: string) {
  return {
    method
  } satisfies RequestInit
}

export function json(data: unknown) {
  return {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  } satisfies RequestInit
}