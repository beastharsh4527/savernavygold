import localFont from "next/font/local";

export const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-opsz-normal.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/fraunces-latin-opsz-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const outfit = localFont({
  src: [{ path: "../fonts/outfit-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-outfit",
  display: "swap",
});

export const mono = localFont({
  src: [{ path: "../fonts/jetbrains-mono-latin-wght-normal.woff2", style: "normal", weight: "100 800" }],
  variable: "--font-mono-jb",
  display: "swap",
});
