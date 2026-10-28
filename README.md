# Vynex Software Solution — website

React + Vite site for Vynex Software Solution, Ahmedabad: light theme, 3D/2D motion, responsive layout.

## Develop

```bash
npm install
npm run dev
```

## Deploy to Vercel

Live at https://vynex-software-solution.vercel.app

```bash
vercel deploy --prod
```

`vercel.json` sends every route to `index.html` so links like `/about` work on refresh.

## Deploy to GitHub Pages

```bash
npm run deploy
```

Builds with the `/vynex-software-solution/` base path and pushes `dist/` to the `gh-pages` branch.

Content lives in `src/data.js` (services, industries, technologies) and `src/faqs.js` (FAQ answers).
