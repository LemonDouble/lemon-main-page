import koMessages from "@/messages/ko.json";
import enMessages from "@/messages/en.json";
import jaMessages from "@/messages/ja.json";
import zhCnMessages from "@/messages/zh-cn.json";
import zhTwMessages from "@/messages/zh-tw.json";

export const SUPPORTED_LOCALES = ["ko", "en", "ja", "zh-cn", "zh-tw"] as const;
export const NON_DEFAULT_LOCALES = ["en", "ja", "zh-cn", "zh-tw"] as const;
export const DEFAULT_LOCALE = "ko";

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type View = "story" | "detail";

export type Dictionary = typeof koMessages;

const dictionaries: Record<Locale, Dictionary> = {
    ko: koMessages,
    en: enMessages,
    ja: jaMessages,
    "zh-cn": zhCnMessages,
    "zh-tw": zhTwMessages,
};

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function isNonDefaultLocale(value: string): value is Locale {
    return (NON_DEFAULT_LOCALES as readonly string[]).includes(value);
}

export function localePath(locale: Locale, view: View): string {
    const localePrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
    const viewSuffix = view === "detail" ? "/detail" : "";
    return localePrefix + viewSuffix || "/";
}

const OG_LOCALE: Record<Locale, string> = {
    ko: "ko_KR",
    en: "en_US",
    ja: "ja_JP",
    "zh-cn": "zh_CN",
    "zh-tw": "zh_TW",
};

const SITE_URL = "https://lemondouble.com";

export function getLocaleUrl(locale: Locale, view: View): string {
    const path = localePath(locale, view);
    return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function getAlternates(locale: Locale, view: View) {
    const languages: Record<string, string> = {};
    for (const supportedLocale of SUPPORTED_LOCALES) {
        languages[supportedLocale] = getLocaleUrl(supportedLocale, view);
    }
    languages["x-default"] = getLocaleUrl(DEFAULT_LOCALE, view);
    return {
        canonical: getLocaleUrl(locale, view),
        languages,
    };
}

export function getOpenGraphLocales(locale: Locale) {
    return {
        locale: OG_LOCALE[locale],
        alternateLocale: SUPPORTED_LOCALES.filter(other => other !== locale).map(other => OG_LOCALE[other]),
    };
}
