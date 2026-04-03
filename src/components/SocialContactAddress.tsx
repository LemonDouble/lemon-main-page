import Image from "next/image";
import Link from "next/link";

interface Props {
    imageSrc: string
    imageAlt: string
    socialId: string
    socialHref: string
}

export function SocialContactAddress(props: Props) {
    return (
        <Link
            href={props.socialHref}
            target="_blank"
            className="social-link flex items-center space-x-3 px-4 py-3 bg-[var(--bg-card)] border-2 border-[var(--border-dim)] hover:border-[var(--accent)] hover:bg-[var(--bg-card-hover)] transition-all duration-200 group"
        >
            <div className="flex-shrink-0 w-8 h-8 relative">
                <Image
                    className="group-hover:scale-110 transition-transform duration-200 brightness-110"
                    src={props.imageSrc}
                    alt={props.imageAlt}
                    width={32}
                    height={32}
                />
            </div>
            <span className="text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 pixel-text">
                {props.socialId}
            </span>
            <svg
                className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-secondary)] group-hover:translate-x-1 transition-all duration-200 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    )
}
