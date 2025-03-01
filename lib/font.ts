import localFont from 'next/font/local'
import { Inter as InterFont, Geist_Mono } from 'next/font/google'

export const NeutralSans = localFont({
    src: [
        {
            path: '../public/font/NeutralSans-Black.woff2',
            weight: '900',
        },
        {
            path: '../public/font/NeutralSans-Bold.woff2',
            weight: '700',
        },
        {
            path: '../public/font/NeutralSans-Medium.woff2',
            weight: '500',
        },
        {
            path: '../public/font/NeutralSans-Regular.woff2',
            weight: '400',
        },
    ],
    display: 'swap',
    style: 'normal',
    variable: '--font-neutral-sans',
})

export const Inter = InterFont({
    variable: '--font-inter',
    subsets: ['cyrillic-ext', 'latin-ext'],
})

export const GeistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})
