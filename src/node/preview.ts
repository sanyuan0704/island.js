import fs from 'fs';
import path from 'path';
import sirv from 'sirv';
import compression from 'compression';
import polka from 'polka';
import { resolveConfig } from './config';

export interface CLIPreviewOption {
  port?: number;
  host?: string;
}

// Serve ssg site in production
export async function preview(root: string, cliOptions: CLIPreviewOption) {
  const port = cliOptions.port ?? 4173;
  const host = cliOptions.host ?? 'localhost';
  const config = await resolveConfig(root, 'serve', 'production');
  const outputDir = path.resolve(root, config.outDir!);
  const notAnAsset = (pathname: string) => !pathname.includes('/assets/');
  const notFoundPage = fs.readFileSync(path.resolve(outputDir, './404.html'));
  const compress = compression();
  const serve = sirv(outputDir, {
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

  const onNoMatch: polka.Options['onNoMatch'] = (req, res) => {
    res.statusCode = 404;
    if (notAnAsset(req.path)) {
      res.end(notFoundPage);
    }
  };

  polka({ onNoMatch })
    .use(compress, serve)
    .listen(port, host, (err: Error) => {
      if (err) throw err;
      console.log(`Built site served at http://${host}:${port}/\n`);
    });
}
