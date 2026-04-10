<script lang="ts">
  import './textinput.css';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    placeholder?: string;
    onsubmit?: () => void;
  }

  let { 
    placeholder, 
    value = $bindable(),
    class: className, 
    ...props 
  }: Props = $props();

  let input!: HTMLInputElement;
</script>

<input
  bind:this={input}
  class={["storybook-textinput", className]}
  {placeholder}
  bind:value
  {...props}

  onkeydown={(e) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        input.blur();

        break;
    }
  }}
/>
