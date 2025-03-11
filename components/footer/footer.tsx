import Image from 'next/image'
import Container from '../container/container'
import styles from './footer.module.scss'

import Logo from '@/public/img/svg/logo.svg'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { CommandIcon } from '@/public/icons'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <section className={styles.content}>
                    <div className={styles.column}>
                        <span className="label sm">Services</span>
                        <ul className={styles.list}>
                            {siteConfig.services.map((elem, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            className={styles.item}
                                            href={elem.href}
                                        >
                                            {elem.title}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <button
                            type="button"
                            title="Shortcuts"
                            className={styles.item}
                        >
                            <CommandIcon />
                            <span>Shortcuts</span>
                        </button>
                    </div>
                </section>
                <section className={styles.bottom}>
                    <Image
                        className="logo muted"
                        src={Logo}
                        alt="Huemeleon Logo"
                        height={20}
                    />
                    <span className="label sm muted">
                        &copy; Minerva, {new Date().getFullYear()}
                    </span>
                </section>
            </Container>
        </footer>
    )
}
