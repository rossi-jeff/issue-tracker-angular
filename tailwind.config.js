import { createThemes } from "tw-colors";
import { palettes } from "./src/lib/palettes";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [createThemes(palettes)],
};
