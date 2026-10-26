import { HomePage } from "@/components/home/HomePage";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(DEFAULT_LOCALE);

export default function Home() {
    return <HomePage locale={DEFAULT_LOCALE} />;
}
