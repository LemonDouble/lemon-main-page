import {DesktopPage} from "@/components/pages/desktop/DesktopPage";
import {MobilePage} from "@/components/pages/desktop/MobilePage";
import {TabletPage} from "@/components/pages/desktop/TabletPage";
import {PortfolioTabs} from "@/components/PortfolioTabs";
import {Project} from "@/components/ProjectsSection";
import {Skill} from "@/components/SkillsSection";

async function fetchJson<T>(url: string): Promise<T[]> {
    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export default async function Home() {
    const [projects, skills] = await Promise.all([
        fetchJson<Project>('https://blog.lemondouble.com/projects/index.json'),
        fetchJson<Skill>('https://blog.lemondouble.com/skills/index.json'),
    ]);

    return(
        <>
            <MobilePage />
            <TabletPage />
            <DesktopPage />
            <PortfolioTabs projects={projects} skills={skills} />
        </>
    )
}
