'use client'
import Color from '@/lib/color.class'
import { generateShades, getContrast } from '@/lib/color.utils'
import { Export } from '@/components'
import styles from './shades.module.scss'
import Notification from '@/ui/notification/notification'
import { useState } from 'react'

import { motion } from 'framer-motion'

export interface ShadesType {
    name: string
    base: Color
}

const Shades = ({ name, base }: ShadesType) => {
    const shades = generateShades(base, 12)
    const KEYS = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    const [isVisible, setMessageVisibility] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>(null)

    const handleClick = (color: Color) => {
        navigator.clipboard
            .writeText(color.toHEX())
            .then(() => {
                setMessageVisibility(true)
                setMessage(`${color.toHEX()} is copied`)
            })
            .catch((err) => console.error('Failed to copy:', err))
    }

    return (
        <section className={styles.palette}>
            <header className={styles.palette__header}>
                <span className="heading">{name}</span>
                <Export name={name} shades={shades} />
            </header>
            <Notification
                show={isVisible}
                onHide={setMessageVisibility}
                message={message}
            />
            <div className={styles.grid}>
                {shades.map((elem, index) => {
                    const contrast = getContrast(elem, Color.fromHEX('#ffffff'))
                    const foreground =
                        contrast < 3
                            ? shades[shades.length - 2].toHEX()
                            : shades[0].toHEX()
                    return (
                        <motion.article
                            animate={{
                                backgroundColor: elem.toHEX(),
                                color: foreground,
                            }}
                            onClick={() => handleClick(elem)}
                            key={index}
                            className={styles.gridItem}
                        >
                            <span>{KEYS[index]}</span>
                            <p className="label sm">{elem.toHEX()}</p>
                        </motion.article>
                    )
                })}
            </div>
        </section>
    )
}

export default Shades
