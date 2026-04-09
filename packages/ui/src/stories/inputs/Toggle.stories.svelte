<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Toggle from '$lib/inputs/Toggle.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Inputs/Toggle',
    component: Toggle,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Regular" />