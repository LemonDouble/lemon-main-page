import {Typewriter} from "react-simple-typewriter";
import {SocialContactAddress} from "@/components/SocialContactAddress";
import Image from "next/image";

export function TabletPage(){
    return(
        <main className="tablet-page hidden w-screen min-h-screen h-auto absolute overflow-clip">
            <div className="ml-10 relative">
                <div className="mt-20">
                    <div className="text-4xl">
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                        />
                    </div>
                    <div><span className="text-7xl font-semibold highlighter-yellow">LemonDouble</span></div>
                </div>

                <div className="mt-12">
                    <div className="text-xl text-gray-500">Software Engineer</div>
                    <div className="text-2xl">재미있는 걸 만드는걸 좋아해요.</div>
                </div>

                <div className="mt-12 flex-col space-y-3">
                    <div className="text-lg">저는 여기서도 만나보실 수 있어요.</div>
                    <SocialContactAddress imageSrc="/image/logo/twitter.webp" imageAlt="트위터 로고" socialId="@_lemon_berry_"  socialHref="https://twitter.com/_lemon_berry_"/>
                    <SocialContactAddress imageSrc="/image/logo/github.webp" imageAlt="깃허브 로고" socialId="@LemonDouble"  socialHref="https://github.com/LemonDouble"/>
                    <SocialContactAddress imageSrc="/image/logo/discord.webp" imageAlt="디스코드 로고" socialId="@lemondouble"  socialHref="https://discord.gg/WzABWpbkNG"/>
                    <SocialContactAddress imageSrc="/image/logo/blog.webp" imageAlt="블로그 로고" socialId="https://lemondouble.github.io"  socialHref="https://lemondouble.github.io/"/>
                    <SocialContactAddress imageSrc="/image/logo/misskey.webp" imageAlt="미스키 로고" socialId="@lemondouble@sns.lemondouble.com"  socialHref="https://sns.lemondouble.com/@lemondouble"/>
                </div>
            </div>
            <div className="w-[62.5rem] h-[62.5rem] bg-gray-300 rounded-full -right-[24rem] -bottom-[24rem] absolute"/>
            <Image
                className="w-[48rem] h-[48rem] -right-[10rem] -bottom-[10rem] absolute"
                src="/image/character/lemon-character.webp"
                alt="캐릭터 이미지"
                width={768} height={768}
                loading="eager"
            />
        </main>
    )
}