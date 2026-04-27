"use client"
import { Typewriter } from "react-simple-typewriter";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import Image from "next/image";
import { SiGithub, SiDiscord } from "@icons-pack/react-simple-icons";
import { TwitterBird } from "@/components/icons/TwitterBird";
import { NotebookPen } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

export function TabletPage({ dict }: { dict: Dictionary }) {
    return (
        <section className="tablet-page hidden w-full min-h-screen relative overflow-clip">
            <div className="ml-12 relative z-10">
                <div className="mt-16 animate-fade-in-up">
                    <div className="text-2xl font-light tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                        <Typewriter
                            words={dict.hero.intro}
                            loop={0}
                            cursor={true}
                            cursorStyle="_"
                        />
                    </div>
                    <div className="mt-2">
                        <span className="text-6xl name-title tracking-tight">
                            LemonDouble
                        </span>
                    </div>
                </div>

                <div className="mt-10 animate-fade-in-up-delay-1">
                    <div className="text-lg mb-1 galmuri" style={{ color: 'var(--secondary)' }}>Software Engineer</div>
                    <div className="text-xl font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        {dict.hero.tagline}
                    </div>
                </div>

                <div className="mt-12 animate-fade-in-up-delay-2">
                    <div className="section-label mb-4">
                        Connect with me
                    </div>
                    <div className="flex flex-col space-y-2.5 max-w-xs">
                        <SocialContactAddress icon={<TwitterBird size={20} />} socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
                        <SocialContactAddress icon={<SiGithub size={20} />} socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
                        <SocialContactAddress icon={<SiDiscord size={20} />} socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
                        <SocialContactAddress icon={<NotebookPen size={20} strokeWidth={2} />} socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
                    </div>
                </div>
            </div>

            {/* Character Section */}
            <div className="absolute -right-16 -bottom-16 animate-fade-in-up-delay-3">
                <div className="animate-float">
                    <Image
                        className="w-auto h-[38rem] object-contain drop-shadow-[0_0_30px_rgba(240,185,11,0.12)]"
                        src="/image/character/lemon-character.webp"
                        alt={dict.hero.characterAlt}
                        width={1235} height={1415}
                        loading="eager"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}
