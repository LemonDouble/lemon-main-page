"use client"
import Image from "next/image";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import { Typewriter } from "react-simple-typewriter";

export function MobilePage() {

    return (
        <main className="mobile-page hidden w-screen min-h-screen absolute overflow-clip text-center content-center">
            <div className="mt-11 relative">
                <div className="text-2xl">
                    <Typewriter
                        words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                        loop={0}
                        cursor={true}
                    />
                </div>
                <div>
                    <span className="text-3xl font-semibold highlighter-yellow">
                        LemonDouble
                    </span>
                </div>
            </div>

            <div className="mt-8">
                <div className="text-2xl">
                    <div>소프트웨어 엔지니어로서,</div>
                    <div>재밌는 걸 만드는걸 좋아해요.</div>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center space-y-3">
                <div className="text-lg">
                    저는 여기서도 만나보실 수 있어요.
                </div>
                <SocialContactAddress imageSrc="/image/logo/twitter.webp" imageAlt="트위터 로고" socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                <SocialContactAddress imageSrc="/image/logo/github.webp" imageAlt="깃허브 로고" socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                <SocialContactAddress imageSrc="/image/logo/discord.webp" imageAlt="디스코드 로고" socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                <SocialContactAddress imageSrc="/image/logo/blog.webp" imageAlt="블로그 로고" socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                <SocialContactAddress imageSrc="/image/logo/misskey.webp" imageAlt="미스키 로고" socialId="@lemondouble@sns.lemondouble.com" socialHref="https://sns.lemondouble.com/@lemondouble" />
            </div>

            <div className="h-[350px]" />

            <Image
                className="fixed -bottom-[10%] left-1/2 transform -translate-x-1/2"
                src="/image/character/lemon-character.webp"
                alt="캐릭터 이미지"
                width={580} height={580}
                loading="eager"
            />
        </main>
    )
}