<script lang="ts">
  import './page.css';

  import { Card, Icon, TextArea } from 'ui';
  import { onMount } from 'svelte';
  import { api, events, json, method } from '$lib/api';
  import { ojoin } from '$lib/object';
  import { getChannels, getMe } from '$lib/state';
  import { page } from '$app/state';

  interface Message {
    lid: string;
    author_did: string;
    text: string | null;
    channel_lid: string;
    sent: Date;
  }

  const me = getMe();

  let selected_channel_lid = $derived(page.params.channel);
  let channels = getChannels();

  let messages = $state<Message[]>([]);

  async function getMessages(channel_lid: string) {
    const res = await api(`/channels/${channel_lid}/messages`);

    if (res.ok) {
      messages = await res.json();
    } else {
      console.log(`${res.status} - ${res.statusText}`);
    }
  }

  $effect(() => {
    if (selected_channel_lid) getMessages(selected_channel_lid);
  });

  onMount(async () => {
    const ws = events();

    ws.onmessage = (e) => {
      const message: {
        type: string,
        data: any
      } = JSON.parse(e.data);

      if (message.type === 'toproto:newMessage') {
        messages.push(message.data);
      }
    }
  })
</script>

{#if !selected_channel_lid && !channels}
  <p></p>
{:else}
  {@const channel = channels.find(c => c.lid === selected_channel_lid)!}

  <div id="content" class="content flex flex-row w-full bg-[#2C2D32]">
    <div class="flex flex-col w-full h-full">
      <div class="channel_header w-full h-12 py-3 px-4">
        <p class="text-sm font-bold line-clamp-1 text-ellipsis">
          {channel.members.filter(m => m.did !== me.did).map(m => m.handle).join(', ')}
        </p>
      </div>

      <div class="flex flex-col h-full pb-4 justify-end overflow-y-auto">
        {#each messages as message, i}
          {@const isPrevAuthor = (messages.at(i - 1)?.author_did === message.author_did) && (i !== 0)}

          <div class={[
            "flex flex-col w-full h-auto px-4 space-y-1 hover:bg-[#44454D]",
            isPrevAuthor ? 'mt-1' : 'mt-4'
          ]}>
            {#if !isPrevAuthor}
              <p class="text-xs font-bold text-gray-400 overflow-hidden text-ellipsis">
                {channel.members.find(m => m.did == message.author_did)?.handle}
              </p>
            {/if}

            <p class="text-sm">{message.text}</p>
          </div>
        {/each}
      </div>

      <form 
        class="px-1.5 pb-1.5"
        onsubmit={async (e) => {
          e.preventDefault();

          const data = new FormData(e.currentTarget);
          const text = data.get('message')?.toString();

          if (!text) return;

          e.currentTarget.reset();

          const res = await api(
            `/channels/${channel.lid}`,
            ojoin(method('POST'), json({ text }))
          );

          if (res.ok) {
            const message = await res.json()
            messages.push(message);
            channel.last_message = message;
          } else {
            console.log(`${res.status} - ${res.statusText}`);
          }
        }}
      >
        <TextArea 
          class="w-full"
          name="message"
          minlength={1}
          placeholder="Say something..."
        />
      </form>
    </div>

    <div class="member_list flex flex-col w-100 px-1.5 py-2 space-y-2">
      <div class="flex flex-row px-1 justify-between text-gray-400">
        <p class="text-xs font-semibold">Members — {channel.members.length}</p>

        <button class="cursor-pointer">
          <Icon icon='plus' size={15} strokeWidth={2.5} />
        </button>
      </div>

      <div class="space-y-1">
        {#each channel.members as member}
          <Card thin title={member.handle} />
        {/each}
      </div>
    </div>
  </div>
{/if}