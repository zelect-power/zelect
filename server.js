const http = require('http');
const path = require('path');
const handler = require('serve-handler');

const PORT = Number(process.env.PORT) || 3777;
const HOST = process.env.HOST || '127.0.0.1';
const PUBLIC_DIR = path.join(__dirname, 'public');

// SPA маршруты прототипа — каждый отдаёт index.html, дальше клиент сам выбирает страницу.
// Совпадает с ZP_PAGE_TO_PATH в public/src/app.jsx.
const SPA_PATHS = ['produkty', 'poslugy', 'pidtrymka', 'novyny', 'kontakty'];

const server = http.createServer((req, res) =>
  handler(req, res, {
    public: PUBLIC_DIR,
    cleanUrls: false,
    rewrites: [
      { source: '/', destination: '/index.html' },
      ...SPA_PATHS.flatMap((p) => [
        { source: `/${p}`, destination: '/index.html' },
        { source: `/${p}/:rest*`, destination: '/index.html' },
      ]),
    ],
    directoryListing: false,
    headers: [
      {
        source: '**/*.@(jsx|js|svg|jpg|jpeg|png|webp|html)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=300' }],
      },
    ],
  })
);

server.listen(PORT, HOST, () => {
  console.log(`zelect prototype listening on http://${HOST}:${PORT}`);
});
