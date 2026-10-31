import { asset } from '../asset.js'
export function Brand({ height = 60 }) {
  return <img className="brand-logo" src={asset('/logo.png')} alt="Vynex Software Solution" style={{ height }} />
}
