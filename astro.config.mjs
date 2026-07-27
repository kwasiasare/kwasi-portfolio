import { defineConfig } from "astro/config";

// Static output: this site is deployed as pure static files to Azure Static
// Web Apps (see .github/workflows/azure-static-web-apps.yml and
// staticwebapp.config.json). No server runtime, no adapter needed.
//
// TODO: set `site` once a custom domain is chosen and configured on the SWA
// resource (see README "Deployment" — custom domain story). Astro uses
// `site` to generate absolute/canonical URLs; leaving it unset avoids
// baking in a placeholder domain that doesn't exist.
export default defineConfig({
  output: "static",
  compressHTML: true,
});
