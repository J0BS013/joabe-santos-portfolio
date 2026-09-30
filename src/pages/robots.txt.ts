import type { APIRoute } from 'astro';
import { withBase } from '../lib/i18n';

export const GET: APIRoute = ({ site }) => new Response(
  `User-agent: *\nAllow: /\nSitemap: ${new URL(withBase('/sitemap-index.xml'), site ?? 'https://j0bs013.github.io')}\n`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
