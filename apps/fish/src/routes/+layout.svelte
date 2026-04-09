<script lang="ts">
  import { onMount } from 'svelte';
  import { platform } from '@tauri-apps/plugin-os';
  import './index.css';

  const { children } = $props();

  onMount(() => {
    if (platform() === 'macos') document.documentElement.style.setProperty('border-radius', '12px');
  })
</script>

{@render children?.()}