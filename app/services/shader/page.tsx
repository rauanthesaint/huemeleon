'use client'

import { Container, Shades } from '@/components'
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import Color from '@/lib/color/color.class'
import ColorInput from '@/components/ColorInput/component'
import { useStore } from '@/app/hooks/useStore'

export default function Page() {
    const { state, dispatch } = useStore()
    const [color, setColor] = useState<Color>(state.shader)

    useEffect(() => {
        dispatch({ type: 'UPDATE_SHADER', payload: color })
    }, [dispatch, color])

    return (
        <Container as={'main'} className={styles.page}>
            <Container pref={100} max={320} className={styles.controller}>
                <ColorInput color={color} setColor={setColor} />
            </Container>
            <Shades name="Primary" base={color} />
        </Container>
    )
}
