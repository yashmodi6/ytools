/**
 * @file tool.ts
 * @description Defines the Tool type, which represents an individual actionable utility
 * in the application, including its display label and icon reference.
 */

import type { MaterialIcons } from '@expo/vector-icons';

/**
 * Represents a single utility tool.
 * Each tool defines:
 * - name: Visible label
 * - icon: Name of a MaterialIcons icon
 */
export type Tool = {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};
