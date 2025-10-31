/**
 * @file nativewind-interop.ts
 * @description Registers cssInterop for multiple @expo/vector-icons providers
 * so they can accept `className`. Tailwind utilities map into native `style`
 * props (e.g., text-4xl → size).
 */

import { cssInterop } from 'nativewind';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

/** Shared mapping config */
const mapping = {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      size: true,
      color: true,
    },
  },
};

/**
 * Registers cssInterop for a list of icon provider components.
 * @param providers list of icon provider components
 */
const registerInterop = (providers: any[]) => {
  providers.forEach((provider) => cssInterop(provider, mapping));
};

// Register all providers
registerInterop([Ionicons, Feather, MaterialIcons]);

// Avoid tree-shaking
export {};
