import koMessages from "@/messages/ko.json";
import enMessages from "@/messages/en.json";

export const SUPPORTED_LOCALES = ["ko", "en"] as const;
export const NON_DEFAULT_LOCALES = ["en"] as const;
export const DEFAULT_LOCALE = "ko";

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type Dictionary = typeof koMessages;

const dictionaries: Record<Locale, Dictionary> = {
    ko: koMessages,
    en: enMessages,
};

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function isNonDefaultLocale(value: string): value is Locale {
    return (NON_DEFAULT_LOCALES as readonly string[]).includes(value);
}

export function localePath(locale: Locale): string {
    return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

const OG_LOCALE: Record<Locale, string> = {
    ko: "ko_KR",
    en: "en_US",
};

const SITE_URL = "https://lemondouble.com";

export function getLocaleUrl(locale: Locale): string {
    const path = localePath(locale);
    return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function getAlternates(locale: Locale) {
    const languages: Record<string, string> = {};
    for (const supportedLocale of SUPPORTED_LOCALES) {
        languages[supportedLocale] = getLocaleUrl(supportedLocale);
    }
    languages["x-default"] = getLocaleUrl(DEFAULT_LOCALE);
    return {
        canonical: getLocaleUrl(locale),
        languages,
    };
}

export function getOpenGraphLocales(locale: Locale) {
    return {
        locale: OG_LOCALE[locale],
        alternateLocale: SUPPORTED_LOCALES.filter(other => other !== locale).map(other => OG_LOCALE[other]),
    };
}
