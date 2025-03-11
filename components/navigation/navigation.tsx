'use client'
import { siteConfig } from '@/config/site'
import clsx from 'clsx'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './navigation.module.scss'
import Container from '../container/container'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PlusSignIcon } from '@/public/icons'

export default function Navigation() {
    const pathname = usePathname()
    const itemContainerRef = useRef<HTMLDivElement>(null)
    const [indicatorStyles, setIndicatorStyles] = useState({
        width: 0,
        left: 0,
    })

    const activeItem = useMemo(() => {
        return (
            siteConfig.services.findIndex(
                (service) => service.href === pathname
            ) || 0
        )
    }, [pathname])

    useLayoutEffect(() => {
        const itemContainer = itemContainerRef.current
        if (itemContainer) {
            const items = itemContainer.querySelectorAll(`.${styles.item}`)
            const activeElement = items[activeItem] as HTMLElement
            if (activeElement) {
                setIndicatorStyles({
                    width: activeElement.clientWidth,
                    left: activeElement.offsetLeft,
                })
            }
        }
    }, [activeItem])

    return (
        <section className={styles.services__section}>
            <Container
                ref={itemContainerRef}
                max={1728}
                className={styles.container}
            >
                {siteConfig.services.map((service, index) => (
                    <Link
                        key={index}
                        className={clsx(
                            styles.item,
                            activeItem === index && styles.active
                        )}
                        href={service.href}
                    >
                        {service.title}
                    </Link>
                ))}
                <motion.div
                    animate={indicatorStyles}
                    className={styles.indicator}
                />

                <Link
                    className={styles.item}
                    target="_blank"
                    href="https://t.me/rauanthesaint"
                >
                    <PlusSignIcon />
                    <span>Suggest tool</span>
                </Link>
            </Container>
        </section>
    )
}
