const http = require('http');
const path = require('path');
const handler = require('serve-handler');

const PORT = Number(process.env.PORT) || 3777;
const HOST = process.env.HOST || '127.0.0.1';
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) =>
  handler(req, res, {
    public: PUBLIC_DIR,
    cleanUrls: false,
    rewrites: [{ source: '/', destination: '/index.html' }],
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
