'use client'
import { Container } from '@/components'

import styles from './page.module.scss'
import Color from '@/lib/color/color.class'

import { ShadesType } from '@/components/shades/shades'
import { Shades } from '@/components'

const palettes: ShadesType[] = [
    {
        name: 'Red',
        base: Color.fromHEX('ef4444'),
    },
    {
        name: 'Rose',
        base: Color.fromHEX('f43f5e'),
    },
    {
        name: 'Pink',
        base: Color.fromHEX('ec4899'),
    },
    {
        name: 'Fuchsia',
        base: Color.fromHEX('d946ef'),
    },
    {
        name: 'Purple',
        base: Color.fromHEX('a855f7'),
    },
    {
        name: 'Violet',
        base: Color.fromHEX('8b5cf6'),
    },
    {
        name: 'Indigo',
        base: Color.fromHEX('6366f1'),
    },
    {
        name: 'Blue',
        base: Color.fromHEX('3b82f6'),
    },
    {
        name: 'Sky',
        base: Color.fromHEX('0ea5e9'),
    },
    {
        name: 'Cyan',
        base: Color.fromHEX('06b6d4'),
    },
    {
        name: 'Teal',
        base: Color.fromHEX('14b8a6'),
    },
    {
        name: 'Emerald',
        base: Color.fromHEX('10b981'),
    },
    {
        name: 'Green',
        base: Color.fromHEX('22c55e'),
    },
    {
        name: 'Lime',
        base: Color.fromHEX('84cc16'),
    },
    {
        name: 'Yellow',
        base: Color.fromHEX('eab308'),
    },
    {
        name: 'Amber',
        base: Color.fromHEX('f59e0b'),
    },
    {
        name: 'Orange',
        base: Color.fromHEX('f97316'),
    },
    {
        name: 'Stone',
        base: Color.fromHEX('78716c'),
    },
    {
        name: 'Neutral',
        base: Color.fromHEX('737373'),
    },
    {
        name: 'Zinc',
        base: Color.fromHEX('71717a'),
    },
    {
        name: 'Gray',
        base: Color.fromHEX('6b7280'),
    },
    {
        name: 'Slate',
        base: Color.fromHEX('64748b'),
    },
]

export default function Page() {
    return (
        <Container as={'main'}>
            <section className={styles.content}>
                {palettes.map((palette, index) => {
                    return (
                        <Shades
                            key={index}
                            base={palette.base}
                            name={palette.name}
                        />
                    )
                })}
            </section>
        </Container>
    )
}
