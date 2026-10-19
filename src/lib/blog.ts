import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

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

export interface Skill {
    category: string;
    category_order: number;
    category_slug: string;
    color: string;
    level: "primary" | "secondary" | "familiar";
    logo: string;
    logo_color: "white" | "black";
    name: string;
    slug: string;
    custom_logo?: string;
    note?: string;
}

export const BLOG_BASE = "https://blog.lemondouble.com";

const REVALIDATE_SECONDS = 3600;

export function blogUrl(locale: Locale, path: string): string {
    const localePrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
    return `${BLOG_BASE}${localePrefix}${path}`;
}

async function fetchJson<T>(url: string): Promise<T[]> {
    try {
        const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
        if (!response.ok) return [];
        return response.json();
    } catch {
        return [];
    }
}

export function fetchProjects(locale: Locale): Promise<Project[]> {
    return fetchJson<Project>(blogUrl(locale, "/projects/index.json"));
}

export function fetchSkills(locale: Locale): Promise<Skill[]> {
    return fetchJson<Skill>(blogUrl(locale, "/skills/index.json"));
}
