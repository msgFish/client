<script lang="ts">
  import './uncertaintoggle.css';
  import Icon from '../Icon.svelte';

  interface Props {
    state?: -1 | 0 | 1
    uncertain?: boolean
  }

  let {
    uncertain,
    state = $bindable(uncertain ? 0 : -1),
  }: Props = $props();
</script>

<div
  class='storybook-uncertaintoggle'
>
  <button class={[state === -1 ? 'danger' : undefined]} onclick={() => state = -1}><Icon icon='x'/></button>
  
  {#if uncertain}
    <button class={[state === 0 ? 'warning' : undefined]} onclick={() => state = 0}><Icon icon='slash'/></button>
  {/if}

  <button class={[state === 1 ? 'success' : undefined]} onclick={() => state = 1}><Icon icon='check'/></button>
</div>
