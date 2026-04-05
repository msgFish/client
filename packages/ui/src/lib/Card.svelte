<script lang="ts">
  import './card.css';

  import type { HTMLButtonAttributes } from 'svelte/elements';
  import Icon from './Icon.svelte';

  interface Props extends HTMLButtonAttributes {
    title: string
    subtitle?: string
    isChannel?: boolean
    thin?: boolean
  }

  let {
    title,
    subtitle,
    isChannel,
    thin,
    ...props
  }: Props = $props();
</script>

<button 
  class={[
    "storybook-card",
    thin ? 'thin' : undefined
  ]}
  {...props}
>
  <div class="title">
    {#if isChannel}<Icon icon="hash" size={18} />{/if}
    <p class="ellipsis">{title}</p>
  </div>

  {#if subtitle}
    <p class="subtitle ellipsis">{subtitle}</p>
  {/if}
</button>