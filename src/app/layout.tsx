import './globals.css'
import React from "react";

export const metadata = {
    icons: {
        icon: 'https://cdn.lemondouble.com/homepage/favicon.ico',
    },
}

export const viewport = {
    themeColor: '#12100E',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body>
                {children}
            </body>
        </html>
    )
}
