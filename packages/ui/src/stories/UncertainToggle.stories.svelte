<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import UncertainToggle from '../lib/inputs/UncertainToggle.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Inputs/UncertainToggle',
    component: UncertainToggle,
    tags: ['autodocs'],
    argTypes: {
      uncertain: { control: 'boolean' }
    }
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Regular" />

<Story name="Uncertain" args={{ uncertain: true }} />