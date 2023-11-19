import Image from "next/image";
import Link from "next/link";

interface Props{
    imageSrc: string
    imageAlt: string
    socialId: string
    socialHref: string
}
export function SocialContactAddress(props : Props){

    return (
        <div className="flex space-x-2">
            <Image
                className="rounded-md"
                src={props.imageSrc}
                alt={props.imageAlt}
                width={25}
                height={25}
            />
            <Link href={props.socialHref} target="_blank">
                <div className="text-base">
                    {props.socialId}
                </div>
            </Link>
        </div>
    )
}