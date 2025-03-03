import type { Metadata } from 'next'
import { Inter, Geist, GeistMono } from '@/lib/font'
import { siteConfig } from '@/config/site'
import { ThemeProvider } from 'next-themes'

import { SpeedInsights } from '@vercel/speed-insights/next'
// GLOBAL STYLES
import '@/styles/globals.scss'
import '@/styles/normalize.scss'
import '@/styles/variables.scss'
import '@/styles/typography.scss'
import { Header } from '@/components'

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
        <html suppressHydrationWarning lang="en">
            <body
                className={`${Geist.variable} ${Inter.variable} ${GeistMono.variable}`}
            >
                <ThemeProvider>
                    <Header />
                    {children}
                    <SpeedInsights />
                </ThemeProvider>
            </body>
        </html>
    )
}
