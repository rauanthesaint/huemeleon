'use client'
import { Container } from '@/components'
import styles from './page.module.scss'
import { Button, Input } from '@/ui'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { DiceFaces03Icon, PaintBoardIcon } from '@/public/icons'
import { getRandomHexColor, mixColor } from '@/lib/color.utils'
import { ChangeEvent, useMemo, useState } from 'react'
import Color from '@/lib/color.class'
import Notification from '@/ui/notification/notification'
import clsx from 'clsx'

export default function Page() {
    type FormValues = {
        color_1: string
        color_2: string
    }

    const { setValue, control } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: { color_1: 'FF00FF', color_2: '00FF00' },
    })

    const color_1 = useWatch({ control, name: 'color_1' })
    const color_2 = useWatch({ control, name: 'color_2' })

    const [copied, setCopied] = useState(false)

    const result = useMemo(() => {
        if (color_1 && color_2) {
            return mixColor(Color.fromHEX(color_1), Color.fromHEX(color_2))
        }
        return new Color({ red: 255, green: 0, blue: 0 })
    }, [color_1, color_2])

    const handleCopy = () => {
        navigator.clipboard
            .writeText(result.toHEX())
            .then(() => setCopied(true))
    }

    const handleRandomColor = (field: 'color_1' | 'color_2') => {
        const randomColor = getRandomHexColor()
            .toHEX()
            .replace('#', '')
            .toUpperCase()
        setValue(field, randomColor)
    }

    const handleChange =
        (field: 'color_1' | 'color_2') =>
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(field, event.target.value.toUpperCase())
        }

    return (
        <Container className={styles.container} as={'main'}>
            <section className={styles.section}>
                <Controller
                    control={control}
                    name="color_1"
                    render={({ field }) => (
                        <Input
                            icon={<PaintBoardIcon />}
                            placeholder="000000"
                            {...field}
                            label="Color #1"
                            onChange={handleChange('color_1')}
                            action={
                                <Button
                                    isIcon
                                    onClick={() => handleRandomColor('color_1')}
                                    variant="secondary"
                                >
                                    <DiceFaces03Icon />
                                </Button>
                            }
                        />
                    )}
                />
                <div
                    style={{
                        backgroundColor: Color.fromHEX(color_1).toHEX(),
                    }}
                    className={styles.preview}
                />
            </section>
            <section className={clsx(styles.section, styles.result)}>
                <Notification
                    show={copied}
                    onHide={setCopied}
                    message={`${result.toHEX()} is copied`}
                />
                <span>Result of Mixing</span>
                <div
                    className={styles.preview}
                    style={{ backgroundColor: result.toHEX() }}
                />
                <Input readOnly value={result.toHEX()} />
                <Button onClick={handleCopy}>Copy</Button>
            </section>
            <section className={styles.section}>
                <Controller
                    control={control}
                    name="color_2"
                    render={({ field }) => (
                        <Input
                            icon={<PaintBoardIcon />}
                            placeholder="000000"
                            {...field}
                            label="Color #2"
                            onChange={handleChange('color_2')}
                            action={
                                <Button
                                    isIcon
                                    onClick={() => handleRandomColor('color_2')}
                                    variant="secondary"
                                >
                                    <DiceFaces03Icon />
                                </Button>
                            }
                        />
                    )}
                />
                <div
                    style={{
                        backgroundColor: Color.fromHEX(color_2).toHEX(),
                    }}
                    className={styles.preview}
                />
            </section>
        </Container>
    )
}
