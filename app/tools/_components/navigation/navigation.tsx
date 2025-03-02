'use client'
import Link from 'next/link'
import styles from './navigation.module.scss'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components'

const LinkArray = [
    { title: 'Shader', href: '/tools/shader' },
    { title: 'Picker', href: '/tools/development' },
    { title: 'Palette', href: '/tools/development' },
    { title: 'Mixer', href: '/tools/development' },
    // { title: 'Contrast', href: '/tools/contrast' },
]

export default function Navigation() {
    const pathname = usePathname()
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: '0px',
        width: '0px',
    })
    const ref = useRef<(HTMLAnchorElement | null)[]>([])

    // Set active index on initial render based on pathname
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const index = LinkArray.findIndex((item) =>
                pathname.includes(item.href)
            )
            if (index !== -1) {
                setActiveIndex(index)
            }
        }
    }, [pathname])

    // Update indicator position & width when activeIndex changes
    useEffect(() => {
        if (activeIndex !== null) {
            const activeItem = ref.current[activeIndex]
            if (activeItem) {
                setIndicatorStyle({
                    left: `${activeItem.offsetLeft}px`,
                    width: `${activeItem.offsetWidth}px`,
                })
            }
        }
    }, [activeIndex])

    if (activeIndex === null) return null // Prevent SSR mismatch

    return (
        <Container as={'nav'} className={styles.navigation}>
            <ul className={styles.container}>
                <li className={styles.indicator} style={indicatorStyle} />
                {LinkArray.map((elem, index) => {
                    const isActive = activeIndex === index
                    return (
                        <li key={index}>
                            <Link
                                ref={(el) => {
                                    ref.current[index] = el
                                }}
                                onClick={() => setActiveIndex(index)}
                                className={clsx(
                                    styles.item,
                                    isActive && styles.active
                                )}
                                href={elem.href}
                            >
                                {elem.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </Container>
    )
}
