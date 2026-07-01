import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function loadLocalEnv(root) {
  loadEnvFile(path.join(root, '.env'));
  loadEnvFile(path.join(root, '.env.local'));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function createMockResponse(res) {
  const state = {
    statusCode: 200,
    headers: {},
  };

  return {
    statusCode: state.statusCode,
    setHeader(name, value) {
      state.headers[name] = value;
      return this;
    },
    status(code) {
      state.statusCode = code;
      this.statusCode = code;
      return this;
    },
    json(body) {
      res.statusCode = state.statusCode;
      Object.entries(state.headers).forEach(([name, value]) => {
        res.setHeader(name, value);
      });
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
    },
    end() {
      res.statusCode = state.statusCode;
      Object.entries(state.headers).forEach(([name, value]) => {
        res.setHeader(name, value);
      });
      res.end();
    },
  };
}

const ROUTE_FILES = {
  '/api/chat': 'api/chat.js',
  '/api/job-fit': 'api/job-fit.js',
};

export function localApiPlugin() {
  let handlers;

  return {
    name: 'local-api',
    configureServer(server) {
      loadLocalEnv(server.config.root);

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (!url || !ROUTE_FILES[url]) {
          return next();
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          if (!handlers) {
            handlers = {};
            for (const [route, file] of Object.entries(ROUTE_FILES)) {
              const modulePath = path.join(server.config.root, file);
              handlers[route] = (await import(pathToFileURL(modulePath).href)).default;
            }
          }

          req.body = await readRequestBody(req);
          await handlers[url](req, createMockResponse(res));
        } catch (error) {
          console.error(`[local-api] ${url}`, error);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: error.message || 'Local API handler failed.',
              })
            );
          }
        }
      });
    },
  };
}
