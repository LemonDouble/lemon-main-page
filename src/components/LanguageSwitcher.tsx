"use client";

import { useEffect, useRef, useState } from "react";
import { SUPPORTED_LOCALES, localePath, type Locale } from "@/lib/i18n";

const LOCALE_LABELS: Record<Locale, string> = {
    ko: "한국어",
    en: "English",
};

export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("click", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <div ref={containerRef} className="lang-switcher">
            <button
                type="button"
                className="lang-switcher-btn"
                aria-label={label}
                aria-haspopup="true"
                aria-expanded={open}
                onClick={e => {
                    e.stopPropagation();
                    setOpen(o => !o);
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="lang-switcher-current">{LOCALE_LABELS[current]}</span>
                <svg className={`lang-switcher-chev${open ? " open" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            {open && (
                <div className="lang-switcher-menu" role="menu">
                    {SUPPORTED_LOCALES.map(locale => (
                        <a
                            key={locale}
                            href={localePath(locale)}
                            className={`lang-switcher-item${locale === current ? " active" : ""}`}
                            lang={locale}
                            role="menuitem"
                        >
                            {LOCALE_LABELS[locale]}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
