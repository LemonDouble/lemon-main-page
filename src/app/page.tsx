import { StoryPage } from "@/components/story/StoryPage";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(DEFAULT_LOCALE);

export default function Home() {
    return <StoryPage locale={DEFAULT_LOCALE} />;
}
