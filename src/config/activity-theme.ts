// Safe customization surface for the "optional visual change" step of the
// activity. These are the only two values participants are guided to edit
// (through GitHub's web editor, or locally). Editing this file and
// committing it is what triggers the redeployment check.
//
// accentColor: any CSS color value. Used for buttons and highlights on the
//   choice screen, independent of each companion's own accent color.
// revealEffect: "burst" | "fade" — how the companion appears after a
//   submission. Reduced-motion users always get the instant "fade"
//   behavior regardless of this setting.

export const activityTheme = {
  accentColor: "#146EF5", // Webflow brand blue
  revealEffect: "burst" as "burst" | "fade",
};
