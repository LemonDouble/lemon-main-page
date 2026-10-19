import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { NotebookPen } from "lucide-react";
import { SocialContactAddress } from "@/components/SocialContactAddress";
import { TwitterBird } from "@/components/icons/TwitterBird";

export function SocialLinks({ className }: { className?: string }) {
    return (
        <div className={className}>
            <SocialContactAddress icon={<TwitterBird size={20} />} socialId="@_lemon_berry_" socialHref="https://twitter.com/_lemon_berry_" />
            <SocialContactAddress icon={<SiGithub size={20} />} socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
            <SocialContactAddress icon={<SiDiscord size={20} />} socialId="@lemondouble" socialHref="https://discord.gg/WzABWpbkNG" />
            <SocialContactAddress icon={<NotebookPen size={20} strokeWidth={2} />} socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
        </div>
    );
}
