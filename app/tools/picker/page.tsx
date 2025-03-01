import { Container, Picker } from '@/components'
import styles from './page.module.scss'
import { Input } from '@/ui'

export default function Page() {
    return (
        <Container as={'main'}>
            <section className={styles.controller}>
                <Input placeholder="HEX" />
                <Input placeholder="RGB" />
                <Input placeholder="HSL" />
                <Input placeholder="HSV" />
                <Input placeholder="LCH" />
                <Input placeholder="CMYK" />
            </section>
            <section className={styles.content}>
                <div className={styles.result} />
                <Picker />
            </section>
        </Container>
    )
}
