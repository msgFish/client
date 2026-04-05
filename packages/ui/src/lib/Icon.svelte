<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  export const icons = {
    arrow: `
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    `,
    trash: `
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    `,
    edit: `
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    `,
    message: `
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    `,
    upload: `
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    `,
    bell: `
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    `,
    plus: `
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    `,
    hash: `
      <line x1="4" y1="9" x2="20" y2="9"></line>
      <line x1="4" y1="15" x2="20" y2="15"></line>
      <line x1="10" y1="3" x2="8" y2="21"></line>
      <line x1="16" y1="3" x2="14" y2="21"></line>
    `,
    check: `
      <polyline points="20 6 9 17 4 12"></polyline>
    `,
    x: `
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    `,
    slash: `
      <path d="M15 4.5L8.5 18.5"/>
    `
  }

  interface Props extends HTMLAttributes<SVGElement> {
    icon: keyof typeof icons
    size?: number
    strokeWidth?: number
  }

  const { 
    icon, 
    size = 20, 
    strokeWidth = 2,
    ...others
  }: Props = $props();
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width={size} height={size} 
  viewBox="0 0 24 24"
  fill="none" 
  stroke="currentColor" 
  stroke-width={strokeWidth}
  stroke-linecap="round" 
  stroke-linejoin="round"

  {...others}
>
  {@html icons[icon]}
</svg>