import Color from '@/lib/color.class'
import { hslToHEX } from '@/lib/color.utils'
import { HEX } from '@/types'

export const generateShades = (color: Color, steps: number): HEX[] => {
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
            hslToHEX({ ...hsl, lightness: Math.round(lightness) })
        )
}
