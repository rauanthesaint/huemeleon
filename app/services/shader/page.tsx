'use client'

import { Container, Shades } from '@/components'
import { Button, Input } from '@/ui'
import { Controller, useForm } from 'react-hook-form'
import styles from './page.module.scss'
import { DiceFaces03Icon, PaintBoardIcon } from '@/public/icons'
import { ChangeEvent } from 'react'
import Color from '@/lib/color.class'
import { getRandomHexColor } from '@/lib/color.utils'
type FormValues = {
    color: string
}
export default function Page() {
    const { setValue, control, watch } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: { color: '3AC061' },
    })

    const handleClick = () => {
        const randomColor = getRandomHexColor()
        setValue('color', randomColor.toHEX().replace('#', ''))
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue('color', event.target.value.toUpperCase())
    }
    return (
        <Container as={'main'} className={styles.page}>
            <Container pref={100} max={320} className={styles.controller}>
                <Controller
                    control={control}
                    name="color"
                    render={({ field }) => (
                        <Input
                            icon={<PaintBoardIcon />}
                            placeholder="000000"
                            {...field}
                            onChange={handleChange}
                            action={
                                <Button
                                    isIcon
                                    onClick={handleClick}
                                    variant="secondary"
                                >
                                    <DiceFaces03Icon />
                                </Button>
                            }
                        />
                    )}
                />
            </Container>
            <Shades name="Primary" base={Color.fromHEX(watch('color'))} />
        </Container>
    )
}
