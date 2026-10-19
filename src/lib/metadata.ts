import type { Metadata } from "next";
import { getAlternates, getDictionary, getLocaleUrl, getOpenGraphLocales, type Locale, type View } from "@/lib/i18n";

export function buildMetadata(locale: Locale, view: View): Metadata {
    const dict = getDictionary(locale);
    const og = getOpenGraphLocales(locale);
    return {
        title: dict.metadata.title,
        description: dict.metadata.description,
        alternates: getAlternates(locale, view),
        openGraph: {
            title: dict.metadata.title,
            description: dict.metadata.description,
            url: getLocaleUrl(locale, view),
            locale: og.locale,
            alternateLocale: og.alternateLocale,
            type: "website",
        },
    };
}
