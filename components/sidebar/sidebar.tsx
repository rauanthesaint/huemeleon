'use client'
import Image from 'next/image'
import styles from './sidebar.module.scss'

import Logo from '@/public/img/svg/huemeleon.svg'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { ElementType } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function Sidebar() {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <aside className={styles.sidebar}>
            <header className={styles.header}>
                <Image src={Logo} height={16} alt="Huemeleon Logo" />
            </header>
            {/* User profile section */}
            <section className={styles.profile}>
                <p className="label sm muted">User System coming soon</p>
            </section>
            {/* Navigation section */}
            <section className={styles.navigation}>
                <span className={clsx('label xs  muted', styles.blockTitle)}>
                    Tools
                </span>
                <ul>
                    {siteConfig.navigation.map((navItem, index) => {
                        const Icon: ElementType = navItem.icon
                        const isActive = pathname === navItem.href
                        return (
                            <li key={index}>
                                <Link
                                    className={clsx(
                                        styles.navItem,
                                        isActive && styles.active
                                    )}
                                    href={navItem.href}
                                >
                                    <Icon />
                                    {navItem.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <ul>
                {siteConfig.settings.map((setting, index) => {
                    const Icon: ElementType = setting.icon
                    return (
                        <li key={index}>
                            <Link
                                className={styles.navItem}
                                href={setting.href}
                            >
                                <Icon />
                                {setting.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}
