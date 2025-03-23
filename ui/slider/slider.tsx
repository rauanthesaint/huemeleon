'use client'

import clsx from 'clsx'
import styles from './slider.module.scss'
import { useRef, CSSProperties } from 'react'
import { motion } from 'framer-motion'

type SliderProps = {
    step?: number
    min?: number
    max?: number
    className?: string
    onChange?: (value: number) => void
    label: string
    style?: CSSProperties
    value: number
}

const Slider: React.FC<SliderProps> = ({
    min = 0,
    max = 100,
    step = 1,
    className,
    onChange,
    label,
    style,
    value,
}) => {
    const ref = useRef<HTMLDivElement>(null)

    const percentage = () => {
        const result = ((value - min) / (max - min)) * 100
        if (result > max) {
            return max
        }
        return result
    }

    const updateValueFromPosition = (clientX: number) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        let newPercentage = ((clientX - rect.left) / rect.width) * 100
        newPercentage = Math.max(0, Math.min(100, newPercentage)) // Clamp
        let newValue = min + (newPercentage / 100) * (max - min)
        newValue = Math.round(newValue / step) * step // Step
        onChange?.(newValue)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        updateValueFromPosition(e.clientX)
        const handleMouseMove = (e: MouseEvent) => {
            updateValueFromPosition(e.clientX)
        }
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0]
        updateValueFromPosition(touch.clientX)
        const handleTouchMove = (e: TouchEvent) => {
            updateValueFromPosition(e.touches[0].clientX)
        }
        const handleTouchEnd = () => {
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchend', handleTouchEnd)
        }
        window.addEventListener('touchmove', handleTouchMove)
        window.addEventListener('touchend', handleTouchEnd)
    }

    return (
        <div className={styles.container}>
            <div className={styles.label}>
                <span className="label">{label}</span>
                <span className="label">{value}</span>
            </div>
            <div
                ref={ref}
                style={style}
                className={clsx(styles.slider, className)}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <motion.div
                    className={styles.indicator}
                    animate={{ left: `${percentage()}%` }}
                    transition={{ type: 'tween' }}
                />
            </div>
        </div>
    )
}

export default Slider
