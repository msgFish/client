<script lang="ts">
  import './uncertaintoggle.css';
  import Icon from '../Icon.svelte';

  interface Props {
    state?: -1 | 0 | 1
  }

  let {
    state = $bindable(0),
  }: Props = $props();
</script>

<div
  class='storybook-uncertaintoggle'
>
  <div 
    class={state === -1
      ? 'danger'
      : state === 0
        ? 'warning'
        : 'success'
    }
  ></div>

  <button class={[state === -1 ? 'active' : undefined]} onclick={() => state = -1}><Icon icon='x'/></button>
  <button class={[state === 0 ? 'active' : undefined]} onclick={() => state = 0}><Icon icon='slash'/></button>
  <button class={[state === 1 ? 'active' : undefined]} onclick={() => state = 1}><Icon icon='check'/></button>
</div>
