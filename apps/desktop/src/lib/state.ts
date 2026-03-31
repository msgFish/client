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

export interface Channel {
  last_message: {
    tid: string;
    author_ref: string;
    text: string | null;
    channel_ref: string;
    sent: Date;
  };
  tid: string;
  type: "text" | "voice";
  name: string;
  created: Date | null;
  parent_ref: string | null;
  collection_lid: string | null;
}

export type ChannelState = Channel[];

export function setChannels(state: Partial<ChannelState>) {
  setContext('channel', state);
}

export function getChannels() {
  return getContext<ChannelState>('channel');
}