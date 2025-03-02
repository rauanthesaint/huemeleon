import Link from 'next/link'
import Container from '../container/container'
import styles from './header.module.scss'

import Logo from '@/public/img/svg/logo.svg'
import Image from 'next/image'
import { Github01Icon, TelegramIcon } from '@/public/icons'

export default function Header() {
    return (
        <header className={styles.header}>
            <Container max={1728} className={styles.container}>
                <section>
                    <Image height={48} src={Logo} alt="Minerva Logo" />
                    <nav className={styles.block}>
                        <Link className={styles.item} href={'/tools/shader'}>
                            Tools
                        </Link>
                    </nav>
                </section>

                <section>
                    <div className={styles.block}>
                        <Link className={styles.item} href={'/change-log'}>
                            Change Log
                        </Link>
                        <Link
                            className={styles.item}
                            target="_blank"
                            href={'https://t.me/rauanthesaint'}
                        >
                            Support
                        </Link>
                        <Link
                            className={styles.item}
                            target="_blank"
                            href={
                                'https://github.com/rauanthesaint/huemeleon/wiki'
                            }
                        >
                            Wiki
                        </Link>
                    </div>
                    <div className={styles.block}>
                        <Link
                            className={styles.item}
                            target="_blank"
                            href={'https://github.com/rauanthesaint/huemeleon'}
                        >
                            <Github01Icon width={22} height={22} />
                        </Link>
                        <Link
                            className={styles.item}
                            target="_blank"
                            href={'https://t.me/huemeleon'}
                        >
                            <TelegramIcon width={22} height={22} />
                        </Link>
                    </div>
                </section>
            </Container>
        </header>
    )
}
