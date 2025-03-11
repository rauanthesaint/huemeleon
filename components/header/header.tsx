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
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export default function Header() {
    const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false)
    const handleMobileMenuToggle = () => {
        setMobileMenuActive(!mobileMenuActive)
    }

    const Content = (
        <>
            <div className={styles.list}>
                {siteConfig.navigation.map((elem, index) => {
                    return (
                        <Link
                            key={index}
                            className={clsx(styles.item)}
                            href={elem.href}
                        >
                            {elem.title}
                        </Link>
                    )
                })}
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
        </>
    )

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
                        {mobileMenuActive && (
                            <motion.section
                                initial={{ left: '100%' }}
                                animate={{
                                    left: 0,
                                }}
                                exit={{ left: '100%' }}
                                className={clsx(styles.mobileMenu, 'no-scroll')}
                            >
                                {Content}
                            </motion.section>
                        )}
                    </AnimatePresence>
                    <section className={styles.content}>{Content}</section>
                    <div className={styles.block}>
                        <Theme className={styles.item} />

                        <div
                            onClick={handleMobileMenuToggle}
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
