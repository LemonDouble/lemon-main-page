import Link from "next/link";
import type { Skill } from "@/lib/blog";
import type { Dictionary } from "@/lib/i18n";

const LEVELS: Skill["level"][] = ["primary", "secondary", "familiar"];

function SkillBadge({ skill }: { skill: Skill }) {
    const iconSrc = skill.custom_logo
        ? skill.custom_logo
        : `https://cdn.simpleicons.org/${skill.logo}/${skill.logo_color}`;

    return (
        <span
            className="skill-badge"
            style={{ ["--badge-color" as string]: `#${skill.color}` }}
            title={skill.note}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconSrc} alt="" width={14} height={14} loading="lazy" />
            <span>{skill.name}</span>
        </span>
    );
}

export function SkillsSection({ skills, dict, blogSkillsUrl }: { skills: Skill[]; dict: Dictionary; blogSkillsUrl: string }) {
    if (skills.length === 0) return null;

    const levelLabels = dict.skills.level;

    const categoryMap = new Map<
        string,
        { order: number; name: string; byLevel: Record<Skill["level"], Skill[]> }
    >();

    for (const skill of skills) {
        let bucket = categoryMap.get(skill.category_slug);
        if (!bucket) {
            bucket = {
                order: skill.category_order,
                name: skill.category,
                byLevel: { primary: [], secondary: [], familiar: [] },
            };
            categoryMap.set(skill.category_slug, bucket);
        }
        bucket.byLevel[skill.level].push(skill);
    }

    const categories = Array.from(categoryMap.entries())
        .sort(([, a], [, b]) => a.order - b.order);

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="section-label mb-2">Skills</h2>
            <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
                {dict.skills.intro}{" "}
                <Link
                    href={blogSkillsUrl}
                    target="_blank"
                    className="underline hover:text-[var(--primary)] transition-colors"
                >
                    {dict.detail.viewOnBlog}
                </Link>
            </p>

            <div className="skills-table-wrapper">
                <table className="skills-table">
                    <colgroup>
                        <col className="col-category" />
                        <col className="col-level" />
                        <col className="col-level" />
                        <col className="col-level" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            {LEVELS.map(level => (
                                <th key={level}>{levelLabels[level]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(([slug, category]) => (
                            <tr key={slug}>
                                <td className="skill-category-name">
                                    <strong>{category.name}</strong>
                                </td>
                                {LEVELS.map(level => (
                                    <td key={level} data-level={levelLabels[level]}>
                                        <div className="skill-badges">
                                            {category.byLevel[level].map(skill => (
                                                <SkillBadge key={skill.slug} skill={skill} />
                                            ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
