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
    "card text-gray-400",
    thin ? 'h-9' : 'h-10'
  ]}
  {...props}
>
  <div class="title">
    {#if isChannel}<Icon icon="hash" size={18} />{/if}
    <p class="text-sm font-medium line-clamp-1 text-ellipsis whitespace-nowrap wrap-anywhere">{title}</p>
  </div>

  {#if subtitle}
    <p class="subtitle font-medium line-clamp-1 text-ellipsis whitespace-nowrap wrap-anywhere">{subtitle}</p>
  {/if}
</button>