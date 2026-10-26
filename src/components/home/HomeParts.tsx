import Image from "next/image";
import { blogUrl } from "@/lib/blog";
import type { Dictionary, Locale } from "@/lib/i18n";
import { OPEN_SOURCE, TECH_STACK, pullRequestUrl, type Field } from "@/lib/profile";

export function HeroText({ dict }: { dict: Dictionary }) {
    return (
        <div className="hero-text">
            <p className="hero-greeting">{dict.hero.greeting}</p>
            <h1 className="hero-name galmuri">LemonDouble</h1>
            <p className="hero-tagline">{dict.hero.tagline}</p>
            <p className="hero-body">{dict.hero.body}</p>
        </div>
    );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="section-title galmuri">{children}</h2>;
}

export function FieldItem({ field, dict }: { field: Field; dict: Dictionary }) {
    const Icon = field.icon;
    const text = dict.fields[field.key];

    return (
        <article>
            <div className="field-heading">
                <span className="field-icon">
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="field-label galmuri">{text.label}</span>
            </div>
            <h3 className="field-title">{text.title}</h3>
            <p className="field-body">{text.body}</p>
            {field.projects.length > 0 && (
                <ul className="project-list">
                    {field.projects.map(project => (
                        <li key={project.id}>
                            {project.url ? (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-chip">{project.name}</a>
                            ) : (
                                <span className="project-chip">{project.name}</span>
                            )}
                            <span className="project-description">{dict.projects[project.id]}</span>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}

export function TechStackList({ dict }: { dict: Dictionary }) {
    return (
        <dl className="tech-stack">
            {TECH_STACK.map(group => (
                <div key={group.category} className="tech-stack-row">
                    <dt>{dict.techStack.categories[group.category]}</dt>
                    <dd>
                        {group.items.map(item => (
                            <span key={item} className="tech-chip">{item}</span>
                        ))}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

export function OpenSourceList({ dict }: { dict: Dictionary }) {
    return (
        <ul className="open-source">
            {OPEN_SOURCE.map(contribution => (
                <li key={contribution.id}>
                    <a href={pullRequestUrl(contribution)} target="_blank" rel="noopener noreferrer">
                        <span className="open-source-repository">{contribution.repository}</span>
                        <span className="open-source-description">{dict.openSource.contributions[contribution.id]}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export function Certification() {
    return (
        <div className="certification">
            <Image src="/image/aws-saa.webp" alt="" width={240} height={240} className="certification-badge" />
            <span>AWS Certified Solutions Architect – Associate</span>
        </div>
    );
}

export function Contact({ dict, locale }: { dict: Dictionary; locale: Locale }) {
    return (
        <section className="contact">
            <h2 className="contact-title">{dict.contact.title}</h2>
            <p className="contact-body">{dict.contact.body}</p>
            <a href={blogUrl(locale, "/projects/")} target="_blank" rel="noopener noreferrer" className="contact-cta">
                {dict.contact.cta} →
            </a>
        </section>
    );
}
