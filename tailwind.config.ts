import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        // Base surfaces
        surface: {
          DEFAULT: "var(--color-bg-default)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
        },

        // Text
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          emphasis: "var(--color-text-emphasis)",
          highlight: "var(--color-text-highlight)",
        },

        // Icons
        icon: {
          primary: "var(--color-icon-primary)",
          secondary: "var(--color-icon-secondary)",
        },

        // Borders
        border: {
          DEFAULT: "var(--color-border-default)",
        },

        // Shadows
        shadow: {
          DEFAULT: "var(--color-shadow-default)",
        },

        // Overlay
        overlay: "var(--color-overlay)",

        // Categories
        category: {
          pdf: "var(--color-category-pdf)",
          image: "var(--color-category-image)",
          audio: "var(--color-category-audio)",
          video: "var(--color-category-video)",
          text: "var(--color-category-text)",
          file: "var(--color-category-file)",
        },

        // Fallback
        tool: {
          fallback: "var(--color-tool-fallback)",
        },
      },
    },
  },

  plugins: [],
} satisfies Config;