import { HEX, HSL, LCH, RGB, HSB } from '@/types'

export default class Color {
    equals(newColor: Color) {
        const currentRGB = this.toRGB()
        const newRGB = newColor.toRGB()
        return (
            currentRGB.red === newRGB.red &&
            currentRGB.green === newRGB.green &&
            currentRGB.blue === newRGB.blue
        )
    }

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

    // HSB => RGB
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
    toHSB(): HSB {
        const { red, green, blue } = this.normalizeRGB()

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
            hue: Math.round(hue),
            saturation: Math.round(saturation * 100),
            brightness: Math.round(brightness * 100),
        }
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
}
