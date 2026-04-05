<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Toggle from '../lib/Toggle.svelte';
  import { fn } from 'storybook/test';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Inputs/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    argTypes: {
      uncertain: { control: 'boolean' }
    }
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Regular" />

<Story name="Uncertain" args={{ uncertain: true }} />