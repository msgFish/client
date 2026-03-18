<script lang="ts">
  import './card.css';

  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    title: string
    subtitle?: string
    thin?: boolean
  }

  let {
    title,
    subtitle,
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
  <p class="text-sm font-medium line-clamp-1 text-ellipsis whitespace-nowrap wrap-anywhere">{title}</p>

  {#if subtitle}
    <p class="subtitle font-medium line-clamp-1 text-ellipsis whitespace-nowrap wrap-anywhere">{subtitle}</p>
  {/if}
</button>