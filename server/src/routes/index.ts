import path from 'node:path';
import fs from 'node:fs';
import debug from 'debug';
import { Router, static as static_ } from 'express';

import env from '../env';

debug.enable('express-router');
const log = debug('express-router');

const router = Router();

if (env.NODE_ENV === 'production') {
  // Serve static files from the Vite build directory
  const viteBuildPath = path.join(__dirname, '../../../client/dist');
  router.use(static_(viteBuildPath));

  // Serve the React app for all other routes to support client-side routing
  router.get('*', (req, res, next) => {
    log('Serving React app');

    if (req.path.startsWith('/api')) {
      return next();
    }
    log('Serving React app');
    const indexPath = path.join(viteBuildPath, 'index.html');
    fs.readFile(indexPath, 'utf8', (err, html) => {
      if (err) {
        log('Error reading index.html:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(html);
    });
  });
}

router.get('/api', (req, res) => {
  log('GET /api');
  log(`headers: ${JSON.stringify(req.headers)}`);
  res.json({ message: 'Hello from server!' });
});

export default router;
