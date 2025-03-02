export const isValidHexColor = (hex: string) => {
    const regex = /^#[0-9A-Fa-f]{6}$/
    return regex.test(hex)
}

export function getContrastWithWhite(hex: string): number {
    // Функция для преобразования HEX в RGB
    const hexToRgb = (hex: string): [number, number, number] => {
        let r = 0,
            g = 0,
            b = 0
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16)
            g = parseInt(hex[2] + hex[2], 16)
            b = parseInt(hex[3] + hex[3], 16)
        } else if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16)
            g = parseInt(hex.slice(3, 5), 16)
            b = parseInt(hex.slice(5, 7), 16)
        }
        return [r, g, b]
    }

    // Функция для вычисления относительной яркости (luminance)
    const getLuminance = (r: number, g: number, b: number): number => {
        const normalize = (c: number) => {
            c /= 255
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
        }
        const lum =
            0.2126 * normalize(r) +
            0.7152 * normalize(g) +
            0.0722 * normalize(b)
        return lum
    }

    const [r, g, b] = hexToRgb(hex)
    const lumColor = getLuminance(r, g, b)
    const lumWhite = 1 // Белый цвет (luminance = 1)

    // Контраст определяется как (L1 - L2) / L1 (так как белый цвет всегда ярче)
    const contrast = (lumWhite - lumColor) / lumWhite

    return contrast
}
