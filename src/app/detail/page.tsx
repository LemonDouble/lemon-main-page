import { DetailPage } from "@/components/detail/DetailPage";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(DEFAULT_LOCALE, "detail");

export default function Detail() {
    return <DetailPage locale={DEFAULT_LOCALE} />;
}
