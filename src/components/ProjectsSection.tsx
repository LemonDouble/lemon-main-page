"use client"

import { useState } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { SiGithub } from "@icons-pack/react-simple-icons";

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
    "운영중": { color: "var(--secondary)", bg: "var(--secondary-dim)" },
    "archived": { color: "var(--text-muted)", bg: "rgba(92, 82, 74, 0.2)" },
    "드랍": { color: "var(--error)", bg: "rgba(239, 68, 68, 0.12)" },
};

function ProjectCard({ project }: { project: Project }) {
    const [expanded, setExpanded] = useState(false);
    const status = statusStyles[project.status] ?? statusStyles["archived"];

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
                        {project.status}
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
                        비공개
                    </span>
                )}
            </div>
        </div>
    );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
    if (projects.length === 0) return null;

    const grouped = projects.reduce<Record<number, Project[]>>((acc, p) => {
        (acc[p.year] ??= []).push(p);
        return acc;
    }, {});

    const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);

    return (
        <section className="py-20 px-6 md:px-12 xl:px-20">
            <div className="max-w-6xl mx-auto">
                <div className="section-label mb-2">Projects</div>
                <p className="text-sm mb-12" style={{ color: "var(--text-secondary)" }}>
                    여태까지 만들었던 프로젝트들이에요.{" "}
                    <Link
                        href="https://blog.lemondouble.com/projects/"
                        target="_blank"
                        className="underline hover:text-[var(--primary)] transition-colors"
                    >
                        자세히 보기 →
                    </Link>
                </p>

                {years.map(year => (
                    <div key={year} className="mb-12 last:mb-0">
                        <h3 className="text-xl galmuri mb-4" style={{ color: "var(--primary)" }}>
                            {year}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {grouped[year].map(project => (
                                <ProjectCard key={project.slug} project={project} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
