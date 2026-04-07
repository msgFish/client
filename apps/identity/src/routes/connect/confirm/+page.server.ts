import { resolveClientMetadata } from '$lib/atproto.js';
import { error } from '@sveltejs/kit';

export async function load({ url, locals }) {
  const client_id = url.searchParams.get('client_id');
  const redirect_uri = url.searchParams.get('redirect_uri');
  const scope = url.searchParams.get('scope');
  const state = url.searchParams.get('state');

  if (!client_id || !redirect_uri) {
    throw error(400, 'Invalid OAuth request');
  }

  const client_url = new URL(client_id);
  if (client_url.protocol !== 'https:' && url.hostname !== 'localhost') {
    throw error(400, 'Invalid client_id');
  }

  const client = await resolveClientMetadata(client_id);
  if (!client) throw error(400, 'Invalid client_id');

  if (!client.redirect_uris.includes(redirect_uri)) {
    throw error(400, 'Invalid redirect_uri');
  }

  if (!client.client_name) {
    throw error(400, 'Invalid client_name');
  }

  return {
    client,
    scope,
    state,
    redirect_uri
  };
}