/**
 * @file category.ts
 * @purpose Defines the Category type, representing a group of tools with a label,
 * themed color, icon reference, and a list of tools belonging to that group.
 */

import type { Ionicons } from '@expo/vector-icons';
import type { Tool } from './tool';

/**
 * Represents a tool category in the application.
 * Each category defines:
 * - title: Display label
 * - color: Category theme color identifier
 * - icon: Name of an Ionicons icon
 * - tools: List of tools under this category
 */
export type Category = {
  title: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  tools: Tool[];
};
