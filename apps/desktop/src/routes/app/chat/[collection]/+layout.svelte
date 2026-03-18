<script lang="ts">
  import './page.css';
  import fishLogoGrayscale from '$assets/fish_logo_grayscale.svg';

  import { Card, Icon } from 'ui';
  import { onMount } from 'svelte';
  import { api } from '$lib/api';
  import { getMe, setChannels } from '$lib/state';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

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
  
  const {
    children
  } = $props();

  let me = getMe();
  let selected_collection_lid = $derived(page.params.collection);
  let selected_channel_lid = $derived(page.params.channel);

  let channels = $state<Channel[] | null>(null);

  $effect(() => {
    if (channels) setChannels(channels);
  });

  onMount(async () => {
    const res = await api(`/collections/${selected_collection_lid}/channels`);

    if (res.ok) {
      channels = await res.json();
    } else {
      console.log(`${res.status} - ${res.statusText}`);
    }
  })
</script>

<div class="channel_list flex flex-col w-70 min-w-70 h-[fill] px-1.5 pt-2 pb-1.5 space-y-2">
  <div class="flex flex-row px-1 justify-between text-gray-400">
    <p class="text-xs font-semibold">Direct Messages</p>

    <button class="cursor-pointer">
      <Icon icon='plus' size={15} strokeWidth={2.5} />
    </button>
  </div>

  <div class="flex flex-col h-full justify-between">
    {#if channels}
      <div class="space-y-1">
        {#each channels as channel}
          {@const members = channel.members}
          {@const others = members.filter(m => m.did !== me.did)}
          {@const lastMessage = channel.last_message}

          <Card 
            title={others.map(m => m.handle).join(', ')} 
            subtitle={members.length < 3
              ? `${lastMessage.author_did === me.did ? 'You' : others[0].handle}: ${lastMessage.text}`
              : `${channel.members.length} member(s)`
            }
            onclick={() => goto(`/app/chat/${selected_collection_lid}/channel/${channel.lid}`)}
          />
        {/each}
      </div>
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