<script lang="ts">
  import fishLogoGrayscale from '$assets/fish_logo_grayscale.svg';
  import { Button, Icon, TextInput } from 'ui';

  const DEFAULT_SERVER = "https://msg.fish";

  let fixedServer = $state(true);
  let server = $state(DEFAULT_SERVER);
</script>

<main class="relative w-full h-full flex flex-row justify-center items-center space-x-30">
  <div class="flex flex-col items-center space-y-5">
    <img width={150} alt="fish" src={fishLogoGrayscale}/>
    <h1 class="text-2xl font-bold">blub glub glub</h1>
  </div>

  <form class="w-75 flex flex-col space-y-10">
    <h1 class="text-3xl font-bold">Login</h1>

    <fieldset class="flex flex-col space-y-4">
      <fieldset>
        <p class="text-sm text-gray-500">handle</p>
        <TextInput class="w-full" placeholder="example.bsky.social" />
      </fieldset>

      <fieldset>
        <p class="text-sm text-gray-500">server</p>
        
        <div class="flex flex-row space-x-2">
          <TextInput class="w-full" disabled={fixedServer} bind:value={server} />

          <Button onclick={() => {
            fixedServer = !fixedServer;
            if (fixedServer) server = DEFAULT_SERVER;
          }}>
            <Icon icon='edit' />
          </Button>
        </div>
      </fieldset>
    </fieldset>

    <Button primary>Connect</Button>
  </form>
</main>