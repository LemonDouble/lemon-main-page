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
            className="social-link flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
            <div className="flex-shrink-0 w-8 h-8 relative">
                <Image
                    className="rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300"
                    src={props.imageSrc}
                    alt={props.imageAlt}
                    width={32}
                    height={32}
                />
            </div>
            <span className="text-base font-medium text-gray-700 group-hover:text-yellow-600 transition-colors duration-300">
                {props.socialId}
            </span>
            <svg
                className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all duration-300 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    )
}
