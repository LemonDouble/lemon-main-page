"use client";

import { useState } from "react";
import { ProjectsSection, Project } from "./ProjectsSection";
import { SkillsSection, Skill } from "./SkillsSection";

type TabKey = "projects" | "skills";

const TABS: { key: TabKey; label: string; count: (p: Project[], s: Skill[]) => number }[] = [
    { key: "projects", label: "Projects", count: p => p.length },
    { key: "skills", label: "Skills", count: (_p, s) => s.length },
];

export function PortfolioTabs({ projects, skills }: { projects: Project[]; skills: Skill[] }) {
    const [active, setActive] = useState<TabKey>("projects");

    return (
        <section className="py-20 px-6 md:px-12 xl:px-20">
            <div className="max-w-6xl mx-auto mb-10">
                <div className="portfolio-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            type="button"
                            className={`portfolio-tab galmuri ${active === tab.key ? "active" : ""}`}
                            onClick={() => setActive(tab.key)}
                        >
                            <span>{tab.label}</span>
                            <span className="portfolio-tab-count">{tab.count(projects, skills)}</span>
                        </button>
                    ))}
                </div>
            </div>

            {active === "projects" && <ProjectsSection projects={projects} />}
            {active === "skills" && <SkillsSection skills={skills} />}
        </section>
    );
}
