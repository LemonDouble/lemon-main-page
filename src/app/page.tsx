"use client"
import {DesktopPage} from "@/components/pages/desktop/DesktopPage";
import {MobilePage} from "@/components/pages/desktop/MobilePage";
import {TabletPage} from "@/components/pages/desktop/TabletPage";

export default function Home() {

    // 셋 다 일단 올린 후, CSS로 hidden 처리
    return(
        <>
            <MobilePage />
            <TabletPage />
            <DesktopPage />
        </>
    )
}
