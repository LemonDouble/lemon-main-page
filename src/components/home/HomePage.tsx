import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SocialLinks } from "@/components/SocialLinks";
import { Certification, Contact, FieldItem, HeroText, OpenSourceList, SectionTitle, TechStackList } from "@/components/home/HomeParts";
import { getDictionary, type Locale } from "@/lib/i18n";
import { FIELDS } from "@/lib/profile";

export function HomePage({ locale }: { locale: Locale }) {
    const dict = getDictionary(locale);

    return (
        <>
            <SiteHeader locale={locale} />
            <main className="home">
                <aside>
                    <Image src="/image/banner.webp" alt={dict.hero.bannerAlt} width={1692} height={846} priority className="home-portrait" />
                    <HeroText dict={dict} />
                    <SocialLinks className="flex flex-col gap-2 mt-6" />
                    <div className="mt-8">
                        <SectionTitle>{dict.certifications.title}</SectionTitle>
                        <Certification />
                    </div>
                </aside>

                <div>
                    <section className="grid gap-5 md:grid-cols-2" aria-label={dict.fieldsSection.title}>
                        {FIELDS.map(field => (
                            <div key={field.key} className="panel">
                                <FieldItem field={field} dict={dict} />
                            </div>
                        ))}
                    </section>
                    <section className="panel mt-8">
                        <SectionTitle>{dict.techStack.title}</SectionTitle>
                        <TechStackList dict={dict} />
                    </section>
                    <section className="panel mt-8">
                        <SectionTitle>{dict.openSource.title}</SectionTitle>
                        <OpenSourceList dict={dict} />
                    </section>
                    <Contact dict={dict} locale={locale} />
                </div>
            </main>
        </>
    );
}
