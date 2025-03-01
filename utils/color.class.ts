import { hexToHSL, hslToHEX } from '@/lib/color'
import { HEX } from '@/types'

export const generateShades = (color: HEX, steps: number): HEX[] => {
    const hsl = hexToHSL(color)
    return Array.from({ length: steps }, (_, i) => {
        const lightness = Math.max(
            0,
            Math.min(100, hsl.lightness - (i - steps / 2) * (100 / steps))
        )
        return hslToHEX({ ...hsl, lightness: Math.round(lightness) })
    })
}
