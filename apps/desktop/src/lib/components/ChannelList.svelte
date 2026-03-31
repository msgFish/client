<script lang="ts">
  import { goto } from '$app/navigation';
  import { getMe, type Channel } from '$lib/state';
  import { Card } from 'ui';

  interface Props {
    channels: Channel[]
  }

  const {
    channels
  }: Props = $props();

  const me = getMe();
</script>

<div class="space-y-1">
  {#each channels as channel}
    {@const members = [{ did: "test", handle: "test" }]}
    {@const others = members.filter(m => m.did !== me.did)}
    {@const lastMessage = channel.last_message}
    {@const isDM = !channel.collection_lid}

    {@const subtitle = isDM
      ? lastMessage 
          ? `${lastMessage.author_ref === me.did ? 'You' : others[0].handle}: ${lastMessage.text}`
          : '<no history>'
      : undefined
    }

    <Card 
      isChannel={!isDM}
      title={channel.name}
      {subtitle}
      onclick={() => goto(`/app/chat/${channel.collection_lid ?? '@me'}/channel/${channel.tid}`)}
    />
  {/each}
</div>