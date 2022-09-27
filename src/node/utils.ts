import { createHash as createHashFunc } from 'crypto';
import { spawn } from 'cross-spawn';

export const dynamicImport = new Function(
  'modulePath',
  'return import(modulePath)'
);

export const createHash = (info: string): string => {
  if (!info) {
    throw new Error(`Invalid info: ${info}`);
  }
  return createHashFunc('sha256').update(info).digest('hex').slice(0, 8);
};

export const parseUrl = (
  url: string
): {
  url: string;
  query: string;
  hash: string;
} => {
  const [withoutHash, hash = ''] = url.split('#');
  const [cleanedUrl, query = ''] = withoutHash.split('?');
  return {
    url: cleanedUrl,
    query,
    hash
  };
};

export function getGitTimestamp(file: string) {
  return new Promise<number>((resolve, reject) => {
    const child = spawn('git', ['log', '-1', '--pretty="%ci"', file]);
    let output = '';
    child.stdout.on('data', (d) => (output += String(d)));
    child.on('close', () => {
      resolve(+new Date(output));
    });
    child.on('error', reject);
  });
}
