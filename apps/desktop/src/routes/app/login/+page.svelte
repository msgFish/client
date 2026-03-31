<script lang="ts">
  import fishLogo from '$assets/fish_logo.svg';

  import { api, json, method } from '$lib/api';
  import { ojoin } from '$lib/object';
  import { getStoredProperty, setStoredProperty } from '$lib/storage';
  import { openUrl } from '@tauri-apps/plugin-opener';
  import { Button, Icon, TextInput } from "ui";

  let error = $state<string | null>(null);
  let last_server = $state(getStoredProperty('server'));
  let last_handle = $state(getStoredProperty('last_handle'));

  let handle = $state<string | null>(null);
</script>

<main class="flex flex-col w-full h-full justify-center items-center space-y-20">
  <img alt="fish" src={fishLogo} />

  {#if !handle}

    <form 
      class="flex flex-col relative -top-5 w-90 space-y-10"
      onsubmit={async (e) => {
        e.preventDefault();

        const h = new FormData(e.currentTarget).get('handle')?.toString();
        if (!h) return;

        handle = h;
      }}
    >
      <div class="flex flex-col  space-y-4">
        <div class="flex flex-row space-x-3">
          <TextInput 
            required 
            value={last_handle}
            name="handle" 
            type="text" 
            class="w-full" 
            placeholder="example.bsky.social" 
            autocomplete="off" 
          />

          <Button primary type="submit">
            <Icon icon='arrow' />
          </Button>
        </div>
      </div>

      {#if error}
        <p class="text-red-400">{error}</p>
      {/if}
    </form>

  {:else}

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
          '/duc/oauth/login',
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
      <div class="flex flex-col space-y-4">
        <fieldset class="flex flex-col space-y-2">
          <p class="text-sm text-gray-500">server</p>
          
          <div class="flex flex-row space-x-3">
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

            <Button primary type="submit">
              Login
            </Button>
          </div>
        </fieldset>
      </div>

      {#if error}
        <p class="text-red-400">{error}</p>
      {/if}
    </form>

  {/if}
</main>