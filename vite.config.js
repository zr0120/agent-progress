import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import { buildMockReport } from './src/data/mockData.js';

function mockExtractPlugin() {
  return {
    name: 'agent-progress-mock-extract',
    configureServer(server) {
      server.middlewares.use('/api/extract', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Method not allowed' }));
          return;
        }

        const chunks = [];
        req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        req.on('end', () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(buildMockReport()));
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mockExtractPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
});
