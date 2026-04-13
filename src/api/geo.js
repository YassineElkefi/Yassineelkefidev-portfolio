export const config = { runtime: 'edge' }

export default function handler(req) {
  const country = req.headers.get('x-vercel-ip-country') || ''
  return new Response(JSON.stringify({ countryCode: country }), {
    headers: { 'Content-Type': 'application/json' },
  })
}