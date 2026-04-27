"use client"

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
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
    image?: string;
}

const statusStyles: Record<string, { color: string; bg: string; border: string }> = {
    "개발중": { color: "var(--primary)", bg: "var(--primary-dim)", border: "rgba(240, 185, 11, 0.25)" },
    "완료": { color: "var(--success)", bg: "rgba(74, 222, 128, 0.12)", border: "rgba(74, 222, 128, 0.25)" },
    "완료 (개인용)": { color: "var(--success)", bg: "rgba(74, 222, 128, 0.12)", border: "rgba(74, 222, 128, 0.25)" },
    "완료 (고도화 중)": { color: "var(--success)", bg: "rgba(74, 222, 128, 0.12)", border: "rgba(74, 222, 128, 0.25)" },
    "운영중": { color: "var(--secondary)", bg: "var(--secondary-dim)", border: "rgba(205, 107, 94, 0.25)" },
    "archived": { color: "var(--text-muted)", bg: "rgba(92, 82, 74, 0.2)", border: "rgba(92, 82, 74, 0.4)" },
    "드랍": { color: "var(--error)", bg: "rgba(239, 68, 68, 0.12)", border: "rgba(239, 68, 68, 0.25)" },
};

function StatusBadge({ status, dict }: { status: string; dict: Dictionary }) {
    const style = statusStyles[status] ?? statusStyles["archived"];
    const label = (dict.status as Record<string, string>)[status] ?? status;
    return (
        <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap"
            style={{ color: style.color, backgroundColor: style.bg, border: `1px solid ${style.border}` }}
        >
            {label}
        </span>
    );
}

function ProjectCard({ project, dict, onClick }: { project: Project; dict: Dictionary; onClick: () => void }) {
    return (
        <button
            type="button"
            className="project-card text-left flex flex-col bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden transition-all duration-150 cursor-pointer"
            onClick={onClick}
        >
            {project.image && (
                <div className="aspect-video overflow-hidden border-b border-[var(--border)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://blog.lemondouble.com/images/projects/${project.image}`}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="p-4 flex flex-col gap-2 flex-1">
                <h4 className="font-semibold text-sm text-[var(--text-primary)] leading-snug">
                    {project.name}
                </h4>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-2 flex-1">
                    {project.tagline}
                </p>
                <div className="flex gap-1.5 flex-wrap mt-auto">
                    <StatusBadge status={project.status} dict={dict} />
                    {project.private && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap"
                            style={{ color: "var(--text-secondary)", backgroundColor: "rgba(168, 158, 149, 0.12)", border: "1px solid rgba(168, 158, 149, 0.25)" }}>
                            {dict.projects.private}
                        </span>
                    )}
                    {project.fork_of && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap"
                            style={{ color: "var(--text-secondary)", backgroundColor: "rgba(168, 158, 149, 0.12)", border: "1px solid rgba(168, 158, 149, 0.25)" }}>
                            Fork
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}

function ProjectModal({ project, dict, onClose }: { project: Project; dict: Dictionary; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-[90%] max-w-[720px] max-h-[85vh] overflow-y-auto bg-[var(--surface)] border border-[var(--border)] rounded-xl z-[1]">
                <button
                    type="button"
                    onClick={onClose}
                    className="sticky top-0 float-right w-10 h-10 flex items-center justify-center text-2xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] cursor-pointer rounded-lg z-[2] mt-2 mr-2 bg-[rgba(28,24,22,0.8)] backdrop-blur-sm"
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="p-8">
                    {project.image && (
                        <div className="-mx-8 -mt-8 mb-6 border-b border-[var(--border)] overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://blog.lemondouble.com/images/projects/${project.image}`}
                                alt=""
                                className="w-full block"
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-3 mb-2 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-2">
                        <h2 className="galmuri font-bold text-[22px] text-[var(--text-primary)] flex-1 max-[480px]:text-lg">
                            {project.name}
                        </h2>
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-[var(--primary)] px-3 py-1 border rounded-md whitespace-nowrap transition-colors hover:bg-[rgba(240,185,11,0.2)]"
                                style={{ borderColor: "rgba(240, 185, 11, 0.25)", backgroundColor: "var(--primary-dim)" }}
                            >
                                GitHub ↗
                            </a>
                        )}
                    </div>

                    <p className="text-[15px] text-[var(--text-secondary)] mb-4 leading-relaxed">
                        {project.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-5 pb-5 border-b border-[var(--border)]">
                        <StatusBadge status={project.status} dict={dict} />
                        {project.private && (
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                                style={{ color: "var(--text-secondary)", backgroundColor: "rgba(168, 158, 149, 0.12)", border: "1px solid rgba(168, 158, 149, 0.25)" }}>
                                {dict.projects.private}
                            </span>
                        )}
                        {project.languages?.map(lang => (
                            <span key={lang} className="text-xs px-2.5 py-0.5 rounded-full text-[var(--text-secondary)] bg-[var(--surface-hover)] border border-[var(--border)]">
                                {lang}
                            </span>
                        ))}
                        {project.fork_of && (
                            <span className="text-sm text-[var(--text-secondary)]">
                                Fork:{" "}
                                <a href={`https://github.com/${project.fork_of}`} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
                                    {project.fork_of}
                                </a>
                            </span>
                        )}
                        {project.retrospective && (
                            <span className="text-sm text-[var(--text-secondary)]">
                                <a href={`https://blog.lemondouble.com${project.retrospective}`} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
                                    {project.retrospective}
                                </a>
                            </span>
                        )}
                    </div>

                    <div className="project-description text-sm leading-[1.8] text-[var(--text-secondary)]">
                        <Markdown
                            components={{
                                a: ({ children, href }) => (
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
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
        </div>
    );
}

export function ProjectsSection({ projects, dict, blogProjectsUrl }: { projects: Project[]; dict: Dictionary; blogProjectsUrl: string }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                dict={dict}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    dict={dict}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
}
