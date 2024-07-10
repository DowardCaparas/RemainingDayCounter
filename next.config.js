/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Change output directory from 'out' to 'dist'
  distDir: 'dist',
 
  // Uncomment and adjust as needed:
  // Output format for static site export
  // output: 'export',
 
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
}
 
module.exports = nextConfig;
