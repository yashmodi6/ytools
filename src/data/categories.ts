/**
 * @file categories.ts
 * @purpose Provides a static list of tool categories and the tools within each category.
 * Each category defines a display title, color theme, icon, and its associated tools.
 */

import type { Category } from '../types/category';

/**
 * A static list of available tool categories.
 * Each category contains:
 * - title: Display name
 * - color: Theme color reference
 * - icon: Icon name (string identifier)
 * - tools: List of tools available in this category
 */
export const categoriesStatic: Category[] = [
  // -----------------------------------
  // ✅ PDF Tools
  // -----------------------------------
  {
    title: 'PDF Tools',
    color: 'bg-rose-500',
    icon: 'document-text-outline',
    tools: [
      { name: 'PDF Merge', icon: 'merge-type' },
      { name: 'PDF Split', icon: 'content-cut' },
      { name: 'IMG to PDF', icon: 'picture-as-pdf' },
      { name: 'PDF to IMG', icon: 'image' },
      { name: 'PDF Compress', icon: 'compress' },
      { name: 'PDF Sign', icon: 'gesture' },
    ],
  },

  // -----------------------------------
  // ✅ Image Tools
  // -----------------------------------
  {
    title: 'Image Tools',
    color: 'bg-blue-500',
    icon: 'image-outline',
    tools: [
      { name: 'IMG Resize', icon: 'aspect-ratio' },
      { name: 'IMG Compress', icon: 'compress' },
      { name: 'IMG to WebP', icon: 'transform' },
      { name: 'WebP to IMG', icon: 'switch-camera' },
      { name: 'IMG Crop', icon: 'crop' },
      { name: 'IMG Rotate', icon: 'rotate-right' },
    ],
  },

  // -----------------------------------
  // ✅ Audio Tools
  // -----------------------------------
  {
    title: 'Audio Tools',
    color: 'bg-emerald-500',
    icon: 'musical-notes-outline',
    tools: [
      { name: 'Audio Trim', icon: 'content-cut' },
      { name: 'Audio Join', icon: 'merge-type' },
      { name: 'Audio Fade', icon: 'graphic-eq' },
    ],
  },

  // -----------------------------------
  // ✅ Video Tools
  // -----------------------------------
  {
    title: 'Video Tools',
    color: 'bg-purple-500',
    icon: 'videocam-outline',
    tools: [
      { name: 'Video Trim', icon: 'content-cut' },
      { name: 'Video Mute', icon: 'volume-off' },
      { name: 'Video to GIF', icon: 'gif' },
      { name: 'GIF to Video', icon: 'movie' },
    ],
  },

  // -----------------------------------
  // ✅ Text Tools
  // -----------------------------------
  {
    title: 'Text Tools',
    color: 'bg-yellow-500',
    icon: 'text-outline',
    tools: [
      { name: 'Uppercase', icon: 'text-fields' },
      { name: 'Lowercase', icon: 'text-fields' },
      { name: 'Text Encrypt', icon: 'lock' },
      { name: 'Text Decrypt', icon: 'lock-open' },
      { name: 'Remove Spaces', icon: 'format-line-spacing' },
    ],
  },

  // -----------------------------------
  // ✅ File Tools
  // -----------------------------------
  {
    title: 'File Tools',
    color: 'bg-orange-500',
    icon: 'folder-outline',
    tools: [
      { name: 'ZIP Create', icon: 'folder-zip' },
      { name: 'ZIP Extract', icon: 'unarchive' },
      { name: 'File Rename', icon: 'drive-file-rename-outline' },
    ],
  },
];
