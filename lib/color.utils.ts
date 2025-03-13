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

export const getLuminance = (color: Color): number => {
    let { red, green, blue } = color.toRGB()
    red /= 255
    green /= 255
    blue /= 255
    red = red <= 0.03928 ? red / 12.92 : Math.pow((red + 0.055) / 1.055, 2.4)
    green =
        green <= 0.03928
            ? green / 12.92
            : Math.pow((green + 0.055) / 1.055, 2.4)
    blue =
        blue <= 0.03928 ? blue / 12.92 : Math.pow((blue + 0.055) / 1.055, 2.4)
    return (
        Math.round((0.2126 * red + 0.7152 * green + 0.0722 * blue) * 1000) /
        1000
    )
}

export const getContrast = (color1: Color, color2: Color): number => {
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const contrast =
        (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05)

    return Math.round(contrast * 100) / 100 // Возвращаем корректный коэффициент контраста
}

export function getCommonColors(
    imageSrc: string
): Promise<{ color: string; position: { x: number; y: number } }[]> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous' // Enable CORS if the image is from another domain

        img.onload = () => {
            // Create canvas to draw and analyze the image
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                reject(new Error('Could not get canvas context'))
                return
            }

            // Set canvas dimensions to match image
            canvas.width = img.width
            canvas.height = img.height

            // Draw image to canvas
            ctx.drawImage(img, 0, 0)

            // Get pixel data from canvas
            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            )
            const pixels = imageData.data

            // Map to store color frequencies and their first occurrence position
            const colorMap: Map<
                string,
                { count: number; position: { x: number; y: number } }
            > = new Map()

            // Process each pixel (RGBA values come in groups of 4)
            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i]
                const g = pixels[i + 1]
                const b = pixels[i + 2]
                // Convert RGB to HEX
                const hex = rgbToHex(r, g, b)

                // Calculate x and y coordinates of the pixel
                const pixelIndex = i / 4
                const x = pixelIndex % canvas.width
                const y = Math.floor(pixelIndex / canvas.width)

                // If color already exists in map, increment its count
                // Otherwise, add new entry with count 1 and store position
                if (colorMap.has(hex)) {
                    const data = colorMap.get(hex)!
                    colorMap.set(hex, {
                        count: data.count + 1,
                        position: data.position, // Keep the first occurrence position
                    })
                } else {
                    colorMap.set(hex, {
                        count: 1,
                        position: { x, y },
                    })
                }
            }

            // Convert map to array and sort by frequency (count)
            const sortedColors = Array.from(colorMap.entries())
                .sort((a, b) => b[1].count - a[1].count)
                .slice(0, 10) // Get top 10
                .map(([color, data]) => ({
                    color,
                    position: data.position,
                }))

            resolve(sortedColors)
        }

        img.onerror = () => {
            reject(new Error('Failed to load image'))
        }

        // Set the source of the image
        img.src = imageSrc
    })
}
function rgbToHex(r: number, g: number, b: number): string {
    return (
        '#' +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex
            })
            .join('')
    )
}
