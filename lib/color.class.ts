import { HEX, HSL, LCH, RGB } from '@/types'

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

    private normalizeRGB() {
        const { red, green, blue } = this.value
        return { red: red / 255, green: green / 255, blue: blue / 255 }
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
        const { red, green, blue } = this.normalizeRGB()

        const max = Math.max(red, green, blue)
        const min = Math.min(red, green, blue)
        const delta = max - min

        let hue = 0
        let saturation = 0
        const lightness = (max + min) / 2

        if (delta !== 0) {
            saturation =
                lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)

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

        return {
            hue: Math.round(hue),
            saturation: Math.round(saturation * 100),
            lightness: Math.round(lightness * 100),
        }
    }

    toLCH(): LCH {
        const { red, green, blue } = this.normalizeRGB()
        const toLinear = (c: number) =>
            c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
        const rLin = toLinear(red) * 100,
            gLin = toLinear(green) * 100,
            bLin = toLinear(blue) * 100

        const X = rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375
        const Y = rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.072175
        const Z = rLin * 0.0193339 + gLin * 0.119192 + bLin * 0.9503041

        // Convert XYZ to Lab
        const refX = 95.047,
            refY = 100.0,
            refZ = 108.883
        const toLab = (c: number) =>
            c > 0.008856 ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116

        const L = 116 * toLab(Y / refY) - 16
        const a = 500 * (toLab(X / refX) - toLab(Y / refY))
        const b_ = 200 * (toLab(Y / refY) - toLab(Z / refZ))

        // Convert Lab to LCH
        const C = Math.sqrt(a * a + b_ * b_)
        let H = Math.atan2(b_, a) * (180 / Math.PI)
        if (H < 0) H += 360

        return {
            lightness: Math.round(L),
            chroma: Math.round(C),
            hue: Math.round(H),
        }
    }

    toFormattedHSL(): string {
        const hsl = this.toHSL()
        return `${hsl.hue}°, ${hsl.saturation}%, ${hsl.lightness}%`
    }

    toCssLCH(): string {
        const { lightness, chroma, hue } = this.toLCH()
        return `lch(${lightness.toFixed(2)}% ${chroma.toFixed(2)} ${hue.toFixed(
            2
        )}deg)`
    }

    toCssHSL(): string {
        const { hue, saturation, lightness } = this.toHSL()
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }
    toCssRGB(): string {
        const { red, blue, green } = this.value
        return `rgb(${red}, ${green}, ${blue})`
    }
}
