<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from '../lib/Card.svelte';
  import { fn } from 'storybook/test';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Inputs/Card',
    component: Card,
    tags: ['autodocs'],
    args: {
      onclick: fn(),
    }
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ title: 'Title', subtitle: 'Subtitle' }} />
