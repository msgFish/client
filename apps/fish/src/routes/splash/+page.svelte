<script lang="ts">
  import fishLogoGrayscale from '$assets/fish_logo_grayscale.svg';

  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';

  onMount(() => {
    setTimeout(() => {
      invoke('set_complete', { task: 'frontend' });
    }, 3000)
  });
</script>

<main data-tauri-drag-region class="flex w-full h-full select-none flex-col justify-center items-center space-y-7.5">
  <img class="relative animate-[fish-spin_1.5s_ease-in-out_infinite]" alt="fish" src={fishLogoGrayscale}/>
  <p class="text-sm font-semibold">Loading fish...</p>
</main>