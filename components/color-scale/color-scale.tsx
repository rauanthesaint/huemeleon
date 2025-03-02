'use client'

import styles from './color-scale.module.scss'

import { generateShades, getContrast } from '@/lib/color.utils'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { GeistMono } from '@/lib/font'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import clsx from 'clsx'
import Color from '@/lib/color.class'

const ColorScale = ({ base }: { base: Color }) => {
    const shades = generateShades(base, 12)
    const [show, setShow] = useState<number | null>(null)

    const handleClick = (color: Color, index: number) => {
        navigator.clipboard
            .writeText(color.toHEX())
            .then(() => {
                setShow(index)
            })
            .catch((err) => console.error('Failed to copy:', err))
    }
    return (
        <section className={clsx(styles.content, GeistMono.className)}>
            {shades.map((color, index) => {
                const contrast = getContrast(color, Color.fromHEX('#ffffff'))
                const foreground = contrast < 3 ? 'black' : 'white'
                return (
                    <article
                        onClick={() => handleClick(color, index)}
                        className={styles.card}
                        key={index}
                        style={{
                            backgroundColor: color.toHEX(),
                            color: foreground,
                        }}
                    >
                        <span>{color.toHEX().toUpperCase()}</span>
                        <p className="label sm">{index + 1}</p>
                        <Curtain
                            message={`${color.toHEX().toUpperCase()} copied`}
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
        active: { opacity: 1 },
        inactive: { opacity: 0 },
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
