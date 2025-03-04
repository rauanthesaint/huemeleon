'use client'

import { Container } from '@/components'
import { Input } from '@/ui'

import styles from './page.module.scss'
import { HashtagIcon } from '@/public/icons'
import { getContrast } from '@/lib/color.utils'
import { HEX } from '@/types'
import { Controller, useForm } from 'react-hook-form'
import Color from '@/lib/color.class'
import clsx from 'clsx'

export default function Page() {
    type Values = {
        foreground: string
        background: string
    }

    const { control, watch } = useForm<Values>({
        mode: 'onChange',
        defaultValues: { foreground: '#D5D5B1', background: '#191411' },
    })

    const foreground: HEX = watch('foreground')
    const background: HEX = watch('background')
    const contrast = getContrast(
        Color.fromHEX(foreground),
        Color.fromHEX(background)
    )

    const interpreter = (contrast: number) => {
        if (contrast < 3) {
            return 'low'
        } else if (contrast >= 3 && contrast < 7) {
            return 'good'
        } else {
            return 'high'
        }
    }

    const interpretation = interpreter(contrast).toUpperCase()

    return (
        <Container as={'main'}>
            <section className={styles.container}>
                <section className={styles.content}>
                    <div className={styles.controller}>
                        <Controller
                            name="foreground"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    icon={<HashtagIcon />}
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
                                    icon={<HashtagIcon />}
                                    placeholder="000000"
                                    label="Background color"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className={styles.result}>
                        <span
                            className={clsx(
                                'heading',
                                styles[interpreter(contrast)]
                            )}
                        >
                            {contrast}
                        </span>
                        <span className={'label sm'}>
                            {interpretation} contrast
                        </span>
                    </div>
                </section>
                <section
                    style={{ backgroundColor: background, color: foreground }}
                    className={styles.preview}
                >
                    <p className={styles.head}>
                        <span className="heading">Lentamente</span>
                        <span className="label sm">CARA ‧ 2020</span>
                    </p>
                    <p>
                        Sola al centro della movida, Baci al gusto di medicina,
                        Agrodolci come la Cina, Mi capisce soltanto Freeda
                    </p>
                </section>
            </section>
        </Container>
    )
}
