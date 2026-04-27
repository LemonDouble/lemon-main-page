import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import {
    NON_DEFAULT_LOCALES,
    getAlternates,
    getDictionary,
    getOpenGraphLocales,
    getLocaleUrl,
    type Locale,
} from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
    return NON_DEFAULT_LOCALES.map(locale => ({ locale }));
}

type Params = { locale: string };

function isLocale(value: string): value is Locale {
    return (NON_DEFAULT_LOCALES as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { locale: raw } = await params;
    if (!isLocale(raw)) return {};
    const locale = raw;
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

export default async function LocalePage({ params }: { params: Promise<Params> }) {
    const { locale: raw } = await params;
    if (!isLocale(raw)) notFound();
    return <HomePage locale={raw} />;
}
