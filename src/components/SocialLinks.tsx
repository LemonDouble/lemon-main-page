import { SiGithub } from "@icons-pack/react-simple-icons";
import { Mail, NotebookPen } from "lucide-react";
import { SocialContactAddress } from "@/components/SocialContactAddress";

export function SocialLinks({ className }: { className?: string }) {
    return (
        <div className={className}>
            <SocialContactAddress icon={<SiGithub size={20} />} socialId="@LemonDouble" socialHref="https://github.com/LemonDouble" />
            <SocialContactAddress icon={<NotebookPen size={20} strokeWidth={2} />} socialId="blog.lemondouble.com" socialHref="https://blog.lemondouble.com" />
            <SocialContactAddress icon={<Mail size={20} strokeWidth={2} />} socialId="contact@lemondouble.com" socialHref="mailto:contact@lemondouble.com" />
        </div>
    );
}
