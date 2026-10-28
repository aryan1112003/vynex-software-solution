// Public files live under the site's base path (e.g. /vynex-software-solution/ on GitHub Pages).
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '')
