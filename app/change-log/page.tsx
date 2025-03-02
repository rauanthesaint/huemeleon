import { Container } from '@/components'

import styles from './page.module.scss'
import clsx from 'clsx'

export default function Page() {
    return (
        <Container as={'main'} className={styles.container}>
            <section className={styles.log}>
                <span className={clsx(styles.version, styles.log__update)}>
                    1.1.0
                </span>
                <span className={styles.title}>
                    Updated scale generator function
                </span>
                <div className={styles.line} />
                <ul className={clsx('muted label', styles.paragraph)}>
                    <li>
                        ✅ Больше нет дублирования чёрного и белого – границы
                        minLightness и maxLightness это предотвращают
                    </li>
                    <li>
                        ✅ Генерация оттенков стала предсказуемой – цвета
                        распределяются равномерно
                    </li>
                </ul>
            </section>
            <section className={styles.log}>
                <span className={clsx(styles.version, styles.log__new)}>
                    1.0.0
                </span>
                <span className="heading">Shader v1</span>
            </section>
        </Container>
    )
}
