"use client"
import Image from "next/image";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import { Typewriter } from "react-simple-typewriter";

export function MobilePage() {
    return (
        <main className="mobile-page hidden w-screen min-h-screen absolute overflow-clip">
            {/* Decorative Background Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-blob rounded-full opacity-30 animate-pulse-slow" />
            <div className="absolute top-1/3 left-5 w-24 h-24 bg-blob-secondary rounded-full opacity-20" />

            <div className="relative z-10 px-6 pt-16 pb-[400px] text-center">
                <div className="animate-fade-in-up">
                    <div className="text-xl font-light text-gray-600 tracking-wide">
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                            cursorStyle="|"
                        />
                    </div>
                    <div className="mt-1">
                        <span className="text-4xl font-bold highlighter-yellow tracking-tight">
                            LemonDouble
                        </span>
                    </div>
                </div>

                <div className="mt-8 animate-fade-in-up-delay-1">
                    <div className="text-lg text-gray-700 font-light leading-relaxed">
                        <div>소프트웨어 엔지니어로서,</div>
                        <div>재밌는 걸 만드는걸 좋아해요.</div>
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-2">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Connect with me
                    </div>
                    <div className="flex flex-col space-y-2.5 max-w-xs mx-auto">
                        <SocialContactAddress imageSrc="/image/logo/twitter.webp" imageAlt="트위터 로고" socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                        <SocialContactAddress imageSrc="/image/logo/github.webp" imageAlt="깃허브 로고" socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                        <SocialContactAddress imageSrc="/image/logo/discord.webp" imageAlt="디스코드 로고" socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                        <SocialContactAddress imageSrc="/image/logo/blog.webp" imageAlt="블로그 로고" socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                        <SocialContactAddress imageSrc="/image/logo/misskey.webp" imageAlt="미스키 로고" socialId="@lemondouble@sns.lemondouble.com" socialHref="https://sns.lemondouble.com/@lemondouble" />
                    </div>
                </div>
            </div>

            {/* Character Section */}
            <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-to-t from-yellow-200/40 via-yellow-100/20 to-transparent rounded-t-full blur-lg" />
                <Image
                    className="relative mx-auto drop-shadow-xl animate-float"
                    src="/image/character/lemon-character.webp"
                    alt="캐릭터 이미지"
                    width={400} height={400}
                    loading="eager"
                    priority
                    style={{ marginBottom: '-60px' }}
                />
            </div>
        </main>
    )
}
