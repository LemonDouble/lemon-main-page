"use client"
import { Typewriter } from "react-simple-typewriter";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import Image from "next/image";
import { SiGithub, SiDiscord } from "@icons-pack/react-simple-icons";
import { TwitterBird } from "@/components/icons/TwitterBird";
import { NotebookPen } from "lucide-react";

export function DesktopPage() {
    return (
        <main className="desktop-page hidden w-screen h-screen fixed inset-0 overflow-hidden">
            <div className="ml-20 relative z-10 h-full flex flex-col justify-center">
                <div className="animate-fade-in-up">
                    <div className="text-3xl font-light tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                        <Typewriter
                            words={["안녕하세요! 제 이름은...", "Hello! my name is...", "こんにちは！私の名前は..."]}
                            loop={0}
                            cursor={true}
                            cursorStyle="_"
                        />
                    </div>
                    <div className="mt-2">
                        <span className="text-8xl name-title tracking-tight">
                            LemonDouble
                        </span>
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-1">
                    <div className="text-xl mb-1 galmuri" style={{ color: 'var(--secondary)' }}>Software Engineer</div>
                    <div className="text-2xl font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        재미있는 걸 만드는걸 좋아해요.
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-2">
                    <div className="section-label mb-4">
                        Connect with me
                    </div>
                    <div className="flex flex-col space-y-2 max-w-sm">
                        <SocialContactAddress icon={<TwitterBird size={20} />} socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                        <SocialContactAddress icon={<SiGithub size={20} />} socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                        <SocialContactAddress icon={<SiDiscord size={20} />} socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                        <SocialContactAddress icon={<NotebookPen size={20} strokeWidth={2} />} socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                    </div>
                </div>
            </div>

            {/* Character Section */}
            <div className="absolute right-0 -bottom-10 animate-fade-in-up-delay-3">
                <div className="animate-float">
                    <Image
                        className="w-auto h-[50rem] object-contain drop-shadow-[0_0_40px_rgba(240,185,11,0.15)]"
                        src="/image/character/lemon-character.webp"
                        alt="캐릭터 이미지"
                        width={1235} height={1415}
                        loading="eager"
                        priority
                    />
                </div>
            </div>
        </main>
    )
}
