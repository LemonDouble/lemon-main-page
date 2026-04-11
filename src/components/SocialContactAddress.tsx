import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    icon: ReactNode
    socialId: string
    socialHref: string
}

export function SocialContactAddress(props: Props) {
    return (
        <Link
            href={props.socialHref}
            target="_blank"
            className="social-link flex items-center space-x-3 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] transition-all duration-200 group"
        >
            <div className="flex-shrink-0 w-6 h-6 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-200">
                {props.icon}
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors duration-200">
                {props.socialId}
            </span>
            <svg
                className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all duration-200 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    )
}
