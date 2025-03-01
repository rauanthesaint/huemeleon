import { hexToHSL, hslToHEX } from '@/lib/color'
import { HEX } from '@/types'

export const generateShades = (color: HEX, steps: number): HEX[] => {
    const hsl = hexToHSL(color)
    const _ = 90
    // Ограничиваем диапазон светлоты, чтобы избежать чисто черного и белого
    const minLightness = Math.max(5, hsl.lightness - _) // Не даём уйти в абсолютный черный
    const maxLightness = Math.min(95, hsl.lightness + _) // Не даём уйти в абсолютный белый

    // Генерируем `steps` значений от `minLightness` до `maxLightness`
    const range = Array.from({ length: steps }, (_, i) => {
        const factor = i / (steps - 1) // Нормализация от 0 до 1
        return minLightness + factor * (maxLightness - minLightness)
    })

    return range.map((lightness) =>
        hslToHEX({ ...hsl, lightness: Math.round(lightness) })
    )
}
