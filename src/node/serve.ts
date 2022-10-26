import fs from 'fs';
import path from 'path';
import sirv from 'sirv';
import compression from 'compression';
import polka from 'polka';
import { resolveConfig } from './config';

export interface ServeOptions {
  base?: string;
  root?: string;
  port?: number;
  host?: string;
}

// Serve ssg site in production
export async function serve(root: string, options: ServeOptions) {
  const port = options.port ?? 4173;
  const host = options.host ?? 'localhost';
  const config = await resolveConfig(root, 'serve', 'production');
  const base = config.base?.replace(/^\//, '').replace(/\/$/, '') || '';
  const notAnAsset = (pathname: string) => !pathname.includes('/assets/');
  const notFoundPage = fs.readFileSync(
    path.resolve(config.outDir!, './404.html')
  );
  const onNoMatch: polka.Options['onNoMatch'] = (req, res) => {
    res.statusCode = 404;
    if (notAnAsset(req.path)) {
      res.end(notFoundPage);
    }
  };

  const compress = compression();
  const serve = sirv(config.outDir, {
    etag: true,
    maxAge: 31536000,
    immutable: true,
    setHeaders(res, pathname) {
      if (notAnAsset(pathname)) {
        // force server validation for non-asset files since they
        // are not fingerprinted
        res.setHeader('cache-control', 'no-cache');
      }
    }
  });

  if (base) {
    polka({ onNoMatch })
      .use(base, compress, serve)
      .listen(port, host, (err: Error) => {
        if (err) throw err;
        console.log(`Built site served at http://${host}:${port}/${base}/\n`);
      });
  } else {
    polka({ onNoMatch })
      .use(compress, serve)
      .listen(port, host, (err: Error) => {
        if (err) throw err;
        console.log(`Built site served at http://${host}:${port}/\n`);
      });
  }
}
