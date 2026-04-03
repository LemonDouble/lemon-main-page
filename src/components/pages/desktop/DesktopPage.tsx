"use client"
import { Typewriter } from "react-simple-typewriter";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import Image from "next/image";

export function DesktopPage() {
    return (
        <main className="desktop-page hidden w-screen h-screen fixed inset-0 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blob rounded-full opacity-40 animate-pulse-slow" />
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blob-secondary rounded-full opacity-30" />

            <div className="ml-20 relative z-10 h-full flex flex-col justify-center">
                <div className="animate-fade-in-up">
                    <div className="text-4xl font-light text-gray-600 tracking-wide">
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                            cursorStyle="|"
                        />
                    </div>
                    <div className="mt-2">
                        <span className="text-8xl font-bold highlighter-yellow tracking-tight">
                            LemonDouble
                        </span>
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-1">
                    <div className="text-xl text-gray-500 mb-1">Software Engineer</div>
                    <div className="text-2xl text-gray-700 font-light leading-relaxed">
                        재미있는 걸 만드는걸 좋아해요.
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-2">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Connect with me
                    </div>
                    <div className="flex flex-col space-y-2 max-w-sm">
                        <SocialContactAddress imageSrc="/image/logo/twitter.webp" imageAlt="트위터 로고" socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                        <SocialContactAddress imageSrc="/image/logo/github.webp" imageAlt="깃허브 로고" socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                        <SocialContactAddress imageSrc="/image/logo/discord.webp" imageAlt="디스코드 로고" socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                        <SocialContactAddress imageSrc="/image/logo/blog.webp" imageAlt="블로그 로고" socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                        <SocialContactAddress imageSrc="/image/logo/misskey.webp" imageAlt="미스키 로고" socialId="@lemondouble@sns.lemondouble.com" socialHref="https://sns.lemondouble.com/@lemondouble" />
                    </div>
                </div>
            </div>

            {/* Character Section */}
            <div className="absolute -right-16 -bottom-20 animate-fade-in-up-delay-3">
                <div className="w-[65rem] h-[65rem] bg-gradient-to-br from-yellow-200/60 via-yellow-100/40 to-orange-100/30 rounded-full blur-sm" />
            </div>
            <Image
                className="w-auto h-[50rem] right-0 -bottom-10 absolute animate-float drop-shadow-2xl object-contain"
                src="/image/character/lemon-character.webp"
                alt="캐릭터 이미지"
                width={1235} height={1415}
                loading="eager"
                priority
            />
        </main>
    )
}
