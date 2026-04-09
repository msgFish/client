<script lang="ts">
  import TitlebarControls from '../../components/TitlebarControls.svelte';
import './app.css';

  const {
    children
  } = $props();

  
</script>

<main class="flex flex-col w-full h-full min-h-0">
  <div data-tauri-drag-region class="titlebar">
    <TitlebarControls />

    <p data-tauri-drag-region class="text-xs font-bold">Fish</p>
  </div>

  {@render children?.()}
</main>