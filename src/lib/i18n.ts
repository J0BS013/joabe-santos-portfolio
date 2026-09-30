export type Locale = 'en' | 'pt-br' | 'es';

export const locales: Locale[] = ['en', 'pt-br', 'es'];

export const htmlLang: Record<Locale, string> = {
  en: 'en',
  'pt-br': 'pt-BR',
  es: 'es',
};

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  'pt-br': 'PT',
  es: 'ES',
};

const localePrefix: Record<Locale, string> = {
  en: '',
  'pt-br': '/pt-br',
  es: '/es',
};

export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  const isAsset = /\/[^/]+\.[^/]+$/.test(clean);
  const normalized = clean === '/' || isAsset ? clean : `${clean}/`;
  return `${base}${normalized}`.replace(/\/+/g, '/');
}

export function localizedPath(locale: Locale, route = '/'): string {
  const normalizedRoute = route === '/' ? '' : `/${route.replace(/^\/+|\/+$/g, '')}`;
  return withBase(`${localePrefix[locale]}${normalizedRoute || '/'}`);
}

export function absoluteLocalizedUrl(locale: Locale, route = '/'): URL {
  return new URL(localizedPath(locale, route), 'https://j0bs013.github.io');
}
