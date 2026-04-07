import { resolveDidByHandle } from '$lib/atproto.js';
import { redirect } from '@sveltejs/kit';

export async function POST({ request }) {
  const data = await request.formData();
  const handle = data.get('handle') as string;

  if (!handle) throw new Error("invalid handle");

  const doc = await resolveDidByHandle(handle);
  if (!doc) throw new Error("invalid handle");

  const service = doc.service?.find(
    (s) => s.id === '#atproto_pds'
  );
  if (!service) throw new Error('no PDS service found');

  return redirect(302, '');
}