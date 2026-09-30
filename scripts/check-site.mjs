import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const content = join(root, 'src', 'content', 'cases');
const base = '/joabe-santos-portfolio';
const errors = [];

function filesIn(directory, extension) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path, extension) : entry.name.endsWith(extension) ? [path] : [];
  });
}

const identities = new Map();
for (const file of filesIn(content, '.md')) {
  const source = readFileSync(file, 'utf8');
  const locale = source.match(/^locale:\s*["']?([^\s"']+)/m)?.[1];
  const slug = source.match(/^slug:\s*["']?([^\s"']+)/m)?.[1];
  if (!locale || !slug) {
    errors.push(`Missing locale or slug: ${relative(root, file)}`);
    continue;
  }
  const identity = `${locale}/${slug}`;
  if (identities.has(identity)) errors.push(`Duplicate case identity: ${identity}`);
  identities.set(identity, file);
}

for (const file of filesIn(dist, '.html')) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const value = match[1];
    if (!value.startsWith(base) || value.includes('${')) continue;
    const pathname = decodeURIComponent(value.split(/[?#]/)[0]).slice(base.length) || '/';
    const target = join(dist, pathname.replace(/^\//, ''));
    const candidates = pathname.endsWith('/')
      ? [join(target, 'index.html')]
      : [target, `${target}.html`, join(target, 'index.html')];
    if (!candidates.some(existsSync)) {
      errors.push(`Broken internal asset/link in ${relative(dist, file)}: ${value}`);
    }
  }
}

const requiredRoutes = ['/', '/work/', '/about/', '/resume/'];
for (const locale of ['', '/pt-br', '/es']) {
  for (const route of requiredRoutes) {
    const normalized = `${locale}${route}`.replace(/^\//, '');
    if (!existsSync(join(dist, normalized, 'index.html'))) {
      errors.push(`Missing localized route: ${locale || '/en'}${route}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${identities.size} localized case studies and all generated internal links.`);