// Minimal mock Service Worker to simulate PDF signing
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (url.pathname === '/api/sign' && event.request.method === 'POST') {
    event.respondWith(handleSign(event.request))
  }
})

async function handleSign(request) {
  await new Promise((r) => setTimeout(r, 1500))
  const uploadedBlob = await request.blob()

  return new Response(uploadedBlob, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'X-Mock-Signed': 'true',
      'Content-Disposition': 'inline; filename="signed.pdf"',
      'Cache-Control': 'no-store',
    },
  })
}
