<script lang="ts">
  import { api, json, method } from '$lib/api';
  import { ojoin } from '$lib/object';
  import { getStoredProperty, setStoredProperty } from '$lib/storage';
  import { openUrl } from '@tauri-apps/plugin-opener';
  import { Button, TextInput } from "ui";

  let error = $state<string | null>(null);
  let last_server = $state(getStoredProperty('server'));
  let last_handle = $state(getStoredProperty('last_handle'));
</script>

<main class="flex w-full h-full justify-center items-center">
  <form 
    class="flex flex-col relative -top-5 w-90 space-y-10"
    onsubmit={async (e) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);
      let server = data.get('server')?.toString();
      const handle = data.get('handle')?.toString();

      if (!server || !handle) return;

      if (!server.startsWith('http://') && !server.startsWith('https://')) {
        if (server.startsWith('localhost') || server.startsWith('127.0.0.1'))
          server = 'http://' + server;
        else
          server = 'https://' + server;
      }

      setStoredProperty('server', server);
      
      const res = await api(
        '/oauth/login',
        ojoin(method('POST'), json({ 
          handle,
          redirect_uri: 'msgfish:///session'
        }))
      );

      if (res.ok) {
        const data = await res.json();
        openUrl(data.href);
      }
    }}
  >
    <h1 class="text-center text-2xl">Connect to a Network</h1>

    <div class="flex flex-col space-y-4">
      <fieldset class="flex flex-col space-y-2">
        <p class="text-sm text-gray-500">server</p>
        <TextInput 
          required
          value={last_server}
          name="server" 
          type="text"
          class="w-full" 
          placeholder="https://scs.msg.fish" 
          autocorrect="off"
          autocomplete="off" 
        />
      </fieldset>

      <fieldset class="flex flex-col space-y-2">
        <p class="text-sm text-gray-500">handle</p>
        <TextInput 
          required 
          value={last_handle}
          name="handle" 
          type="text" 
          class="w-full" 
          placeholder="example.bsky.social" 
          autocomplete="off" 
        />
      </fieldset>
    </div>

    {#if error}
      <p class="text-red-400">{error}</p>
    {/if}

    <Button primary type="submit">Login</Button>
  </form>
</main>