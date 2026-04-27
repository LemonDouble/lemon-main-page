"use client"

import { useState } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { SiGithub } from "@icons-pack/react-simple-icons";
import type { Dictionary } from "@/lib/i18n";

export interface Project {
    name: string;
    slug: string;
    tagline: string;
    description: string;
    status: string;
    year: number;
    languages: string[];
    url: string | null;
    private: boolean;
    featured: boolean;
    fork_of?: string;
    retrospective?: string;
}

const statusStyles: Record<string, { color: string; bg: string }> = {
    "개발중": { color: "var(--primary)", bg: "var(--primary-dim)" },
    "완료": { color: "var(--success)", bg: "rgba(74, 222, 128, 0.12)" },
    "완료 (개인용)": { color: "var(--success)", bg: "rgba(74, 222, 128, 0.12)" },
    "완료 (고도화 중)": { color: "var(--success)", bg: "rgba(74, 222, 128, 0.12)" },
    "운영중": { color: "var(--secondary)", bg: "var(--secondary-dim)" },
    "archived": { color: "var(--text-muted)", bg: "rgba(92, 82, 74, 0.2)" },
    "드랍": { color: "var(--error)", bg: "rgba(239, 68, 68, 0.12)" },
};

function ProjectCard({ project, dict }: { project: Project; dict: Dictionary }) {
    const [expanded, setExpanded] = useState(false);
    const status = statusStyles[project.status] ?? statusStyles["archived"];
    const statusLabel = (dict.status as Record<string, string>)[project.status] ?? project.status;

    return (
        <div
            className="project-card p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl transition-all duration-200 cursor-pointer select-none"
            onClick={() => setExpanded(prev => !prev)}
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-sm text-[var(--text-primary)] truncate min-w-0">
                    {project.name}
                    {project.fork_of && (
                        <span className="text-xs font-normal text-[var(--text-muted)]"> (Fork)</span>
                    )}
                </h4>
                <div className="flex items-center gap-2 shrink-0">
                    {project.url && (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            <SiGithub size={14} />
                        </a>
                    )}
                    <span
                        className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{ color: status.color, backgroundColor: status.bg }}
                    >
                        {statusLabel}
                    </span>
                </div>
            </div>

            <p className="text-xs leading-relaxed text-[var(--text-secondary)] mb-3 line-clamp-2">
                {project.tagline}
            </p>

            <div
                className="description-expand"
                style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden">
                    <div className="project-description text-xs leading-relaxed text-[var(--text-secondary)] mb-3 pt-2 border-t border-[var(--border)]">
                        <Markdown
                            components={{
                                a: ({ children, href }) => (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={e => e.stopPropagation()}
                                        className="text-[var(--primary)] underline hover:opacity-80"
                                    >
                                        {children}
                                    </a>
                                ),
                            }}
                        >
                            {project.description}
                        </Markdown>
                    </div>
                </div>
            </div>

            <div className="flex gap-1.5 flex-wrap">
                {project.languages?.map(lang => (
                    <span
                        key={lang}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ color: "var(--primary)", backgroundColor: "var(--primary-dim)" }}
                    >
                        {lang}
                    </span>
                ))}
                {project.private && (
                    <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ color: "var(--secondary)", backgroundColor: "var(--secondary-dim)" }}
                    >
                        {dict.projects.private}
                    </span>
                )}
            </div>
        </div>
    );
}

export function ProjectsSection({ projects, dict, blogProjectsUrl }: { projects: Project[]; dict: Dictionary; blogProjectsUrl: string }) {
    if (projects.length === 0) return null;

    const grouped = projects.reduce<Record<number, Project[]>>((acc, p) => {
        (acc[p.year] ??= []).push(p);
        return acc;
    }, {});

    const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="section-label mb-2">Projects</div>
            <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
                {dict.projects.intro}{" "}
                <Link
                    href={blogProjectsUrl}
                    target="_blank"
                    className="underline hover:text-[var(--primary)] transition-colors"
                >
                    {dict.projects.viewMore}
                </Link>
            </p>

            {years.map(year => (
                <div key={year} className="mb-12 last:mb-0">
                    <h3 className="text-xl galmuri mb-4" style={{ color: "var(--primary)" }}>
                        {year}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {grouped[year].map(project => (
                            <ProjectCard key={project.slug} project={project} dict={dict} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
