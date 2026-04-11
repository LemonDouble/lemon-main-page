import {DesktopPage} from "@/components/pages/desktop/DesktopPage";
import {MobilePage} from "@/components/pages/desktop/MobilePage";
import {TabletPage} from "@/components/pages/desktop/TabletPage";
import {ProjectsSection, Project} from "@/components/ProjectsSection";

async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch('https://blog.lemondouble.com/projects/index.json', {
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export default async function Home() {
    const projects = await getProjects();

    return(
        <>
            <MobilePage />
            <TabletPage />
            <DesktopPage />
            <ProjectsSection projects={projects} />
        </>
    )
}
