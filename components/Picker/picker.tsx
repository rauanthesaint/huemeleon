import styles from './picker.module.scss'

// interface PickerProps {}

const Picker = () => {
    return (
        <section className={styles.component}>
            <svg className={styles.canvas}>
                <defs>
                    <linearGradient
                        id="gradient-horizontal"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor={'red'} />
                    </linearGradient>
                    <linearGradient
                        id="gradient-vertical"
                        x1="0%"
                        x2="0%"
                        y1="0%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                        <stop offset="100%" stopColor="black" />
                    </linearGradient>
                </defs>

                <rect
                    fill="url(#gradient-horizontal)"
                    height="100%"
                    width="100%"
                />
                <rect
                    fill="url(#gradient-vertical)"
                    height="100%"
                    width="100%"
                />
            </svg>
            <svg className={styles.slider}>
                <defs>
                    <linearGradient
                        id="slider"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="0%"
                    >
                        {Array.from({ length: 360 }, (_, i) => (
                            <stop
                                key={i}
                                offset={`${i / 360}`}
                                stopColor={hueToHex(i)}
                            />
                        ))}
                    </linearGradient>
                </defs>
                <rect fill="url(#slider)" height="100%" width="100%" />
                {/* <rect
                    fill="white"
                    height={'100%'}
                    width={4}
                    x={`calc(${Math.round((0 / 360) * 100)}% - 2px)`}
                /> */}
            </svg>
        </section>
    )
}

export default Picker

const hueToHex = (hue: number): string => {
    const h = hue / 360
    let r, g, b
    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = 0
    const q = 1 - f
    const t = f

    switch (i % 6) {
        case 0:
            r = 1
            g = t
            b = p
            break
        case 1:
            r = q
            g = 1
            b = p
            break
        case 2:
            r = p
            g = 1
            b = t
            break
        case 3:
            r = p
            g = q
            b = 1
            break
        case 4:
            r = t
            g = p
            b = 1
            break
        case 5:
            r = 1
            g = p
            b = q
            break
        default:
            r = 0
            g = 0
            b = 0
    }

    return `#${Math.round(r * 255)
        .toString(16)
        .padStart(2, '0')}${Math.round(g * 255)
        .toString(16)
        .padStart(2, '0')}${Math.round(b * 255)
        .toString(16)
        .padStart(2, '0')}`.toUpperCase()
}
