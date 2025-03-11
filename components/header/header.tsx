'use client'

import Link from 'next/link'
import Container from '../container/container'
import styles from './header.module.scss'

import Logo from '@/public/img/svg/logo.svg'
import Image from 'next/image'

import { siteConfig } from '@/config/site'
import clsx from 'clsx'
import Theme from '../theme/theme'
import { Menu09Icon } from '@/public/icons'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export default function Header() {
    const [active, setActive] = useState<boolean>(false)
    const handle = () => {
        setActive(!active)
    }

    useEffect(() => {
        if (active && window.innerWidth <= 768) {
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.documentElement.style.overflow = ''
        }

        return () => {
            document.documentElement.style.overflow = ''
        }
    }, [active])

    const handleResize = useCallback(() => {
        setActive(window.innerWidth > 768)
    }, [])

    useEffect(() => {
        // Run once on mount
        handleResize()

        // Add event listener
        window.addEventListener('resize', handleResize)

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize])

    return (
        <header className={styles.header}>
            <Container max={1728} className={styles.container}>
                <section className={styles.section}>
                    <Image
                        className={clsx('logo', styles.logo)}
                        src={Logo}
                        height={24}
                        alt="Huemeleon Logo"
                    />

                    <AnimatePresence>
                        {active && (
                            <motion.section
                                initial={{ left: '100%' }}
                                animate={{
                                    left: 0,
                                }}
                                exit={{ left: '100%' }}
                                className={clsx(styles.content)}
                            >
                                <div className={styles.list}>
                                    {siteConfig.navigation.map(
                                        (elem, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    className={clsx(
                                                        styles.item
                                                    )}
                                                    href={elem.href}
                                                >
                                                    {elem.title}
                                                </Link>
                                            )
                                        }
                                    )}
                                </div>
                                <div className={styles.block}>
                                    {siteConfig.links.map((link, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={link.href}
                                                target="_blank"
                                                className={styles.item}
                                            >
                                                <link.icon />
                                                {link.title}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </motion.section>
                        )}
                    </AnimatePresence>
                    <div className={styles.block}>
                        <Theme className={styles.item} />

                        <div
                            onClick={handle}
                            className={clsx(styles.mobile, styles.item)}
                        >
                            <Menu09Icon />
                        </div>
                    </div>
                </section>
            </Container>
        </header>
    )
}
