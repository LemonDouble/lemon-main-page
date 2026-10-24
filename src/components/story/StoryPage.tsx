import { SiteHeader } from "@/components/SiteHeader";
import { SocialLinks } from "@/components/SocialLinks";
import { StoryStage } from "@/components/story/StoryStage";
import { blogUrl } from "@/lib/blog";
import { getDictionary, type Locale } from "@/lib/i18n";

export function StoryPage({ locale }: { locale: Locale }) {
    const dict = getDictionary(locale);

    return (
        <>
            <SiteHeader locale={locale} />
            <StoryStage
                dict={dict}
                projectsUrl={blogUrl(locale, "/projects/")}
                socialLinks={<SocialLinks className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl" />}
            />
        </>
    );
}
