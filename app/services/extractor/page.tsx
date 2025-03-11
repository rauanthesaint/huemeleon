'use client'

import { Container } from '@/components'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import styles from './page.module.scss'
import { Button } from '@/ui'
import { ImageUploadIcon } from '@/public/icons'

type FormValues = {
    file: FileList | null
}

export default function Page() {
    const { control, watch } = useForm<FormValues>({ mode: 'onChange' })
    const fileList = watch('file')

    const [preview, setPreview] = useState<string | null>(null)
    const [filename, setFilename] = useState<string | null>(null)

    useEffect(() => {
        if (fileList?.length) {
            const file = fileList[0]
            const reader = new FileReader()
            setFilename(file.name)

            reader.onload = async (e) => {
                if (e.target?.result) {
                    const imageSrc = e.target.result.toString()
                    setPreview(imageSrc)
                }
            }

            reader.readAsDataURL(file)
        }
    }, [fileList])

    return (
        <Container as="main">
            <section className={styles.container}>
                <header>
                    <span className="heading">{filename}</span>
                    <div className={styles.block}>
                        <label htmlFor="file" className={styles.uploader}>
                            {preview ? (
                                <Button variant="secondary" as={'div'}>
                                    Replace
                                </Button>
                            ) : (
                                <Button variant="secondary" as={'div'}>
                                    <ImageUploadIcon />
                                    Choose a file
                                </Button>
                            )}
                            <Controller
                                name="file"
                                control={control}
                                render={({ field: { onChange, ref } }) => (
                                    <input
                                        id="file"
                                        type="file"
                                        accept="image/*"
                                        title="Hello"
                                        hidden
                                        ref={ref}
                                        onChange={(e) =>
                                            onChange(e.target.files)
                                        }
                                    />
                                )}
                            />
                        </label>
                    </div>
                </header>

                <section className={styles.content}>
                    <div className={styles.view}>
                        {preview && (
                            <NextImage
                                src={preview}
                                alt="Uploaded"
                                width={100}
                                height={100}
                            />
                        )}
                    </div>
                </section>
            </section>
        </Container>
    )
}
