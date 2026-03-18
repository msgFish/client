<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import './button.css';

  interface Props extends HTMLButtonAttributes {
    primary?: boolean;
    backgroundColor?: string;
    size?: 'small' | 'medium' | 'large';
    label?: string;
    children: any;
    onclick?: () => void;
  }

  const { 
    primary = false, 
    backgroundColor, 
    size = 'medium', 
    label,
    class: className,
    children, 
    ...props 
  }: Props = $props();
  
  let mode = $derived(primary ? 'storybook-button--primary' : 'storybook-button--secondary');
  let style = $derived(backgroundColor ? `background-color: ${backgroundColor}` : '');
</script>

<button
  type="button"
  class={['storybook-button', `storybook-button--${size}`, mode, className].join(' ')}
  {style}
  {...props}
>
  {#if label}
    {label}
  {:else}
    {@render children?.()}
  {/if}
</button>
