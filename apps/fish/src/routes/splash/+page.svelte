<script lang="ts">
  import fishLogoGrayscale from '$assets/fish_logo_grayscale.svg';

  import { check, Update } from '@tauri-apps/plugin-updater';
  import { relaunch } from '@tauri-apps/plugin-process';
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';

  let isDev = import.meta.env.DEV;

  let isUpdating = $state(false);
  let isDownloading = $state(false);
  let downloadedBytes = $state(0);
  let totalBytes = $state<number | undefined>(0);

  onMount(async () => {
    if (!isDev) {
      let update: Update | null = null;

      try {
        update = await check();
      } catch {}

      if (update) {
        isUpdating = true;
        isDownloading = true;

        let contentLength: number | undefined = 0;
        // alternatively we could also call update.download() and update.install() separately
        await update.download((event) => {
          switch (event.event) {
            case 'Started':
              totalBytes = event.data.contentLength;
              console.log(`started downloading ${event.data.contentLength} bytes`);
              break;
            case 'Progress':
              downloadedBytes += event.data.chunkLength;
              console.log(`downloaded ${downloadedBytes} from ${contentLength}`);
              break;
            case 'Finished':
              console.log('download finished');
              break;
          }
        });

        isDownloading = false;
        await update.install();

        return await relaunch();
      }
    }

    invoke('set_complete', { task: 'frontend' });
  });
</script>

<main data-tauri-drag-region class="flex w-full h-full select-none flex-col justify-center items-center space-y-7.5">
  <img class="relative animate-[fish-spin_1.5s_ease-in-out_infinite]" alt="fish" src={fishLogoGrayscale}/>
  
  {#if isUpdating}
    {#if isDownloading}
      <div class='w-full flex flex-col items-center space-y-4'>
        <p class="text-sm font-semibold">Downloading {downloadedBytes}/{totalBytes ?? '?'}</p>

        <div class='w-6/10 h-1.5 rounded-full overflow-hidden bg-gray-700'>
          <div class={`w-${totalBytes ? downloadedBytes / totalBytes : 0}/100 h-full bg-white`}></div>
        </div>
      </div>
    {:else}
      <p class="text-sm font-semibold">Installing</p>
    {/if}
  {:else}
    <p class="text-sm font-semibold">Checking for updates...</p>
  {/if}
</main>