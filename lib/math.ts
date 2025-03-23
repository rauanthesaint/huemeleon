export function round(x: number, precision: number = 0): number {
    return Math.round(x * Math.pow(10, precision)) / Math.pow(10, precision)
}
