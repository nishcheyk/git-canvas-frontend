/**
 * Mapping of programming languages to hex colors.
 * Used for both the 3D planet materials and the HUD elements.
 */
export const LANGUAGE_COLORS = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  Rust: '#DEA584',
  Go: '#00ADD8',
  CSS: '#563D7C',
  HTML: '#E34C26',
  'C++': '#F34B7D',
  'C#': '#178600',
  PHP: '#4F5D95',
  Java: '#B07219',
  Ruby: '#701516',
  Shell: '#89E051',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  C: '#555555',
  Unknown: '#888888',
};

/**
 * Resolves a hexadecimal color code for a given language name.
 * @param {string} lang - The name of the programming language.
 * @returns {string} The hex color code representing the language.
 */
export const getLanguageColor = (lang) => {
  if (!lang) return LANGUAGE_COLORS.Unknown;
  
  // Normalize cases to handle different casing from GitHub API
  const matchedKey = Object.keys(LANGUAGE_COLORS).find(
    (key) => key.toLowerCase() === lang.toLowerCase()
  );
  
  return matchedKey ? LANGUAGE_COLORS[matchedKey] : LANGUAGE_COLORS.Unknown;
};
