'use client'

import Color from '@/lib/color/color.class'
import styles from './picker.module.scss'
import { useMemo, useRef, useCallback, useState } from 'react'
import { Button, Dropdown } from '@/ui'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ColorPickerIcon } from '@/public/icons'

type PickerProps = {
    setColor: (color: Color) => void
    color: Color
}

const sliderBackground = () => {
    const step = 5
    const colors = Array.from({ length: 360 / step + 1 }, (_, i) => {
        return Color.fromHSL({
            hue: i * step,
            saturation: 100,
            lightness: 50,
        }).toString('HEX')
    })
    return `linear-gradient(90deg, ${colors.join(',')})`
}

const Picker: React.FC<PickerProps> = ({ setColor, color }) => {
    const [show, setShow] = useState<boolean>(false)

    const hueSliderRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLDivElement>(null)

    const { hue, saturation, brightness } = color.toHSB()

    // === Saturation-Brightness Canvas Gradient ===
    const canvasBackground = useMemo(() => {
        return `linear-gradient(transparent, black), linear-gradient(90deg, white, hsl(${hue}, 100%, 50%))`
    }, [hue])

    // === Indicator Position for Hue ===
    const huePercentage = useMemo(() => (hue / 360) * 100, [hue])

    // === Indicator Position for Canvas (Saturation & Brightness) ===
    const canvasIndicatorStyle = useMemo(
        () => ({
            left: `${saturation}%`,
            top: `${100 - brightness}%`,
        }),
        [saturation, brightness]
    )

    const handleClose = () => {
        setShow((prev) => !prev)
    }

    // === Update Hue from Slider Position ===
    const updateHueFromPosition = useCallback(
        (clientX: number) => {
            if (!hueSliderRef.current) return
            const rect = hueSliderRef.current.getBoundingClientRect()
            const newPercentage = Math.max(
                0,
                Math.min(1, (clientX - rect.left) / rect.width)
            )
            const newHue = Math.floor(newPercentage * 360)
            const newColor = Color.fromHSB({
                hue: newHue === 360 ? 359 : newHue,
                saturation,
                brightness,
            })
            if (!color.equals(newColor)) {
                setColor(newColor)
            }
        },
        [saturation, brightness, color, setColor]
    )

    // === Update Saturation & Brightness from Canvas Position ===
    const updateCanvasPosition = useCallback(
        (clientX: number, clientY: number) => {
            if (!canvasRef.current) return
            const rect = canvasRef.current.getBoundingClientRect()
            const sat =
                Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) *
                100
            const bright =
                Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)) *
                100
            const newColor = Color.fromHSB({
                hue,
                saturation: Math.round(sat),
                brightness: 100 - Math.round(bright),
            })
            if (!color.equals(newColor)) {
                setColor(newColor)
            }
        },
        [hue, color, setColor]
    )

    // === Mouse Handlers for Hue ===
    const handleHueMouseDown = (e: React.MouseEvent) => {
        updateHueFromPosition(e.clientX)
        const handleMouseMove = (e: MouseEvent) =>
            updateHueFromPosition(e.clientX)
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    // === Mouse Handlers for Canvas ===
    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        updateCanvasPosition(e.clientX, e.clientY)
        const handleMouseMove = (e: MouseEvent) =>
            updateCanvasPosition(e.clientX, e.clientY)
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    return (
        <div className={styles.container}>
            <Button
                title="Picker"
                onClick={handleClose}
                style={{ backgroundColor: color.toString('HEX') }}
                isIcon
            >
                <ColorPickerIcon />
            </Button>
            <Dropdown isActive={show} onClose={handleClose}>
                <section className={clsx(styles.content, 'no-select')}>
                    {/* SATURATION-VALUE CANVAS */}
                    <div
                        ref={canvasRef}
                        style={{ background: canvasBackground }}
                        className={styles.canvas}
                        onMouseDown={handleCanvasMouseDown}
                    >
                        <motion.div
                            className={styles.indicator}
                            animate={canvasIndicatorStyle}
                            transition={{ type: 'keyframes' }}
                        />
                    </div>

                    {/* HUE SLIDER */}
                    <div
                        ref={hueSliderRef}
                        style={{ background: sliderBackground() }}
                        className={styles.slider}
                        onMouseDown={handleHueMouseDown}
                    >
                        <motion.div
                            className={styles.indicator}
                            animate={{ left: `${huePercentage}%` }}
                            transition={{ type: 'tween' }}
                        />
                    </div>
                </section>
            </Dropdown>
        </div>
    )
}

export default Picker
