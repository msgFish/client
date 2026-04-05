import tailwindcss from '@tailwindcss/vite';
import type { StorybookConfig } from '@storybook/sveltekit';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  core: {
    disableTelemetry: true
  },
  
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],

  addons: [
    "@storybook/addon-svelte-csf",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],

  framework: "@storybook/sveltekit",

  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tailwindcss()],
    });
  },
};
export default config;