'use client'
import { Container } from '@/components'
import styles from './page.module.scss'
import ColorInput from '@/components/ColorInput/component'
import { useEffect, useState } from 'react'
import Color from '@/lib/color/color.class'
import { useStore } from '@/app/hooks/useStore'
import { Button } from '@/ui'
import { Copy01Icon, Tick02Icon } from '@/public/icons'

const FORMATS = ['HEX', 'RGB', 'HSL', 'HSB']

export default function Page() {
    const { state, dispatch } = useStore()
    const [color, setColor] = useState<Color>(state.converter)
    const [copied, setCopied] = useState<string | null>(null)

    useEffect(() => {
        if (state.converter.toString('HEX') !== color.toString('HEX')) {
            dispatch({ type: 'UPDATE_CONVERTER', payload: color })
        }
    }, [color, state.converter, dispatch])

    const handleCopy = async (format: string) => {
        try {
            const value = color.toString(format)
            await navigator.clipboard.writeText(value)
            setCopied(format)

            setTimeout(() => {
                setCopied(null)
            }, 1500)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <Container as={'main'}>
            <header className={styles.controller}>
                <ColorInput color={color} setColor={setColor} />
            </header>

            <section className={styles.grid}>
                {FORMATS.map((elem) => {
                    return (
                        <article className={styles.item} key={elem}>
                            <div>
                                <span className="muted sm label">{elem}</span>
                                <p className="mono">{color.toString(elem)}</p>
                            </div>
                            <Button
                                onClick={() => handleCopy(elem)}
                                size="sm"
                                variant="secondary"
                                isIcon
                            >
                                {copied === elem ? (
                                    <Tick02Icon />
                                ) : (
                                    <Copy01Icon />
                                )}
                            </Button>
                        </article>
                    )
                })}
            </section>
        </Container>
    )
}
