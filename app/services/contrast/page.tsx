'use client'

import { Container } from '@/components'
import { Input } from '@/ui'

import styles from './page.module.scss'
import { PaintBoardIcon } from '@/public/icons'
import { getContrast } from '@/lib/color.utils'
import { Controller, useForm } from 'react-hook-form'
import Color from '@/lib/color/color.class'
import clsx from 'clsx'
import { useEffect, useMemo } from 'react'
import { useStore } from '@/app/hooks/useStore'

type Values = {
    foreground: string
    background: string
}

const interpreter = (contrast: number) => {
    if (contrast < 3) {
        return 'low'
    } else if (contrast >= 3 && contrast < 7) {
        return 'good'
    } else {
        return 'high'
    }
}

export default function Page() {
    const { state, dispatch } = useStore()

    const { control, watch } = useForm<Values>({
        mode: 'onChange',
        defaultValues: {
            foreground: state.contrast.text.toHEX(),
            background: state.contrast.background.toHEX(),
        },
    })

    const { foreground: foregroundValue, background: backgroundValue } = watch()

    const foreground: Color = useMemo(
        () => Color.fromHEX(foregroundValue),
        [foregroundValue]
    )
    const background: Color = useMemo(
        () => Color.fromHEX(backgroundValue),
        [backgroundValue]
    )

    const contrast = getContrast(foreground, background)

    const interpretation = interpreter(contrast).toUpperCase()
    useEffect(() => {
        dispatch({
            type: 'UPDATE_CONTRAST',
            payload: { text: foreground, background: background },
        })
    }, [dispatch, background, foreground])

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
                                    icon={<PaintBoardIcon />}
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
                                    icon={<PaintBoardIcon />}
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
                            {contrast.toString()}
                        </span>
                        <span className={'label sm'}>
                            {interpretation} contrast
                        </span>
                    </div>
                </section>
                <section
                    style={{
                        backgroundColor: background.toString('HEX'),
                        color: foreground.toString('HEX'),
                    }}
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
