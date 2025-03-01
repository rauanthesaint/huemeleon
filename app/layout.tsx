import type { Metadata } from 'next'
import { Inter, NeutralSans } from '@/lib/font'
import { siteConfig } from '@/config/site'

// GLOBAL STYLES
import '@/styles/globals.scss'
import '@/styles/normalize.scss'
import '@/styles/variables.scss'
import '@/styles/typography.scss'
// import { Header } from '@/components'

// METADATA
export const metadata: Metadata = {
    title: siteConfig.title,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${NeutralSans.variable} ${Inter.variable}`}>
                {/* <Header /> */}
                {children}
            </body>
        </html>
    )
}
