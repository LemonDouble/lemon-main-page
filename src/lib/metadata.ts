import type { Metadata } from "next";
import { getAlternates, getDictionary, getLocaleUrl, getOpenGraphLocales, type Locale } from "@/lib/i18n";

export function buildMetadata(locale: Locale): Metadata {
    const dict = getDictionary(locale);
    const og = getOpenGraphLocales(locale);
    return {
        title: dict.metadata.title,
        description: dict.metadata.description,
        alternates: getAlternates(locale),
        openGraph: {
            title: dict.metadata.title,
            description: dict.metadata.description,
            url: getLocaleUrl(locale),
            locale: og.locale,
            alternateLocale: og.alternateLocale,
            type: "website",
        },
    };
}
