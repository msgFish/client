<script lang="ts">
  import './page.css';
  import fishLogoGrayscale from '$assets/fish_logo_grayscale.svg';

  import { Card, Icon } from 'ui';
  import { onMount } from 'svelte';
  import { api } from '$lib/api';
  import { getMe, setChannels, type Channel } from '$lib/state';
  import { page } from '$app/state';
  import { afterNavigate, goto } from '$app/navigation';
  import ChannelList from '$lib/components/ChannelList.svelte';
  
  const {
    children
  } = $props();

  let me = getMe();
  let selected_collection_lid = $derived(page.params.collection);
  let selected_channel_lid = $derived(page.params.channel);

  let channels = $state<Channel[] | null>(null);

  async function getChannels() {
    const res = await api(`/collections/${selected_collection_lid}/channels`);

    if (res.ok) {
      channels = await res.json();
    } else {
      console.log(`${res.status} - ${res.statusText}`);
    }
  }

  $effect(() => {
    if (channels) setChannels(channels);
  });

  afterNavigate(getChannels);
  onMount(getChannels);
</script>

<div class="channel_list flex flex-col w-70 min-w-70 h-[fill] px-1.5 pt-2 pb-1.5 space-y-2">
  {#if selected_collection_lid === '@me'}
    <div class="flex flex-row px-1 justify-between text-gray-400">
      <p class="text-xs font-semibold">Direct Messages</p>

      <button class="cursor-pointer">
        <Icon icon='plus' size={15} strokeWidth={2.5} />
      </button>
    </div>
  {/if}

  <div class="flex flex-col h-full justify-between">
    {#if channels}
      <ChannelList {channels} />
    {/if}

    <div class="w-full h-13 flex flex-row items-center px-3 bg-[#2F3036] rounded-md border border-[#FFFFFF05]">
      <div class="flex flex-col">
        <p class="text-xs font-semibold">{me.handle}</p>
        <p class="text-[10px] text-gray-400">{me.did}</p>
      </div>
    </div>
  </div>
</div>

{#if !channels}
  <div class="flex justify-center items-center w-full h-full bg-[#2C2D32]">
    <img class="relative -top-5 animate-[fish-spin_1.5s_ease-in-out_infinite]" alt="fish" src={fishLogoGrayscale}/>
  </div>
{:else}
  {@render children?.()}
{/if}