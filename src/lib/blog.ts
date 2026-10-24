import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const BLOG_BASE = "https://blog.lemondouble.com";

export function blogUrl(locale: Locale, path: string): string {
    const localePrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
    return `${BLOG_BASE}${localePrefix}${path}`;
}
