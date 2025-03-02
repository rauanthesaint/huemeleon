import { HEX, HSL, RGB } from '@/types'

export default class Color {
    private value: RGB

    constructor(value: RGB) {
        this.value = value
    }

    // HEX => RGB
    static fromHEX(hex: HEX) {
        hex = hex.replace(/^#/, '')
        const red = parseInt(hex.substring(0, 2), 16)
        const green = parseInt(hex.substring(2, 4), 16)
        const blue = parseInt(hex.substring(4, 6), 16)
        return new Color({ red, green, blue })
    }
    // HSL => RGB
    static fromHSL(hsl: HSL) {
        let { lightness, saturation } = hsl
        const hue = hsl.hue

        saturation /= 100
        lightness /= 100
        const k = (n: number) => (n + hue / 30) % 12
        const a = saturation * Math.min(lightness, 1 - lightness)
        const f = (n: number) =>
            lightness -
            a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
        return new Color({
            red: Math.round(f(0) * 255),
            green: Math.round(f(8) * 255),
            blue: Math.round(f(4) * 255),
        })
    }

    // RGB => RGB
    toRGB(): RGB {
        return this.value
    }
    // RGB => HEX
    toHEX(): HEX {
        const { red, green, blue } = this.value
        return `#${[red, green, blue]
            .map((c) =>
                Math.max(0, Math.min(255, c)).toString(16).padStart(2, '0')
            )
            .join('')}`.toUpperCase()
    }
    // RGB => HSL
    toHSL(): HSL {
        const { red, green, blue } = this.value
        const r = red / 255
        const g = green / 255
        const b = blue / 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const delta = max - min

        let hue = 0
        let saturation = 0
        const lightness = (max + min) / 2

        if (delta !== 0) {
            saturation =
                lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)

            switch (max) {
                case r:
                    hue = ((g - b) / delta + (g < b ? 6 : 0)) * 60
                    break
                case g:
                    hue = ((b - r) / delta + 2) * 60
                    break
                case b:
                    hue = ((r - g) / delta + 4) * 60
                    break
            }
        }

        return {
            hue: Math.round(hue),
            saturation: Math.round(saturation * 100),
            lightness: Math.round(lightness * 100),
        }
    }

    toFormattedHSL(): string {
        const hsl = this.toHSL()
        return `${hsl.hue}°, ${hsl.saturation}%, ${hsl.lightness}%`
    }

    toCssHSL(): string {
        const hsl = this.toHSL()
        return `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`
    }
}
