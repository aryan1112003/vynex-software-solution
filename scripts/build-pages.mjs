// Builds the site for GitHub Pages: sub-path base, SPA fallback (404.html) and no Jekyll processing.
import { execSync } from 'node:child_process'
import { copyFileSync, writeFileSync } from 'node:fs'

const base = process.env.BASE_PATH || '/vynex-software-solution/'
execSync('npx vite build', { stdio: 'inherit', env: { ...process.env, BASE_PATH: base } })
copyFileSync('dist/index.html', 'dist/404.html')
writeFileSync('dist/.nojekyll', '')
console.log('Built for GitHub Pages at base', base)
