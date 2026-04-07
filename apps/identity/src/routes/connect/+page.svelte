<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, TextInput } from 'ui';

</script>
<main class="w-full h-full flex flex-col justify-center items-center">
  <form method="POST" use:enhance>
    <TextInput placeholder="user.example.com" />
    <Button>Login</Button>
  </form>
</main>