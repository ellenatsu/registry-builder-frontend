import React from "react";

const ThemeColorsDemo: React.FC = () => {
  const themes = [
    {
      themeName: "okTheme1",
      colors: {
        primary: "#A87D5D", // Muted Gold-Brown
        secondary: "#F5EBDC", // Warm Beige
        accent: "#8C5435", // Cinnamon Brown
        neutral: "#F7F3EF", // Off-White
        "base-100": "#FFFFFF", // Pure White
        "base-200": "#EDE0D4", // Light Cream
        info: "#A68A64", // Taupe
        success: "#D8C4A3", // Sandstone Beige
        warning: "#BF8A54", // Burnt Sienna
        error: "#6F4D25", // Mocha
        "text-primary": "#2F1E0E", // Coffee Brown
        "btn-primary": "#A67C52", // Bronze
      },
    },
    {
      themeName: "testTheme1",
      colors: {
        primary: "#FF7F50", // Coral - Highlights and primary CTA buttons
        secondary: "#8B4513", // Saddle Brown - Accent buttons or badges
        accent: "#DD6236", // Rust Red - Used sparingly for accents
        neutral: "#F7EEDD", // Light Beige - Main background
        "base-100": "#FFFFFF", // Pure White - Sections with high contrast
        "base-200": "#EDE4D3", // Cream Beige - Secondary background
        info: "#8F1E00", // Deep Maroon - Informational elements
        success: "#FFD299", // Light Orange - Success messages or highlights
        warning: "#C4BCAB", // Light Gray-Beige - Warnings or minor alerts
        error: "#2C2C2C", // Dark Gray - Errors or important alerts
        "text-primary": "#000000", // Black - Main text
        "btn-primary": "#FF7F50", // Coral - Primary buttons
      },
    },
    {
      themeName: "testTheme2",
      colors: {
        primary: "#FFA500", // Vibrant Orange - For main CTAs and highlights
        secondary: "#808080", // Gray - For badges, links, or subtle accents
        accent: "#DD8900", // Deep Orange - For secondary CTAs or hover effects
        neutral: "#EFEFEF", // Light Gray - Main background for clean and minimal look
        "base-100": "#FFFFFF", // White - High-contrast sections and cards
        "base-200": "#E5E5E5", // Soft Gray - Secondary backgrounds
        info: "#5C5C5C", // Medium Gray - Informational elements
        success: "#FFA500", // Orange - Positive messages or confirmations
        warning: "#DD8900", // Deep Orange - Warnings and alerts
        error: "#885400", // Brownish Orange - Errors or critical alerts
        "text-primary": "#333333", // Dark Gray - Main text for readability
        "btn-primary": "#FFA500", // Vibrant Orange - Primary buttons for CTAs
      },
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-3">
        <h1>font</h1>
        <div className={`text-[#96592E] font-custom font-bold`}>
          fundmyWish FundmyWish
        </div>
        <div className={`text-[#96592E] font-great-vibes font-bold`}>
          fundmyWish FundmyWish
        </div>
        <div className={`text-[#96592E] font-bold`}>𝓕𝓾𝓷𝓭𝓶𝔂𝓦𝓲𝓼𝓱</div>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Theme Colors Demo</h1>
      {themes.map((theme) => (
        <div key={theme.themeName} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{theme.themeName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Object.entries(theme.colors).map(([name, hex]) => (
              <div
                key={name}
                className="p-4 shadow-md rounded-lg bg-white border border-gray-200"
              >
                <div
                  className="h-16 w-full rounded"
                  style={{ backgroundColor: hex }}
                />
                <p className="mt-4 font-semibold text-gray-700">{name}</p>
                <p className="text-sm text-gray-500">{hex}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <h1>test size</h1>
        <div className="fixed top-0 left-0 p-2 bg-black text-white">
          <span className="block sm:hidden">XS (Default) Active</span>
          <span className="hidden sm:block md:hidden">SM Active (≥640px)</span>
          <span className="hidden md:block lg:hidden">MD Active (≥768px)</span>
          <span className="hidden lg:block xl:hidden">LG Active (≥1024px)</span>
          <span className="hidden xl:block">XL Active (≥1280px)</span>
        </div>
      </div>
    </div>
  );
};

export default ThemeColorsDemo;
