import Color from './color.class'

export function validateHexColor(color: string): boolean {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/
    return hexRegex.test(color)
}

export const generateShades = (color: Color, steps: number): Color[] => {
    const hsl = color.toHSL()
    const _ = 90
    // Ограничиваем диапазон светлоты, чтобы избежать чисто черного и белого
    const minLightness = Math.max(5, hsl.lightness - _) // Не даём уйти в абсолютный черный
    const maxLightness = Math.min(95, hsl.lightness + _) // Не даём уйти в абсолютный белый

    // Генерируем `steps` значений от `minLightness` до `maxLightness`
    const range = Array.from({ length: steps }, (_, i) => {
        const factor = i / (steps - 1) // Нормализация от 0 до 1
        return minLightness + factor * (maxLightness - minLightness)
    })

    return range
        .toReversed()
        .map((lightness) =>
            Color.fromHSL({ ...hsl, lightness: Math.round(lightness) })
        )
}

export function getRandomHexColor(): Color {
    const cryptoArray = new Uint8Array(3)
    crypto.getRandomValues(cryptoArray)

    return Color.fromHEX(
        Array.from(cryptoArray)
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase()
    )
}

const hexToLuminance = (color: Color): number => {
    let { red, green, blue } = color.toRGB()
    red = red <= 0.03928 ? red / 12.92 : Math.pow((red + 0.055) / 1.055, 2.4)
    green =
        green <= 0.03928
            ? green / 12.92
            : Math.pow((green + 0.055) / 1.055, 2.4)
    blue =
        blue <= 0.03928 ? blue / 12.92 : Math.pow((blue + 0.055) / 1.055, 2.4)
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

export const getContrast = (color1: Color, color2: Color): number => {
    const lum1 = hexToLuminance(color1)
    const lum2 = hexToLuminance(color2)
    const contrast =
        (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05)
    return Math.round(contrast * 100) / 100 // Возвращаем корректный коэффициент контраста
}
