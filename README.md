# Mobile PDF Upload, Mock Sign, and Viewer (React + Vite)

Build a mobile-friendly web app where a user uploads a PDF, it is sent to a mock server for “signing,” and the signed PDF is displayed back on the device.

## Live demo

- Hosted at [delta-capica-test.vercel.app](https://delta-capica-test.vercel.app/)

## Features / Requirements

- **PDF Upload**: Allow the user to upload a PDF from their device.
- **Mock Server for Signing**: Send the PDF to a mock server that simulates signing and returns a signed PDF.
- **View Signed PDF**: Display the signed PDF directly in the app using a PDF viewer.
- **Responsive Design**: Fully mobile-responsive experience for phones and tablets.

## How it works

1. **Upload**
   - The UI provides a file input that accepts `application/pdf`.
   - When a file is selected, it is posted to `/api/sign`.

2. **Mock signing**
   - A Service Worker at `public/mock-sw.js` intercepts `POST /api/sign` and simulates signing with a ~1.5s delay.
   - It echoes back the uploaded PDF as a new Blob and adds headers:
     - `Content-Type: application/pdf`
     - `X-Mock-Signed: true`
     - `Content-Disposition: inline; filename="signed.pdf"`
     - `Cache-Control: no-store`

3. **View**
   - The client converts the response Blob into an object URL and renders it inside an `iframe` for inline preview.
   - A link is also provided to open the signed PDF in a new browser tab.

## Tech stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** for styling
- **Service Worker** to mock the signing endpoint

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
   - The Service Worker registers automatically on app load (`/mock-sw.js`).
   - Open the printed localhost URL in your browser.

3. Build (optional):
   ```bash
   npm run build
   npm run preview
   ```

### Testing on mobile devices

- To access from a phone/tablet on your LAN, run the dev server with host enabled:
  ```bash
  npm run dev -- --host
  ```
- Service Workers require a secure context (HTTPS) except on `localhost`. When accessing via a LAN IP (e.g., `http://192.168.x.x:5173`), the Service Worker may not register. For an accurate mobile test of the signing flow, use one of:
  - A local HTTPS dev setup, or
  - A tunneling solution (e.g., ngrok/Cloudflare Tunnel) to provide HTTPS.

If you just need to verify UI responsiveness on-device, the app UI will still load over HTTP; only the mocked signing endpoint depends on the Service Worker.

## Project structure (key files)

- `src/components/upload.tsx`: Upload UI and inline viewer (`iframe`).
- `src/hooks/useUpload.tsx`: Handles POST to `/api/sign`, returns an object URL for the signed PDF.
- `public/mock-sw.js`: Service Worker that simulates PDF signing and returns the “signed” PDF.
- `src/main.tsx`: Registers the Service Worker.

## Notes & limitations

- The signing is simulated. The returned file is the original PDF with mock headers; no real cryptographic signing occurs.
- Files are handled entirely in the browser/Service Worker for this mock; nothing is persisted server-side.
- Object URLs are revoked on unmount to avoid memory leaks.
- The inline PDF preview uses an `iframe`. PDF rendering support varies slightly by browser/OS.
