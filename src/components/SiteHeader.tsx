import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary, localePath, type Locale, type View } from "@/lib/i18n";

export function SiteHeader({ locale, view }: { locale: Locale; view: View }) {
    const dict = getDictionary(locale);
    const views: { key: View; label: string }[] = [
        { key: "story", label: dict.nav.story },
        { key: "detail", label: dict.nav.detail },
    ];

    return (
        <header className="site-header">
            <Link href={localePath(locale, "story")} className="site-logo galmuri">
                LemonDouble
            </Link>
            <div className="flex items-center gap-2">
                <nav aria-label={dict.nav.label} className="view-toggle">
                    {views.map(item => (
                        <Link
                            key={item.key}
                            href={localePath(locale, item.key)}
                            className={`view-toggle-item${item.key === view ? " active" : ""}`}
                            data-view={item.key}
                            aria-current={item.key === view ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <LanguageSwitcher current={locale} view={view} label={dict.languageSwitcher.label} />
            </div>
        </header>
    );
}
