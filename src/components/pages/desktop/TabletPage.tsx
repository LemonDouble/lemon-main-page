"use client"
import { Typewriter } from "react-simple-typewriter";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import Image from "next/image";

export function TabletPage() {
    return (
        <main className="tablet-page hidden w-screen min-h-screen h-auto absolute overflow-clip">
            <div className="ml-12 relative z-10">
                <div className="mt-16 animate-fade-in-up">
                    <div className="text-2xl font-light tracking-wide pixel-text" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent)' }}>{'> '}</span>
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                            cursorStyle="_"
                        />
                    </div>
                    <div className="mt-2">
                        <span className="text-6xl font-bold highlighter-neon tracking-tight">
                            LemonDouble
                        </span>
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-1">
                    <div className="text-lg mb-1 pixel-text" style={{ color: 'var(--accent-secondary)' }}>Software Engineer</div>
                    <div className="text-xl font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        재미있는 걸 만드는걸 좋아해요.
                    </div>
                </div>

                <div className="mt-12 animate-fade-in-up-delay-2">
                    <div className="text-sm font-medium uppercase tracking-wider mb-3 pixel-text" style={{ color: 'var(--accent)' }}>
                        &#9733; Connect with me
                    </div>
                    <div className="flex flex-col space-y-2.5 max-w-xs">
                        <SocialContactAddress imageSrc="/image/logo/twitter.webp" imageAlt="트위터 로고" socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                        <SocialContactAddress imageSrc="/image/logo/github.webp" imageAlt="깃허브 로고" socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                        <SocialContactAddress imageSrc="/image/logo/discord.webp" imageAlt="디스코드 로고" socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                        <SocialContactAddress imageSrc="/image/logo/blog.webp" imageAlt="블로그 로고" socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                    </div>
                </div>
            </div>

            {/* Character Section */}
            <div className="absolute -right-16 -bottom-16 animate-fade-in-up-delay-3">
                <div className="animate-float">
                <div className="crt-image">
                    <Image
                        className="w-auto h-[38rem] object-contain"
                        src="/image/character/lemon-character.webp"
                        alt="캐릭터 이미지"
                        width={1235} height={1415}
                        loading="eager"
                        priority
                        />
                </div>
                </div>
            </div>
        </main>
    )
}
