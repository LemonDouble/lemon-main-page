"use client"
import {MainDesktopPage} from "@/components/pages/desktop/MainDesktopPage";
import {useMediaQuery} from "react-responsive";
import {MobilePage} from "@/components/pages/desktop/MobilePage";

export default function Home() {

    const isMobile = useMediaQuery({query: '(max-width: 480px)'})

    if(isMobile){ return <MobilePage />}


    return <MainDesktopPage />
}
