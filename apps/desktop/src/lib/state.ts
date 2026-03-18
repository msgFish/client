import { getContext, setContext } from 'svelte'

export type MeState = {
  did: string,
  handle: string,
}

export function setMe(state: Partial<MeState>) {
  setContext('me', state);
}

export function getMe() {
  return getContext<MeState>('me');
}

interface Channel {
  members: {
    did: string;
    handle: string;
  }[];
  last_message: {
    lid: string;
    author_did: string;
    text: string | null;
    channel_lid: string;
    sent: Date;
  };
  lid: string;
  type: "text" | "voice";
  name: string | null;
  created: Date | null;
  parent_lid: string | null;
  collection_lid: string | null;
}

export type ChannelState = Channel[];

export function setChannels(state: Partial<ChannelState>) {
  setContext('channel', state);
}

export function getChannels() {
  return getContext<ChannelState>('channel');
}