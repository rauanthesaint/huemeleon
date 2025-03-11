'use client'
import { Container, Picker } from '@/components'
import styles from './page.module.scss'
import { Input } from '@/ui'
import { useState } from 'react'
import Color from '@/lib/color.class'

export default function Page() {
    const [color, setColor] = useState<Color>(Color.fromHEX('#ff0000'))
    const handle = (color: Color) => {
        setColor(color)
    }

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
            <section>{color.toHEX()}</section>
            <section className={styles.content}>
                <div
                    style={{
                        backgroundColor: color.toHEX(),
                    }}
                    className={styles.result}
                />
                <Picker color={color} setColor={handle} />
            </section>
        </Container>
    )
}
