const http = require('http');
const path = require('path');
const handler = require('serve-handler');

const PORT = Number(process.env.PORT) || 3779;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = path.join(__dirname, '..', 'test-reports');

const server = http.createServer((req, res) =>
  handler(req, res, {
    public: ROOT,
    cleanUrls: false,
    rewrites: [{ source: '/', destination: '/index.html' }],
    directoryListing: false,
    headers: [
      {
        source: 'manifest.json',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ],
  }),
);

server.listen(PORT, HOST, () => {
  console.log(`zelect test-report on http://${HOST}:${PORT}`);
});
