import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { handleApiRequest } from './src/apiDevMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function apiMiddlewarePlugin() {
  return {
    name: 'nestora-api-middleware-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = urlObj.pathname;

        if (pathname.startsWith('/api')) {
          let bodyData = '';
          req.on('data', chunk => {
            bodyData += chunk;
          });
          req.on('end', () => {
            let body = {};
            if (bodyData) {
              try {
                body = JSON.parse(bodyData);
              } catch (e) {
                body = {};
              }
            }
            const query = Object.fromEntries(urlObj.searchParams.entries());
            const handled = handleApiRequest(req, res, pathname, query, body);
            if (!handled) {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'API endpoint not found' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiMiddlewarePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

