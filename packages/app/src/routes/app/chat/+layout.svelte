<script lang="ts">
  import fishLogoGrayscale from '$assets/fish_logo_grayscale.svg';
  import fishLogo from '$assets/fish_logo.svg';

  import { onMount } from 'svelte';
  import { api } from '$lib/api';
  import { goto } from '$app/navigation';
  import { setStoredProperty } from '$lib/storage';
  import { setMe, type MeState } from '$lib/state';

  const {
    children
  } = $props();

  let loaded = $state(false);
  let me = $state<Partial<MeState>>({});
    
  let collections = $state<null>(null);

  $effect(() => {
    setMe(me);
  });

  onMount(async () => {
    try {
      const res = await api('/users/@me');

      if (res.ok) {
        const data = await res.json();
        me.did = data.did;
        me.handle = data.handle;

        setStoredProperty('last_handle', me.handle!);

        loaded = true;

        return;
      }
    } catch {}

    goto('/app/login');

    const res = await api('/collections');

    if (res.ok) {
      collections = await res.json();
    } else {
      console.log(`${res.status} - ${res.statusText}`);
    }
  })
</script>

<main class="flex flex-row w-full h-full min-h-0 flex-1 py-0.5">
  {#if !loaded}
    <div class="flex justify-center items-center w-full h-full">
      <img class="relative -top-5 animate-[fish-spin_1.5s_ease-in-out_infinite]" alt="fish" src={fishLogoGrayscale}/>
    </div>
  {:else}
    <div id="server_list" class="w-18 h-full flex flex-col px-3.5 py-1.5">
      <button class="relative w-8.75 h-8.75 cursor-pointer">
        {#each [fishLogoGrayscale, fishLogo] as image, i}
          <img 
            class={[
              "absolute top-0 transition-opacity duration-150",
              i === 0
                ? "hover:opacity-0"
                : "opacity-0 hover:opacity-100"
            ]}
            src={image} 
            width="100%"
            alt="Home Icon"
          />
        {/each}
      </button>
    </div>

    {@render children?.()}
  {/if}
</main>