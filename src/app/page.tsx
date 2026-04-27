import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import {
    DEFAULT_LOCALE,
    getAlternates,
    getDictionary,
    getOpenGraphLocales,
    getLocaleUrl,
} from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
    const locale = DEFAULT_LOCALE;
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

export default async function Home() {
    return <HomePage locale={DEFAULT_LOCALE} />;
}
