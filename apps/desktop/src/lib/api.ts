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