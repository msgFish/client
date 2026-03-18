<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Icon from '$lib/Icon.svelte';
  import { fn } from 'storybook/test';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Inputs/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
      icon: {
        control: { type: 'select' },
        options: ['arrow'],
      },
    },
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Arrow" args={{ icon: 'arrow' }} />