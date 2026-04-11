"use client"
import Image from "next/image";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import { Typewriter } from "react-simple-typewriter";
import { SiX, SiGithub, SiDiscord } from "@icons-pack/react-simple-icons";
import { NotebookPen } from "lucide-react";

export function MobilePage() {
    return (
        <main className="mobile-page hidden w-screen min-h-screen absolute overflow-x-clip">
            <div className="relative z-10 px-6 pt-16 pb-8 text-center">
                <div className="animate-fade-in-up">
                    <div className="text-lg font-light tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                            cursorStyle="_"
                        />
                    </div>
                    <div className="mt-1">
                        <span className="text-4xl name-title tracking-tight">
                            LemonDouble
                        </span>
                    </div>
                </div>

                <div className="mt-8 animate-fade-in-up-delay-1">
                    <div className="text-base mb-1 galmuri" style={{ color: 'var(--secondary)' }}>Software Engineer</div>
                    <div className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        재밌는 걸 만드는걸 좋아해요.
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-2">
                    <div className="section-label mb-4">
                        Connect with me
                    </div>
                    <div className="flex flex-col space-y-2.5 max-w-xs mx-auto">
                        <SocialContactAddress icon={<SiX size={20} />} socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                        <SocialContactAddress icon={<SiGithub size={20} />} socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                        <SocialContactAddress icon={<SiDiscord size={20} />} socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                        <SocialContactAddress icon={<NotebookPen size={20} strokeWidth={2} />} socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                    </div>
                </div>
            </div>

            {/* Character Section - in flow, no overlap */}
            <div className="relative w-full flex justify-center overflow-hidden animate-fade-in-up-delay-3">
                <div className="animate-float">
                    <Image
                        className="relative mx-auto object-contain drop-shadow-[0_0_30px_rgba(240,185,11,0.12)]"
                        src="/image/character/lemon-character.webp"
                        alt="캐릭터 이미지"
                        width={350} height={400}
                        loading="eager"
                        priority
                        style={{ marginBottom: '-40px' }}
                    />
                </div>
            </div>
        </main>
    )
}
