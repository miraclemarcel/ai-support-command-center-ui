import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { 50: "#eef6ff", 100: "#d9ebff", 600: "#2563eb", 700: "#1d4ed8", 900: "#102a56" } },
      boxShadow: { soft: "0 18px 45px rgba(15,23,42,.08)" }
    }
  },
  plugins: []
};
export default config;
