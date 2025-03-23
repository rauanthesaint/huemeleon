import { HEX, HSB, HSL, RGB } from '@/types'
import { round } from '../math'

export function normalizePercent(x: number): number {
    if (x < 0 || x > 100) {
        throw new Error(`Invalid Percentage: ${x}%`)
    }
    return x / 100
}

export function normalizeDegree(degree: number): number {
    if (degree < 0) {
        throw new Error(`Invalid Degree: ${degree}`)
    }
    return (degree / 360) % 1
}

export function normalizeChannel(channel: number): number {
    if (channel < 0 || channel > 255) {
        throw new Error(`Invalid Channel: ${channel}`)
    }
    return channel / 255
}

export default class Color {
    private value: RGB

    constructor(value: RGB) {
        this.value = value
    }

    toString(format: string): string {
        switch (format) {
            case 'HSL': {
                const { hue, saturation, lightness } = this.toHSL()
                return `${hue} ${saturation}% ${lightness}%`
            }
            case 'HSB': {
                const { hue, saturation, brightness } = this.toHSB()
                return `${hue} ${saturation}% ${brightness}%`
            }
            case 'RGB': {
                const { red, green, blue } = this.value
                return `${red} ${green} ${blue}`
            }
            default:
                return `#${this.toHEX()}`
        }
    }

    equals(newColor: Color) {
        const { red, green, blue } = this.value
        const { red: r, green: g, blue: b } = newColor.value
        return red === r && green === g && blue === b
    }

    toRGB(): RGB {
        return this.value
    }

    toHEX(): HEX {
        const { red, green, blue } = this.value

        const r = Math.max(0, Math.min(255, red)).toString(16).padStart(2, '0')
        const g = Math.max(0, Math.min(255, green))
            .toString(16)
            .padStart(2, '0')
        const b = Math.max(0, Math.min(255, blue)).toString(16).padStart(2, '0')

        return `${r}${g}${b}`.toUpperCase()
    }

    toHSB(): HSB {
        const { red, green, blue } = Color.normalizeRGB(this.value)

        const max = Math.max(red, green, blue)
        const min = Math.min(red, green, blue)
        const delta = max - min

        let hue = 0
        let saturation = 0
        const brightness = max

        // Calculate Hue
        if (delta !== 0) {
            switch (max) {
                case red:
                    hue = ((green - blue) / delta + (green < blue ? 6 : 0)) * 60
                    break
                case green:
                    hue = ((blue - red) / delta + 2) * 60
                    break
                case blue:
                    hue = ((red - green) / delta + 4) * 60
                    break
            }
        }

        // Calculate Saturation
        if (max !== 0) {
            saturation = delta / max
        }

        return {
            hue: round(hue),
            saturation: round(saturation * 100),
            brightness: round(brightness * 100),
        }
    }

    static fromHSB(hsb: HSB) {
        let { saturation, brightness } = hsb
        const hue = hsb.hue

        saturation /= 100
        brightness /= 100

        const c = brightness * saturation // chroma
        const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
        const m = brightness - c

        let r = 0,
            g = 0,
            b = 0

        if (hue >= 0 && hue < 60) {
            r = c
            g = x
            b = 0
        } else if (hue >= 60 && hue < 120) {
            r = x
            g = c
            b = 0
        } else if (hue >= 120 && hue < 180) {
            r = 0
            g = c
            b = x
        } else if (hue >= 180 && hue < 240) {
            r = 0
            g = x
            b = c
        } else if (hue >= 240 && hue < 300) {
            r = x
            g = 0
            b = c
        } else if (hue >= 300 && hue < 360) {
            r = c
            g = 0
            b = x
        }

        // Convert to 0-255 range
        return new Color({
            red: Math.round((r + m) * 255),
            green: Math.round((g + m) * 255),
            blue: Math.round((b + m) * 255),
        })
    }

    toHSL(): HSL {
        const { red, green, blue } = Color.normalizeRGB(this.value)

        const MAX = Math.max(red, green, blue)
        const MIN = Math.min(red, green, blue)
        const delta = MAX - MIN

        // Lightness
        const lightness = (MAX + MIN) / 2

        // Hue
        let hue = 0
        if (delta === 0) {
            hue = 0 // Hue undefined when no color variation, default to 0
        } else if (MAX === red) {
            hue = 60 * ((green - blue) / delta)
            if (hue < 0) hue += 360
        } else if (MAX === green) {
            hue = 60 * ((blue - red) / delta) + 120
        } else if (MAX === blue) {
            hue = 60 * ((red - green) / delta) + 240
        }

        // Saturation
        let saturation = 0
        if (delta === 0) {
            saturation = 0
        } else {
            saturation =
                lightness <= 0.5 ? delta / (MAX + MIN) : delta / (2 - MAX - MIN)
        }

        return {
            hue: Math.round(hue),
            saturation: round(saturation * 100),
            lightness: round(lightness * 100),
        }
    }

    static normalizeRGB({ red, green, blue }: RGB) {
        return {
            red: normalizeChannel(red),
            green: normalizeChannel(green),
            blue: normalizeChannel(blue),
        }
    }

    private static normalizeHSL({ hue, saturation, lightness }: HSL) {
        return {
            hue: normalizeDegree(hue),
            saturation: normalizePercent(saturation),
            lightness: normalizePercent(lightness),
        }
    }

    private static correctT(value: number) {
        return (value + 1) % 1
    }

    private static computeColor(P: number, Q: number, T: number) {
        if (T < 1 / 6) return P + (Q - P) * 6 * T
        if (T < 0.5) return Q
        if (T < 2 / 3) return P + (Q - P) * (2 / 3 - T) * 6
        return P
    }

    static fromHEX(color: HEX): Color {
        const red = parseInt(color.substring(0, 2), 16)
        const green = parseInt(color.substring(2, 4), 16)
        const blue = parseInt(color.substring(4, 6), 16)
        return new Color({ red, green, blue })
    }

    static fromHSL(color: HSL): Color {
        const { hue, saturation, lightness } = this.normalizeHSL(color)

        const Q =
            lightness < 0.5
                ? lightness * (1 + saturation)
                : lightness + saturation - lightness * saturation

        const P = 2 * lightness - Q

        const TR = this.correctT(hue + 1 / 3)
        const TG = this.correctT(hue)
        const TB = this.correctT(hue - 1 / 3)

        return new Color({
            red: round(this.computeColor(P, Q, TR) * 255),
            green: round(this.computeColor(P, Q, TG) * 255),
            blue: round(this.computeColor(P, Q, TB) * 255),
        })
    }
}
