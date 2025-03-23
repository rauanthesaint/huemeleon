'use client'

import { Container } from '@/components'

import styles from './page.module.scss'
import { Button } from '@/ui'
import clsx from 'clsx'
// import { useState } from 'react'
// import Color from '@/lib/color.class'
// import ColorInput from '@/components/ColorInput/component'

export default function Page() {
    // const [color, setColor] = useState<Color>(Color.fromHEX('#EB2700'))
    return (
        <main>
            <Container className={clsx(styles.section, styles.banner)}>
                <h1 className="display">
                    Угадывать цвета на&nbsp;глаз&nbsp;&mdash; весело.
                    <br />
                    Но&nbsp;может, пора работать{' '}
                    <span className="highlight">по-взрослому</span>?
                </h1>
                <p className={clsx('label muted', styles.paragraph)}>
                    Работай с&nbsp;оттенками на&nbsp;ты: собирай, миксуй
                    и&nbsp;экспортируй в&nbsp;пару кликов. Идеально для
                    дизайнеров, фронтендеров и&nbsp;креативных команд.
                </p>
                <div className={styles.group}>
                    <Button>Начать</Button>
                    <Button variant="secondary">GitHub</Button>
                </div>
            </Container>

            {/* <Container className={styles.section}>
                <ColorInput color={color} setColor={setColor} />
                <div style={{ height: 100, backgroundColor: color.toHEX() }} />
            </Container> */}
        </main>
    )
}
