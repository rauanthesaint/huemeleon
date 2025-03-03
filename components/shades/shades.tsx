import Color from '@/lib/color.class'
import { generateShades, getContrast } from '@/lib/color.utils'
import ScaleExport from '../scale-export/scale-export'

import styles from './shades.module.scss'

export interface ShadesType {
    name: string
    base: Color
}

const Shades = ({ name, base }: ShadesType) => {
    const shades = generateShades(base, 12)
    const KEYS = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 950]

    return (
        <section className={styles.palette}>
            <header className={styles.palette__header}>
                <span className="heading">{name}</span>
                <ScaleExport name={name} data={base} />
            </header>
            <div className={styles.grid}>
                {shades.map((elem, index) => {
                    const contrast = getContrast(elem, Color.fromHEX('#ffffff'))
                    const foreground =
                        contrast < 3
                            ? shades[shades.length - 2].toHEX()
                            : shades[0].toHEX()
                    return (
                        <article
                            style={{
                                backgroundColor: elem.toHEX(),
                                color: foreground,
                            }}
                            key={index}
                            className={styles.gridItem}
                        >
                            <span>{KEYS[index]}</span>
                            <p className="label sm">{elem.toHEX()}</p>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

export default Shades
