import { defineConfig } from "astro/config";

// Static output: this site is deployed as pure static files to Azure Static
// Web Apps (see .github/workflows/azure-static-web-apps.yml and
// staticwebapp.config.json). No server runtime, no adapter needed.
export default defineConfig({
  site: "https://kwasi-portfolio.example.com",
  output: "static",
  compressHTML: true,
});
