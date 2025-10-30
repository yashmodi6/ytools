import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,tsx}"],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {},
  },

  plugins: [],
} satisfies Config;
