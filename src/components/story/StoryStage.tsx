"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode, type RefObject } from "react";
import { StoryCanvas } from "@/components/story/StoryCanvas";
import { STORY_SCENES, type Scene } from "@/components/story/scenes";
import { SCENE_COUNT, SCROLL_PX_PER_SCENE, clamp01, getSceneState, getTimeline, type SceneState } from "@/components/story/timeline";
import type { Dictionary } from "@/lib/i18n";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function useStoryPosition(containerRef: RefObject<HTMLDivElement | null>): number {
    const [position, setPosition] = useState(0);

    useEffect(() => {
        let frame = 0;

        function update() {
            frame = 0;
            const container = containerRef.current;
            if (!container) return;
            const scrolled = Math.max(0, -container.getBoundingClientRect().top);
            setPosition(Math.min(scrolled / SCROLL_PX_PER_SCENE, SCENE_COUNT - 0.001));
        }

        function requestUpdate() {
            if (!frame) frame = requestAnimationFrame(update);
        }

        requestUpdate();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
        };
    }, [containerRef]);

    return position;
}

function subscribeReducedMotion(onChange: () => void) {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
    return useSyncExternalStore(
        subscribeReducedMotion,
        () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
        () => false,
    );
}

function BloomText({ as: Tag, text, shown, className }: { as: "h1" | "h2"; text: string; shown: boolean; className: string }) {
    const words = text.split(" ");
    let characterIndex = 0;

    return (
        <Tag className={`bloom ${shown ? "is-shown" : ""} ${className}`} aria-label={text}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="bloom-word" aria-hidden="true">
                    {Array.from(word).map((character, position) => (
                        <span key={position} className="bloom-character" style={{ "--bloom-index": characterIndex++ } as CSSProperties}>
                            {character}
                        </span>
                    ))}
                    {wordIndex < words.length - 1 && " "}
                </span>
            ))}
        </Tag>
    );
}

function MagicLine({ path, progress }: { path: string; progress: number }) {
    return (
        <svg className="story-magic-line" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d={path} pathLength={1} style={{ strokeDashoffset: 1 - progress }} />
        </svg>
    );
}

function SceneView({
    scene,
    index,
    state,
    dict,
    detailPath,
    socialLinks,
}: {
    scene: Scene;
    index: number;
    state: SceneState;
    dict: Dictionary;
    detailPath: string;
    socialLinks: ReactNode;
}) {
    const text = dict.story.scenes[scene.key];
    const isVisible = state.imageOpacity > 0 || state.textOpacity > 0;
    const isTextShown = state.textOpacity > 0.5;

    return (
        <section className="story-scene" style={{ visibility: isVisible ? "visible" : "hidden" }}>
            <div style={{ opacity: state.imageOpacity }}>
                {scene.magicLinePath && <MagicLine path={scene.magicLinePath} progress={state.lineProgress} />}
            </div>

            <div className="story-copy" style={{ opacity: state.textOpacity, visibility: state.textOpacity > 0 ? "visible" : "hidden" }}>
                <BloomText
                    as={index === 0 ? "h1" : "h2"}
                    text={text.title}
                    shown={isTextShown}
                    className={index === 0 ? "story-heading story-heading-name" : "story-heading"}
                />
                <div className={`story-panel ${isTextShown ? "is-shown" : ""}`}>
                    <p className="story-body">{text.body.replace("{detail}", dict.nav.detail)}</p>

                    {scene.projects.length > 0 && (
                        <ul className="story-projects">
                            {scene.projects.map(project => (
                                <li key={project.id}>
                                    {project.githubUrl ? (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="story-project-name">
                                            <SiGithub size={11} aria-hidden="true" />
                                            {project.name}
                                        </a>
                                    ) : (
                                        <span className="story-project-name">{project.name}</span>
                                    )}
                                    <span className="story-project-description">
                                        {dict.story.projects[project.id]}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {scene.key === "contact" && (
                        <div className="mt-5 flex flex-col gap-4">
                            {socialLinks}
                            <Link href={detailPath} className="story-cta">
                                {dict.story.scenes.contact.cta}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export function StoryStage({
    dict,
    detailPath,
    socialLinks,
}: {
    dict: Dictionary;
    detailPath: string;
    socialLinks: ReactNode;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const position = useStoryPosition(containerRef);
    const reducedMotion = usePrefersReducedMotion();
    const timeline = getTimeline(position, reducedMotion);
    const isFinale = timeline.activeIndex === SCENE_COUNT - 1;

    // 마지막 장면에서 헤더의 상세 페이지 버튼을 강조한다. 헤더는 이 컴포넌트 밖에 있다.
    useEffect(() => {
        document.documentElement.toggleAttribute("data-story-finale", isFinale);
        return () => document.documentElement.removeAttribute("data-story-finale");
    }, [isFinale]);

    function scrollToScene(index: number) {
        const container = containerRef.current;
        if (!container) return;
        const containerTop = container.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: containerTop + index * SCROLL_PX_PER_SCENE, behavior: reducedMotion ? "auto" : "smooth" });
    }

    return (
        <div ref={containerRef} className="story" style={{ height: `calc(${SCENE_COUNT * SCROLL_PX_PER_SCENE}px + 100svh)` }}>
            <div className="story-stage">
                <div className="story-progress-bar" style={{ transform: `scaleX(${position / SCENE_COUNT})` }} />

                <div className="story-frame">
                    <StoryCanvas position={position} reducedMotion={reducedMotion} label={dict.story.characterAlt} />

                    {STORY_SCENES.map((scene, index) => (
                        <SceneView
                            key={scene.key}
                            scene={scene}
                            index={index}
                            state={getSceneState(index, timeline)}
                            dict={dict}
                            detailPath={detailPath}
                            socialLinks={socialLinks}
                        />
                    ))}

                    <nav className="story-hud story-dots" aria-label={dict.nav.label}>
                        {STORY_SCENES.map((scene, index) => (
                            <button
                                key={scene.key}
                                type="button"
                                className={index === timeline.activeIndex ? "active" : index < timeline.activeIndex ? "visited" : ""}
                                aria-label={dict.story.scenes[scene.key].title}
                                aria-current={index === timeline.activeIndex ? "step" : undefined}
                                onClick={() => scrollToScene(index)}
                            />
                        ))}
                    </nav>

                    <p className="story-hud story-counter galmuri" aria-hidden="true">
                        {String(timeline.activeIndex + 1).padStart(2, "0")} / {String(SCENE_COUNT).padStart(2, "0")}
                    </p>

                    <div className="story-scroll-hint" style={{ opacity: 1 - clamp01(position * 4) }} aria-hidden="true">
                        <span>{dict.story.scrollHint}</span>
                        <span className="story-scroll-hint-line" />
                    </div>
                </div>
            </div>
        </div>
    );
}
