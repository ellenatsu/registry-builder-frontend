import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat','Helvetica', 'Arial', 'sans-serif'], 
        'great-vibes': ['"Great Vibes"', 'cursive'],
        'playwrite': ['"Playwrite AU SA"', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        custom: ['LucidaHandwriting'],
      },
    },
  },
  plugins: [daisyui, require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        okTheme1: {
          primary: "#A87D5D",       // Muted Gold-Brown
          secondary: "#F5EBDC",     // Warm Beige
          accent: "#8C5435",        // Cinnamon Brown
          neutral: "#F7F3EF",       // Off-White
          "base-100": "#FFFFFF",    // Pure White
          "base-200": "#EDE0D4",    // Light Cream
          info: "#A68A64",          // Taupe
          success: "#D8C4A3",       // Sandstone Beige
          warning: "#BF8A54",       // Burnt Sienna
          error: "#E3242B",         // Mocha
          "text-primary": "#2F1E0E", // Coffee Brown
          "btn-primary": "#A67C52",   // Bronze
          "btn-error": "#E3242B",
        },
        testTheme1: {
          primary: "#FF7F50",        // Coral - Highlights and primary CTA buttons
          secondary: "#8B4513",      // Saddle Brown - Accent buttons or badges
          accent: "#DD6236",         // Rust Red - Used sparingly for accents
          neutral: "#F7EEDD",        // Light Beige - Main background
          "base-100": "#FFFFFF",     // Pure White - Sections with high contrast
          "base-200": "#EDE4D3",     // Cream Beige - Secondary background
          info: "#8F1E00",           // Deep Maroon - Informational elements
          success: "#FFD299",        // Light Orange - Success messages or highlights
          warning: "#C4BCAB",        // Light Gray-Beige - Warnings or minor alerts
          error: "#2C2C2C",          // Dark Gray - Errors or important alerts
          "text-primary": "#000000", // Black - Main text
          "btn-primary": "#FF7F50",  // Coral - Primary buttons
        },
        testTheme2: {
          primary: "#FFA500",         // Vibrant Orange - For main CTAs and highlights
          secondary: "#808080",       // Gray - For badges, links, or subtle accents
          accent: "#DD8900",          // Deep Orange - For secondary CTAs or hover effects
          neutral: "#EFEFEF",         // Light Gray - Main background for clean and minimal look
          "base-100": "#FFFFFF",      // White - High-contrast sections and cards
          "base-200": "#E5E5E5",      // Soft Gray - Secondary backgrounds
          info: "#5C5C5C",            // Medium Gray - Informational elements
          success: "#FFA500",         // Orange - Positive messages or confirmations
          warning: "#DD8900",         // Deep Orange - Warnings and alerts
          error: "#885400",           // Brownish Orange - Errors or critical alerts
          "text-primary": "#333333",  // Dark Gray - Main text for readability
          "btn-primary": "#FFA500",   // Vibrant Orange - Primary buttons for CTAs
        },
      },
    ],
  },
}
