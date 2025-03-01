'use client'

import { ColorScale, Container } from '@/components'
import { Button, Input } from '@/ui'
import { Controller, useForm } from 'react-hook-form'
import styles from './page.module.scss'
import { getRandomHexColor } from '@/utils/generateShades'
import { DiceFaces03Icon } from '@/public/icons'
import { ChangeEvent } from 'react'
import ScaleExport from '@/components/scale-export/scale-export'
type FormValues = {
    color: string
}
export default function Page() {
    const { setValue, control, watch } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: { color: '#3AC061' },
    })

    const handleClick = () => {
        setValue('color', getRandomHexColor())
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue('color', event.target.value.toUpperCase())
    }
    return (
        <Container as={'main'}>
            <section className={styles.header}>
                <span className="heading lg ">CSS Color scale generator</span>
                <p className="muted label">
                    Generate scales by entering hex color or hit the Random
                    button
                </p>
            </section>
            <section className={styles.controller}>
                <div className={styles.block}>
                    <Controller
                        control={control}
                        name="color"
                        render={({ field }) => (
                            <Input
                                placeholder="#000000"
                                {...field}
                                onChange={handleChange}
                            />
                        )}
                    />
                    <Button isIcon onClick={handleClick} variant="secondary">
                        <DiceFaces03Icon />
                    </Button>
                </div>
                <div className={styles.block}>
                    {/* <Button isIcon variant="secondary">
                        <Bookmark01Icon />
                    </Button> */}
                    <ScaleExport data={watch('color')} />
                </div>
            </section>
            <ColorScale base={watch('color')} />
        </Container>
    )
}
