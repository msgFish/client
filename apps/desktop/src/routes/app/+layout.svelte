<script lang="ts">
  import { onOpenUrl } from '@tauri-apps/plugin-deep-link';
  import './app.css';
  import { setStoredProperty } from '$lib/storage';
  import { goto } from '$app/navigation';

  const {
    children
  } = $props();

  onOpenUrl(([u]) => {
    console.log(u);
    const url = new URL(u);

    if (url.pathname.startsWith('/session')) {
      const token = url.searchParams.get('token');
      if (!token) return;

      setStoredProperty('token', token);
      goto('/app/chat');
    }
  });
</script>

<main class="flex flex-col w-full h-full min-h-0">
  <div data-tauri-drag-region class="titlebar">
    <p data-tauri-drag-region class="text-xs font-bold">Fish</p>
  </div>

  {@render children?.()}
</main>
