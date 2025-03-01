export const isValidHexColor = (hex: string) => {
    const regex = /^#[0-9A-Fa-f]{6}$/
    return regex.test(hex)
}

export function generateShades(
    hex: string,
    factor: number = 0.1,
    steps: number = 5
): string[] {
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

    // Функция для преобразования RGB в HEX
    const rgbToHex = (r: number, g: number, b: number): string => {
        return `#${[r, g, b]
            .map((c) =>
                Math.max(0, Math.min(255, c)).toString(16).padStart(2, '0')
            )
            .join('')}`
    }

    // Функция для генерации оттенков
    const generateTintShade = (
        r: number,
        g: number,
        b: number,
        factor: number
    ): string => {
        const newR = Math.round(r + (255 - r) * factor)
        const newG = Math.round(g + (255 - g) * factor)
        const newB = Math.round(b + (255 - b) * factor)
        return rgbToHex(newR, newG, newB)
    }

    const generateShade = (
        r: number,
        g: number,
        b: number,
        factor: number
    ): string => {
        const newR = Math.round(r * (1 - factor))
        const newG = Math.round(g * (1 - factor))
        const newB = Math.round(b * (1 - factor))
        return rgbToHex(newR, newG, newB)
    }

    const [r, g, b] = hexToRgb(hex)
    const shades: string[] = []

    // Добавляем 5 оттенков светлее
    for (let i = steps; i > 0; i--) {
        shades.push(generateTintShade(r, g, b, i * factor))
    }

    // Оригинальный цвет
    shades.push(hex)

    // Добавляем 5 оттенков темнее
    for (let i = 1; i <= steps; i++) {
        shades.push(generateShade(r, g, b, i * factor))
    }

    return shades
}

export function getRandomHexColor(): string {
    const cryptoArray = new Uint8Array(3)
    crypto.getRandomValues(cryptoArray)

    return `#${Array.from(cryptoArray)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('')}`.toUpperCase()
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
