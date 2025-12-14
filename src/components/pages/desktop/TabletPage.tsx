"use client"
import { Typewriter } from "react-simple-typewriter";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import Image from "next/image";

export function TabletPage() {
    return (
        <main className="tablet-page hidden w-screen min-h-screen h-auto absolute overflow-clip">
            {/* Decorative Background Elements */}
            <div className="absolute top-10 left-10 w-48 h-48 bg-blob rounded-full opacity-30 animate-pulse-slow" />

            <div className="ml-12 relative z-10">
                <div className="mt-16 animate-fade-in-up">
                    <div className="text-3xl font-light text-gray-600 tracking-wide">
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                            cursorStyle="|"
                        />
                    </div>
                    <div className="mt-2">
                        <span className="text-6xl font-bold highlighter-yellow tracking-tight">
                            LemonDouble
                        </span>
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-1">
                    <div className="text-lg text-gray-500 mb-1">Software Engineer</div>
                    <div className="text-xl text-gray-700 font-light leading-relaxed">
                        재미있는 걸 만드는걸 좋아해요.
                    </div>
                </div>

                <div className="mt-12 animate-fade-in-up-delay-2">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Connect with me
                    </div>
                    <div className="flex flex-col space-y-2.5 max-w-xs">
                        <SocialContactAddress imageSrc="/image/logo/twitter.webp" imageAlt="트위터 로고" socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                        <SocialContactAddress imageSrc="/image/logo/github.webp" imageAlt="깃허브 로고" socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                        <SocialContactAddress imageSrc="/image/logo/discord.webp" imageAlt="디스코드 로고" socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                        <SocialContactAddress imageSrc="/image/logo/blog.webp" imageAlt="블로그 로고" socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                        <SocialContactAddress imageSrc="/image/logo/misskey.webp" imageAlt="미스키 로고" socialId="@lemondouble@sns.lemondouble.com" socialHref="https://sns.lemondouble.com/@lemondouble" />
                    </div>
                </div>
            </div>

            {/* Character Section */}
            <div className="absolute -right-32 -bottom-32">
                <div className="w-[55rem] h-[55rem] bg-gradient-to-br from-yellow-200/50 via-yellow-100/30 to-orange-100/20 rounded-full blur-sm" />
            </div>
            <Image
                className="w-[38rem] h-[38rem] -right-16 -bottom-16 absolute animate-float drop-shadow-xl"
                src="/image/character/lemon-character.webp"
                alt="캐릭터 이미지"
                width={608} height={608}
                loading="eager"
                priority
            />
        </main>
    )
}
