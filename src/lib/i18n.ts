import koMessages from "@/messages/ko.json";
import enMessages from "@/messages/en.json";
import jaMessages from "@/messages/ja.json";
import zhCnMessages from "@/messages/zh-cn.json";
import zhTwMessages from "@/messages/zh-tw.json";

export const SUPPORTED_LOCALES = ["ko", "en", "ja", "zh-cn", "zh-tw"] as const;
export const NON_DEFAULT_LOCALES = ["en", "ja", "zh-cn", "zh-tw"] as const;
export const DEFAULT_LOCALE = "ko";

export type Locale = (typeof SUPPORTED_LOCALES)[number];

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

const OG_LOCALE: Record<Locale, string> = {
    ko: "ko_KR",
    en: "en_US",
    ja: "ja_JP",
    "zh-cn": "zh_CN",
    "zh-tw": "zh_TW",
};

export function getOgLocale(locale: Locale): string {
    return OG_LOCALE[locale];
}

const SITE_URL = "https://lemondouble.com";

export function getLocaleUrl(locale: Locale): string {
    return locale === DEFAULT_LOCALE ? SITE_URL : `${SITE_URL}/${locale}`;
}

export function getAlternates(locale: Locale) {
    const languages: Record<string, string> = {};
    for (const l of SUPPORTED_LOCALES) {
        languages[l] = getLocaleUrl(l);
    }
    languages["x-default"] = getLocaleUrl(DEFAULT_LOCALE);
    return {
        canonical: getLocaleUrl(locale),
        languages,
    };
}

export function getOpenGraphLocales(locale: Locale) {
    return {
        locale: getOgLocale(locale),
        alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(getOgLocale),
    };
}
