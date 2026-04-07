<script lang="ts">
  import './toggle.css';
  import Icon from '../Icon.svelte';

  interface Props {
    aria: string
    state?: boolean
  }

  let {
    aria,
    state = $bindable(false),
  }: Props = $props();
</script>

<button
  aria-label={aria}
  class='storybook-toggle'
  onclick={() => state = !state}
>
  <div 
    class={[state ? 'success' : 'danger']}
  >
    {#if !state}
      <Icon icon='x'/>
    {:else}
      <Icon icon='check'/>
    {/if}
  </div>
</button>
