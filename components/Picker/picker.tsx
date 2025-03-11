'use client'

import styles from './picker.module.scss'
import {
    useState,
    useRef,
    useEffect,
    useCallback,
    useLayoutEffect,
} from 'react'
import Color from '@/lib/color.class'

const CanvasColorPicker = ({
    color,
    setColor,
}: {
    color: Color
    setColor: (color: Color) => void
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const hueCanvasRef = useRef<HTMLCanvasElement>(null)
    const [canvasSize, setCanvasSize] = useState({ width: 256, height: 128 })

    // Draw the color gradient
    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const { width, height } = canvasSize
        const hueColor = color.toHEX()

        // Draw horizontal gradient (white → hue color)
        const horizontalGradient = ctx.createLinearGradient(0, 0, width, 0)
        horizontalGradient.addColorStop(0, '#ffffff')
        horizontalGradient.addColorStop(1, hueColor)

        ctx.fillStyle = horizontalGradient
        ctx.fillRect(0, 0, width, height)

        // Draw vertical gradient (transparent → black)
        const verticalGradient = ctx.createLinearGradient(0, 0, 0, height)
        verticalGradient.addColorStop(0, 'transparent')
        verticalGradient.addColorStop(1, 'rgba(0,0,0,1)')

        ctx.fillStyle = verticalGradient
        ctx.fillRect(0, 0, width, height)

        // Draw selection circle
        const hsl = color.toHSL()
        const x = (hsl.saturation / 100) * width
        const y = (1 - hsl.lightness / 100) * height
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, 2 * Math.PI)
        ctx.stroke()
    }, [color, canvasSize])

    // Draw the hue gradient slider
    const drawHueSlider = useCallback(() => {
        const canvas = hueCanvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const { width, height } = canvas
        const gradient = ctx.createLinearGradient(0, 0, width, 0)

        for (let i = 0; i <= 360; i += 10) {
            const hueColor = Color.fromHSL({
                hue: i,
                saturation: 100,
                lightness: 50,
            }).toHEX()
            gradient.addColorStop(i / 360, hueColor)
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        // Draw selector
        const hsl = color.toHSL()
        const x = (hsl.hue / 360) * width
        ctx.fillStyle = 'white'
        ctx.fillRect(x - 2, 0, 4, height)
    }, [color])

    useLayoutEffect(() => {
        const container = document.querySelector(`.${styles.container}`)
        if (container) {
            const containerWidth = container.clientWidth - 8
            setCanvasSize({
                height: (containerWidth * 2) / 3,
                width: containerWidth,
            })
        }
    }, [])
    // Update canvas when color changes
    useEffect(() => {
        drawCanvas()
    }, [drawCanvas])

    useEffect(() => {
        drawHueSlider()
    }, [drawHueSlider])

    return (
        <section className={styles.container}>
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
            />
            <canvas ref={hueCanvasRef} width={canvasSize.width} height={16} />
        </section>
    )
}

export default CanvasColorPicker
