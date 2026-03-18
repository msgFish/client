<script lang="ts">
  import './textarea.css';
  import { onMount } from 'svelte';
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  interface Props extends HTMLTextareaAttributes {
    placeholder?: string;
    onsubmit?: () => void;
  }

  let { 
    value = $bindable(),
    placeholder, 
    class: className, 
    ...props 
  }: Props = $props();

  let textarea!: HTMLTextAreaElement;

  const onUpdate = (element: HTMLTextAreaElement) => {
    // ref: https://stackoverflow.com/a/48460773
    element.style.height = "";
    element.style.height = element.scrollHeight + "px";
  };

  onMount(() => {
    if (textarea) onUpdate(textarea);
  });
</script>

<div
  class={["storybook-textarea", className]}
>
  <div></div>
  
  <div>
    <textarea
      bind:this={textarea}
      bind:value={value}
      {placeholder}
      {...props}

      onkeydown={(e) => {
        switch (e.key) {
          case "Enter":
            if (!e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
              onUpdate(e.currentTarget);
            }

            break;
          
          case "Escape":
            e.preventDefault();
            textarea.blur();

            break;
        }
        
      }}

      oninput={(e) => onUpdate(e.currentTarget)}
    ></textarea>
  </div>

  <div></div>
</div>
