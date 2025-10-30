/**
 * @file color-theme.ts
 * @purpose Defines application theme variables for light and dark modes.
 * These tokens provide unified color values for surfaces, text, icons,
 * borders, overlays, category colors, and fallback visual elements.
 */

import { vars } from 'nativewind';

/**
 * Theme configuration containing semantic color tokens
 * for both light and dark modes.
 *
 * @property light Tokens for light mode
 * @property dark Tokens for dark mode
 */
export const themes = {
  light: vars({
    /* Base surfaces */
    '--color-bg-default': '#FFFFFF', // primary surface
    '--color-bg-secondary': '#F4F4F5', // secondary surface
    '--color-bg-tertiary': '#FAFAFA', // tertiary surface

    /* Text */
    '--color-text-primary': '#18181B', // main text
    '--color-text-secondary': '#4B5563', // secondary text
    '--color-text-muted': '#666666', // subtle/placeholder text
    '--color-text-emphasis': '#000000', // strong text

    /* Icon */
    '--color-icon-primary': '#000000', // main icons
    '--color-icon-secondary': '#737373', // subdued icons

    /* Borders */
    '--color-border-default': '#E5E7EB', // default border

    /* Shadows */
    '--color-shadow-default': 'rgba(0,0,0,.2)', // base shadow

    /* Overlay */
    '--color-overlay': 'rgba(0, 0, 0, .05)', // soft overlay

    /* Category Colors */
    '--color-category-pdf': '#F43F5E',
    '--color-category-image': '#3B82F6',
    '--color-category-audio': '#10B981',
    '--color-category-video': '#A855F7',
    '--color-category-text': '#FACC15',
    '--color-category-file': '#F97316',

    /* Fallback badge */
    '--color-tool-fallback': '#9CA3AF', // general fallback
  }),

  dark: vars({
    /* Base surfaces */
    '--color-bg-default': '#18181B', // primary surface
    '--color-bg-secondary': '#27272A', // secondary surface
    '--color-bg-tertiary': '#1C1C1E', // tertiary surface

    /* Text */
    '--color-text-primary': '#FFFFFF', // main text
    '--color-text-secondary': '#A1A1AA', // secondary text
    '--color-text-muted': '#999999', // subtle/placeholder text
    '--color-text-emphasis': '#FFFFFF', // strong text

    /* Icon */
    '--color-icon-primary': '#FFFFFF', // main icons
    '--color-icon-secondary': '#71717A', // subdued icons

    /* Borders */
    '--color-border-default': '#3F3F46', // default border

    /* Shadows */
    '--color-shadow-default': 'rgba(0,0,0,.4)', // base shadow

    /* Overlay */
    '--color-overlay': 'rgba(255, 255, 255, .05)', // soft overlay

    /* Category Colors */
    '--color-category-pdf': '#F43F5E',
    '--color-category-image': '#3B82F6',
    '--color-category-audio': '#10B981',
    '--color-category-video': '#A855F7',
    '--color-category-text': '#FACC15',
    '--color-category-file': '#F97316',

    /* Fallback badge */
    '--color-tool-fallback': '#9CA3AF', // general fallback
  }),
};
