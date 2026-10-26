import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { blogUrl } from "@/lib/blog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
    const dict = getDictionary(locale);

    return (
        <header className="site-header">
            <Link href={localePath(locale)} className="site-logo galmuri">
                LemonDouble
            </Link>
            <div className="flex items-center gap-2">
                <a href={blogUrl(locale, "/projects/")} target="_blank" rel="noopener noreferrer" className="header-link">
                    {dict.nav.projects}
                </a>
                <LanguageSwitcher current={locale} label={dict.languageSwitcher.label} />
            </div>
        </header>
    );
}
