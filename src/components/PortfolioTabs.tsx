"use client";

import { useState } from "react";
import { ProjectsSection, Project } from "./ProjectsSection";
import { SkillsSection, Skill } from "./SkillsSection";
import type { Dictionary } from "@/lib/i18n";

type TabKey = "projects" | "skills";

export function PortfolioTabs({
    projects,
    skills,
    dict,
    blogProjectsUrl,
    blogSkillsUrl,
}: {
    projects: Project[];
    skills: Skill[];
    dict: Dictionary;
    blogProjectsUrl: string;
    blogSkillsUrl: string;
}) {
    const [active, setActive] = useState<TabKey>("projects");

    const tabs: { key: TabKey; label: string; count: number }[] = [
        { key: "projects", label: dict.portfolio.tabProjects, count: projects.length },
        { key: "skills", label: dict.portfolio.tabSkills, count: skills.length },
    ];

    return (
        <section className="py-20 px-6 md:px-12 xl:px-20">
            <div className="max-w-6xl mx-auto mb-10">
                <div className="portfolio-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            type="button"
                            className={`portfolio-tab galmuri ${active === tab.key ? "active" : ""}`}
                            onClick={() => setActive(tab.key)}
                        >
                            <span>{tab.label}</span>
                            <span className="portfolio-tab-count">{tab.count}</span>
                        </button>
                    ))}
                </div>
            </div>

            {active === "projects" && (
                <ProjectsSection projects={projects} dict={dict} blogProjectsUrl={blogProjectsUrl} />
            )}
            {active === "skills" && (
                <SkillsSection skills={skills} dict={dict} blogSkillsUrl={blogSkillsUrl} />
            )}
        </section>
    );
}
