import { DesktopPage } from "@/components/pages/desktop/DesktopPage";
import { MobilePage } from "@/components/pages/desktop/MobilePage";
import { TabletPage } from "@/components/pages/desktop/TabletPage";
import { PortfolioTabs } from "@/components/PortfolioTabs";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Project } from "@/components/ProjectsSection";
import { Skill } from "@/components/SkillsSection";
import { getDictionary, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const BLOG_BASE = "https://blog.lemondouble.com";

function blogUrl(locale: Locale, path: string): string {
    const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
    return `${BLOG_BASE}${prefix}${path}`;
}

async function fetchJson<T>(url: string): Promise<T[]> {
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export async function HomePage({ locale }: { locale: Locale }) {
    const dict = getDictionary(locale);
    const projectsUrl = blogUrl(locale, "/projects/index.json");
    const skillsUrl = blogUrl(locale, "/skills/index.json");
    const projectsLink = blogUrl(locale, "/projects/");
    const skillsLink = blogUrl(locale, "/skills/");

    const [projects, skills] = await Promise.all([
        fetchJson<Project>(projectsUrl),
        fetchJson<Skill>(skillsUrl),
    ]);

    return (
        <>
            <LanguageSwitcher current={locale} label={dict.languageSwitcher.label} />
            <MobilePage dict={dict} />
            <TabletPage dict={dict} />
            <DesktopPage dict={dict} />
            <PortfolioTabs
                projects={projects}
                skills={skills}
                dict={dict}
                blogProjectsUrl={projectsLink}
                blogSkillsUrl={skillsLink}
            />
        </>
    );
}
