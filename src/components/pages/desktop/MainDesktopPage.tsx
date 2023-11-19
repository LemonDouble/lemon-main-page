"use client"
import {Typewriter} from "react-simple-typewriter";
import {SocialContactAddress} from "@/components/SocialContactAddress";
import Image from "next/image";

export function MainDesktopPage(){
    return (
        <main className="w-screen min-h-screen h-auto absolute overflow-clip">
            <div className="ml-16 relative">
                <div className="mt-72">
                    <div className="text-4xl font-normal">
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                        />
                    </div>
                    <div><span className="text-7xl font-semibold highlighter-yellow">LemonDouble</span></div>
                </div>

                <div className="mt-24">
                    <div className="text-xl text-gray-500">Software Engineer</div>
                    <div className="text-2xl">재미있는 걸 만드는걸 좋아해요.</div>
                </div>

                <div className="mt-32 flex-col space-y-5">
                    <div className="text-lg">저는 여기서도 만나보실 수 있어요.</div>
                    <SocialContactAddress imageSrc="/image/logo/twitter.png" imageAlt="트위터 로고" socialId="@_lemon_berry_"  socialHref="https://twitter.com/_lemon_berry_"/>
                    <SocialContactAddress imageSrc="/image/logo/github.webp" imageAlt="깃허브 로고" socialId="@LemonDouble"  socialHref="https://github.com/LemonDouble"/>
                    <SocialContactAddress imageSrc="/image/logo/discord.png" imageAlt="디스코드 로고" socialId="@lemondouble"  socialHref="https://discord.gg/WzABWpbkNG"/>
                    <SocialContactAddress imageSrc="/image/logo/misskey.png" imageAlt="미스키 로고" socialId="@lemondouble@sns.lemondouble.com"  socialHref="https://sns.lemondouble.com/@lemondouble"/>

                </div>
            </div>
            <div className="w-[62.5rem] h-[62.5rem] bg-gray-300 rounded-full -right-[8rem] -bottom-[10rem] absolute"/>
            <Image
                className="w-[48rem] h-[48rem] right-0 bottom-0 absolute"
                src="/image/character/lemon-character.png"
                alt="캐릭터 이미지"
                width={768} height={768}
            />
        </main>
    )
}