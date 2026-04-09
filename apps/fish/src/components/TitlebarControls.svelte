<script lang="ts">
  import './TitlebarControls.css';
  import { platform } from '@tauri-apps/plugin-os';
  import { getCurrentWindow } from '@tauri-apps/api/window';
  import { onMount } from 'svelte';

  const appWindow = $state(getCurrentWindow());

  let currentPlatform = $state(platform());
  let isFocused = $state(false);
  let isMaximized = $state(false);
  let isFullscreen = $state(false);

  onMount(async () => {
    appWindow.listen('tauri://blur', () => isFocused = false);
    appWindow.listen('tauri://focus', () => isFocused = true);

    appWindow.listen('tauri://resize', async () => {
      isMaximized = await appWindow.isMaximized();
      isFullscreen = await appWindow.isFullscreen();
    });

    isMaximized = await appWindow.isMaximized();
    isFocused = await appWindow.isFocused();
    isFullscreen = await appWindow.isFullscreen();
  })
</script>

{#if currentPlatform === 'macos'}
  <!-- MacOS -->
  {#if !isFullscreen}
    <div class="titlebar-controls left-2.5 space-x-2">
      <!-- Close -->
      <button 
        aria-label="close" 
        class={[
          'w-3 h-3 rounded-full',
          isFocused ? 'bg-red-400' : 'bg-gray-700',
        ]}
        onclick={() => appWindow.close()}
      ></button>

      <!-- Minimize -->
      <button 
        aria-label="minimize" 
        class={[
          'w-3 h-3 rounded-full',
          isFocused ? 'bg-yellow-400' : 'bg-gray-700'
        ]}
        onclick={() => appWindow.minimize()}
      ></button>

      <!-- Fullscreen -->
      <button 
        aria-label="fullscreen" 
        class={[
          'w-3 h-3 rounded-full',
          isFocused ? 'bg-green-400' : 'bg-gray-700'
        ]}
        onclick={() => appWindow.setFullscreen(!isFullscreen)}
      ></button>
    </div>
  {/if}
{:else}
  <!-- Not MacOS -->
  <div class="titlebar-controls right-0">
    <!-- Close -->
    <button 
      aria-label="close" 
      class='h-7.5 w-11 px-4.25 hover:bg-[#ffffff20]'
      onclick={() => appWindow.close()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
        <path d="M2048 819v205H0V819h2048z" fill="currentColor"></path>
      </svg>
    </button>

    {#if isMaximized}
      <!-- Maximize -->
        <button 
        aria-label="maximize" 
        class='h-7.5 w-11 px-4 hover:bg-[#ffffff20]'
        onclick={() => appWindow.toggleMaximize()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
          <path d="M2048 1638h-410v410H0V410h410V0h1638v1638zM1434 614H205v1229h1229V614zm409-409H614v205h1024v1024h205V205z" fill="currentColor"></path>
        </svg>
      </button>
    {:else}
      <!-- Restore -->
      <button 
        aria-label="maximize" 
        class='h-7.5 w-11 px-3.75 hover:bg-[#ffffff20]'
        onclick={() => appWindow.toggleMaximize()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
          <path d="M1792 128v1664H128V128h1664zm-128 128H256v1408h1408V256z" fill="currentColor"></path>
        </svg>
      </button>
    {/if}

    <!-- Minimize -->
    <button 
      aria-label="minimize" 
      class='h-7.5 w-11 px-4.25 hover:bg-red-500'
      onclick={() => appWindow.minimize()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
        <path d="M1169 1024l879 879-145 145-879-879-879 879L0 1903l879-879L0 145 145 0l879 879L1903 0l145 145-879 879z" fill="currentColor"></path>
      </svg>
    </button>
  </div>
{/if}