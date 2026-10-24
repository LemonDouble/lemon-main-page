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
                <nav aria-label={dict.nav.label} className="view-toggle">
                    <Link href={localePath(locale)} className="view-toggle-item active" aria-current="page">
                        {dict.nav.story}
                    </Link>
                    <a
                        href={blogUrl(locale, "/projects/")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-toggle-item"
                        data-view="detail"
                    >
                        {dict.nav.detail}
                    </a>
                </nav>
                <LanguageSwitcher current={locale} label={dict.languageSwitcher.label} />
            </div>
        </header>
    );
}
