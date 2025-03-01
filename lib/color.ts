import { HEX, RGB, HSL } from '@/types'

export const hexToRGB = (color: HEX): RGB => {
    color = color.replace(/^#/, '')
    const red = parseInt(color.substring(0, 2), 16) / 255
    const green = parseInt(color.substring(2, 4), 16) / 255
    const blue = parseInt(color.substring(4, 6), 16) / 255
    return { red, green, blue }
}

const hexToLuminance = (color: HEX) => {
    let { red: r, green: g, blue: b } = hexToRGB(color)
    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const getContrast = (color1: HEX, color2: HEX) => {
    const lum1 = hexToLuminance(color1)
    const lum2 = hexToLuminance(color2)
    const contrast =
        (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05)
    return (contrast - 1) / 20
}

export const hexToHSL = (color: HEX): HSL => {
    const { red: r, green: g, blue: b } = hexToRGB(color)
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

export const hslToHEX = (hsl: HSL): HEX => {
    const { hue, saturation, lightness } = hsl
    const s = saturation / 100
    const l = lightness / 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
    const m = l - c / 2

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

    const toHex = (value: number) => {
        return Math.round((value + m) * 255)
            .toString(16)
            .padStart(2, '0')
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
