import Link from 'next/link'
import Container from '../container/container'
import styles from './header.module.scss'

import Logo from '@/public/img/svg/logo.svg'
import Image from 'next/image'

export default function Header() {
    return (
        <header className={styles.header}>
            <Container max={1728}>
                <section>
                    <Image height={48} src={Logo} alt="Minerva Logo" />
                    <nav className={styles.block}>
                        <Link href={'/tools/shader'}>Tools</Link>
                        {/* <Link href={'/changelog'}>Change Log</Link> */}
                    </nav>
                </section>
            </Container>
        </header>
    )
}
