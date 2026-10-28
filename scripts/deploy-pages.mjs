// Builds for GitHub Pages and force-pushes dist/ to the gh-pages branch of the origin remote.
import { execSync } from 'node:child_process'

const run = (cmd, cwd) => execSync(cmd, { stdio: 'inherit', cwd })
const origin = execSync('git remote get-url origin').toString().trim()

run('node scripts/build-pages.mjs')
run('git init -q -b gh-pages', 'dist')
run('git add -A', 'dist')
run('git -c user.name="Vynex Deploy" -c user.email="deploy@users.noreply.github.com" commit -q -m "Deploy site"', 'dist')
run(`git push -f ${origin} gh-pages`, 'dist')
console.log('Deployed to gh-pages')
