'use client'

import Link from 'next/link'
import Container from '../container/container'
import styles from './header.module.scss'

import Logo from '@/public/img/svg/logo.svg'
import Image from 'next/image'

import { siteConfig } from '@/config/site'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Theme from '../theme/theme'
// import { Button } from '@/ui'
// import { Menu09Icon } from '@/public/icons'

export default function Header() {
    const pathname = usePathname()

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
                    {/* <Button
                        className={styles.toggleContent}
                        variant="tertiary"
                        isIcon
                    >
                        <Menu09Icon />
                    </Button> */}
                    <section className={styles.content}>
                        <div className={styles.block}>
                            {siteConfig.navigation.map((link, index) => {
                                const isActive = pathname.includes('services')
                                return (
                                    <Link
                                        key={index}
                                        className={clsx(
                                            styles.item,
                                            isActive && styles.active
                                        )}
                                        href={link.href}
                                    >
                                        {link.title}
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
                            <Theme className={styles.item} />
                        </div>
                    </section>
                </section>
                <section className={styles.services__section}>
                    {siteConfig.services.map((service, index) => {
                        const isActive = pathname === service.href
                        return (
                            <Link
                                key={index}
                                className={clsx(
                                    styles.item,
                                    isActive && styles.active
                                )}
                                href={service.href}
                            >
                                {service.title}
                            </Link>
                        )
                    })}
                </section>
            </Container>
        </header>
    )
}
