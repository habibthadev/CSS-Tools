import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://css-tools.vercel.app'
const OG_IMAGE = `${BASE_URL}/og.png`

export default function SEOMeta({ title, description, path = '/' }) {
  const fullTitle = title ? `${title} — CSS Tools` : 'CSS Tools — Interactive CSS Property Generator'
  const desc = description || 'Free interactive CSS generator. Build gradients, shadows, filters, flexbox, grid, transforms and more with live preview.'
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  )
}
