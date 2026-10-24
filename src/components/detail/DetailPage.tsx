import Link from "next/link";
import { ProjectGroups, type ProjectGroup } from "@/components/ProjectGroups";
import { SiteHeader } from "@/components/SiteHeader";
import { SkillsSection } from "@/components/SkillsSection";
import { SocialLinks } from "@/components/SocialLinks";
import { HIGHLIGHT_PROJECT_SLUGS } from "@/components/story/scenes";
import { blogUrl, fetchProjects, fetchSkills, type Project } from "@/lib/blog";
import { getDictionary, type Dictionary, type Locale } from "@/lib/i18n";

const ACTIVE_STATUSES = ["운영중", "개발중", "완료 (고도화 중)"];
const ARCHIVED_STATUSES = ["archived", "드랍"];

function groupProjects(projects: Project[], dict: Dictionary): ProjectGroup[] {
    const highlights = HIGHLIGHT_PROJECT_SLUGS
        .map(slug => projects.find(project => project.slug === slug))
        .filter(project => project !== undefined);
    const others = projects
        .filter(project => !HIGHLIGHT_PROJECT_SLUGS.includes(project.slug))
        .sort((a, b) => b.year - a.year);

    return [
        { key: "highlights", ...dict.detail.highlights, projects: highlights },
        {
            key: "active",
            ...dict.detail.tiers.active,
            projects: others.filter(project => ACTIVE_STATUSES.includes(project.status)),
        },
        {
            key: "done",
            ...dict.detail.tiers.done,
            projects: others.filter(project => !ACTIVE_STATUSES.includes(project.status) && !ARCHIVED_STATUSES.includes(project.status)),
        },
        {
            key: "archive",
            ...dict.detail.tiers.archive,
            projects: others.filter(project => ARCHIVED_STATUSES.includes(project.status)),
            collapsed: true,
        },
    ];
}

export async function DetailPage({ locale }: { locale: Locale }) {
    const dict = getDictionary(locale);
    const [projects, skills] = await Promise.all([fetchProjects(locale), fetchSkills(locale)]);
    const blogProjectsUrl = blogUrl(locale, "/projects/");

    return (
        <>
            <SiteHeader locale={locale} view="detail" />
            <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
                <section className="mb-20">
                    <p className="section-label mb-3">Software Engineer</p>
                    <h1 className="name-title text-5xl md:text-7xl tracking-tight">LemonDouble</h1>
                    <p className="mt-4 text-lg md:text-xl font-light text-[var(--text-primary)]">{dict.detail.tagline}</p>
                    <SocialLinks className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" />
                </section>

                <ProjectGroups groups={groupProjects(projects, dict)} dict={dict} />
                <p className="-mt-10 mb-20 text-sm text-[var(--text-secondary)]">
                    <Link href={blogProjectsUrl} target="_blank" className="underline hover:text-[var(--primary)] transition-colors">
                        {dict.detail.viewOnBlog}
                    </Link>
                </p>

                <SkillsSection skills={skills} dict={dict} blogSkillsUrl={blogUrl(locale, "/skills/")} />
            </main>
        </>
    );
}
