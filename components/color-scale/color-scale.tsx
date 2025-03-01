'use client'

import { HEX } from '@/types'

import styles from './color-scale.module.scss'
import { generateShades } from '@/utils/color.class'
import { getContrast } from '@/lib/color'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { GeistMono } from '@/lib/font'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import clsx from 'clsx'

const ColorScale = ({ base }: { base: HEX }) => {
    const shades = generateShades(base, 12)
    const [show, setShow] = useState<number | null>(null)

    const handleClick = (color: HEX, index: number) => {
        navigator.clipboard
            .writeText(color)
            .then(() => {
                setShow(index)
            })
            .catch((err) => console.error('Failed to copy:', err))
    }

    return (
        <section className={clsx(styles.content, GeistMono.className)}>
            {shades.map((color, index) => {
                const contrast = getContrast(color, '#ffffff')
                const foreground =
                    contrast < 0.1 ? 'var(--foreground)' : 'var(--background)'
                return (
                    <article
                        onClick={() => handleClick(color, index)}
                        className={styles.card}
                        key={index}
                        style={{
                            backgroundColor: color,
                            color: foreground,
                        }}
                    >
                        <span>{color.toUpperCase()}</span>
                        <p className="label sm">{index + 1}</p>
                        <Curtain
                            message={`${color.toUpperCase()} copied`}
                            show={show === index}
                            onHide={setShow}
                        />
                    </article>
                )
            })}
        </section>
    )
}

interface NotificationProps {
    message: React.ReactNode
    show: boolean
    onHide: Dispatch<SetStateAction<number | null>>
}

const Curtain: React.FC<NotificationProps> = ({ message, onHide, show }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => onHide(null), 2000)
            return () => clearTimeout(timer)
        }
    }, [show, onHide])

    const ANIMATION: Variants = {
        active: { top: 0, height: '100%' },
        inactive: { top: 'auto', height: 0 },
    }

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    variants={ANIMATION}
                    animate="active"
                    initial="inactive"
                    exit="inactive"
                    className={styles.curtain}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ColorScale
