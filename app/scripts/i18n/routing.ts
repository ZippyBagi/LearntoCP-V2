import {defineRouting} from 'next-intl/routing';

export const locales = ['en', 'sr'];

export const routing = defineRouting({
  locales: locales,
  defaultLocale: 'en'
});