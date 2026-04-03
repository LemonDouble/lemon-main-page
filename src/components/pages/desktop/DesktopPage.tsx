"use client"
import { Typewriter } from "react-simple-typewriter";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import Image from "next/image";

export function DesktopPage() {
    return (
        <main className="desktop-page hidden w-screen h-screen fixed inset-0 overflow-hidden">
            <div className="ml-20 relative z-10 h-full flex flex-col justify-center">
                <div className="animate-fade-in-up">
                    <div className="text-3xl font-light tracking-wide pixel-text" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent)' }}>{'> '}</span>
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                            cursorStyle="_"
                        />
                    </div>
                    <div className="mt-2">
                        <span className="text-8xl font-bold highlighter-neon tracking-tight">
                            LemonDouble
                        </span>
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-1">
                    <div className="text-xl mb-1 pixel-text" style={{ color: 'var(--accent-secondary)' }}>Software Engineer</div>
                    <div className="text-2xl font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        재미있는 걸 만드는걸 좋아해요.
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-2">
                    <div className="text-sm font-medium uppercase tracking-wider mb-3 pixel-text" style={{ color: 'var(--accent)' }}>
                        &#9733; Connect with me
                    </div>
                    <div className="flex flex-col space-y-2 max-w-sm">
                        <SocialContactAddress imageSrc="/image/logo/twitter.webp" imageAlt="트위터 로고" socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                        <SocialContactAddress imageSrc="/image/logo/github.webp" imageAlt="깃허브 로고" socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                        <SocialContactAddress imageSrc="/image/logo/discord.webp" imageAlt="디스코드 로고" socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                        <SocialContactAddress imageSrc="/image/logo/blog.webp" imageAlt="블로그 로고" socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                    </div>
                </div>
            </div>

            {/* Character Section */}
            <div className="absolute right-0 -bottom-10 animate-fade-in-up-delay-3">
                <div className="animate-float">
                <div className="crt-image">
                    <Image
                        className="w-auto h-[50rem] object-contain"
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
