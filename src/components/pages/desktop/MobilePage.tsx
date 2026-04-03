"use client"
import Image from "next/image";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import { Typewriter } from "react-simple-typewriter";

export function MobilePage() {
    return (
        <main className="mobile-page hidden w-screen min-h-screen absolute overflow-x-clip">
            <div className="relative z-10 px-6 pt-16 pb-8 text-center">
                <div className="animate-fade-in-up">
                    <div className="text-lg font-light tracking-wide pixel-text" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent)' }}>{'> '}</span>
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                            cursorStyle="_"
                        />
                    </div>
                    <div className="mt-1">
                        <span className="text-4xl font-bold highlighter-neon tracking-tight">
                            LemonDouble
                        </span>
                    </div>
                </div>

                <div className="mt-8 animate-fade-in-up-delay-1">
                    <div className="text-base mb-1 pixel-text" style={{ color: 'var(--accent-secondary)' }}>Software Engineer</div>
                    <div className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        재밌는 걸 만드는걸 좋아해요.
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-2">
                    <div className="text-xs font-medium uppercase tracking-wider mb-3 pixel-text" style={{ color: 'var(--accent)' }}>
                        &#9733; Connect with me
                    </div>
                    <div className="flex flex-col space-y-2.5 max-w-xs mx-auto">
                        <SocialContactAddress imageSrc="/image/logo/twitter.webp" imageAlt="트위터 로고" socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                        <SocialContactAddress imageSrc="/image/logo/github.webp" imageAlt="깃허브 로고" socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                        <SocialContactAddress imageSrc="/image/logo/discord.webp" imageAlt="디스코드 로고" socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                        <SocialContactAddress imageSrc="/image/logo/blog.webp" imageAlt="블로그 로고" socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                    </div>
                </div>
            </div>

            {/* Character Section - in flow, no overlap */}
            <div className="relative w-full flex justify-center overflow-hidden animate-fade-in-up-delay-3">
                <div className="animate-float">
                <div className="crt-image">
                <Image
                    className="relative mx-auto object-contain"
                    src="/image/character/lemon-character.webp"
                    alt="캐릭터 이미지"
                    width={350} height={400}
                    loading="eager"
                    priority
                    style={{ marginBottom: '-40px' }}
                />
                </div>
                </div>
            </div>
        </main>
    )
}
