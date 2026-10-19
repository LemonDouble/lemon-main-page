import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryPage } from "@/components/story/StoryPage";
import { NON_DEFAULT_LOCALES, isNonDefaultLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
    return NON_DEFAULT_LOCALES.map(locale => ({ locale }));
}

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { locale } = await params;
    return isNonDefaultLocale(locale) ? buildMetadata(locale, "story") : {};
}

export default async function LocaleStory({ params }: { params: Promise<Params> }) {
    const { locale } = await params;
    if (!isNonDefaultLocale(locale)) notFound();
    return <StoryPage locale={locale} />;
}
