'use client'

import { Container } from '@/components'
import { Input } from '@/ui'

import styles from './page.module.scss'
import { HashtagIcon } from '@/public/icons'
import { getContrast } from '@/lib/color.utils'
import { HEX } from '@/types'
import { Controller, useForm } from 'react-hook-form'
import Color from '@/lib/color.class'

export default function Page() {
    type Values = {
        foreground: string
        background: string
    }

    const { control, watch } = useForm<Values>({
        mode: 'onChange',
        defaultValues: { foreground: '#1D5391', background: '#ACC8E5' },
    })

    const foreground: HEX = watch('foreground')
    const background: HEX = watch('background')
    const contrast = getContrast(
        Color.fromHEX(foreground),
        Color.fromHEX(background)
    )

    return (
        <Container as={'main'}>
            <section className={styles.container}>
                <section className={styles.form}>
                    <div className={styles.controller}>
                        <Controller
                            name="foreground"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    leading={<HashtagIcon />}
                                    placeholder="000000"
                                    label="Text color"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="background"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    leading={<HashtagIcon />}
                                    placeholder="000000"
                                    label="Background color"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    {/* <div className={styles.result}>{contrast}</div> */}
                    <div className={styles.result}>{contrast}</div>
                </section>
                <section
                    style={{ backgroundColor: background }}
                    className={styles.content}
                >
                    <p style={{ color: foreground }}>Lorem, ipsum dolor.</p>
                </section>
            </section>
        </Container>
    )
}
