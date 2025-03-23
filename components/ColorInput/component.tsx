import Color from '@/lib/color/color.class'
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import { ArrowDown01Icon } from '@/public/icons'
import { Button, Input } from '@/ui'
import { AnimatePresence, Variants, motion } from 'framer-motion'

import styles from './component.styles.module.scss'
import clsx from 'clsx'
import Picker from '../Picker/picker'
import { HEX, HSL, RGB } from '@/types'

interface Props {
    color: Color
    setColor: Dispatch<SetStateAction<Color>>
}
type Model = 'HEX' | 'HSL' | 'RGB'

const MODELS: Model[] = ['HEX', 'HSL', 'RGB']

const DropdownContentVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
}

const HEXInput: React.FC<Props> = ({ color, setColor }) => {
    const [inputValue, setInputValue] = useState<HEX>(color.toHEX())

    // Sync input when parent color changes (e.g., Picker interaction)
    useEffect(() => {
        setInputValue(color.toHEX())
    }, [color])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const hexValue = event.target.value
        setInputValue(hexValue) // Let the user type freely

        // Simple regex to check for 6-character HEX (with or without #)
        const isValidFullHex = /^#?[0-9A-Fa-f]{6}$/.test(hexValue)

        if (isValidFullHex) {
            try {
                const newColor = Color.fromHEX(hexValue)
                setColor(newColor)
            } catch (err) {
                console.error('Failed to parse HEX:', err)
            }
        }
    }

    return <Input value={inputValue} onChange={handleChange} />
}

const RGBInput: React.FC<Props> = ({ color, setColor }) => {
    const [inputValue, setInputValue] = useState<RGB>(color.toRGB())

    useEffect(() => {
        setInputValue(color.toRGB())
    }, [color])

    const handleChange =
        (key: keyof RGB) => (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value
            const numericValue = parseInt(value, 10)

            setInputValue((prev) => ({
                ...prev,
                [key]:
                    value === ''
                        ? ''
                        : isNaN(numericValue)
                        ? prev[key]
                        : numericValue,
            }))

            const tempRGB = {
                ...inputValue,
                [key]: numericValue,
            }

            const allValid = ['red', 'green', 'blue'].every((k) => {
                const val = tempRGB[k as keyof RGB]
                return typeof val === 'number' && val >= 0 && val <= 255
            })

            if (allValid) {
                try {
                    const newColor = new Color(tempRGB)
                    setColor(newColor)
                } catch (err) {
                    console.error('Failed to parse RGB:', err)
                }
            }
        }

    return (
        <div className={styles.inputContainer}>
            <Input value={inputValue.red} onChange={handleChange('red')} />
            <Input value={inputValue.green} onChange={handleChange('green')} />
            <Input value={inputValue.blue} onChange={handleChange('blue')} />
        </div>
    )
}

const HSLInput: React.FC<Props> = ({ color, setColor }) => {
    const [inputValue, setInputValue] = useState<HSL>(color.toHSL())

    useEffect(() => {
        setInputValue(color.toHSL())
    }, [color])

    const handleChange =
        (key: keyof HSL) => (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value
            const numericValue = parseFloat(value)

            setInputValue((prev) => ({
                ...prev,
                [key]:
                    value === ''
                        ? ''
                        : isNaN(numericValue)
                        ? prev[key]
                        : numericValue,
            }))

            // Check all fields
            const tempHSL = {
                ...inputValue,
                [key]: numericValue,
            }

            const allValid = ['hue', 'saturation', 'lightness'].every((k) => {
                const val = tempHSL[k as keyof HSL]
                if (typeof val !== 'number') return false
                if (k === 'hue') return val >= 0 && val <= 360
                return val >= 0 && val <= 100
            })

            if (allValid) {
                try {
                    const newColor = Color.fromHSL(tempHSL)
                    setColor(newColor)
                } catch (err) {
                    console.error('Failed to parse HSL:', err)
                }
            }
        }

    return (
        <div className={styles.inputContainer}>
            <Input value={inputValue.hue} onChange={handleChange('hue')} />
            <Input
                value={inputValue.saturation}
                onChange={handleChange('saturation')}
            />
            <Input
                value={inputValue.lightness}
                onChange={handleChange('lightness')}
            />
        </div>
    )
}

const ColorInput: React.FC<Props> = ({ color, setColor }) => {
    const [model, setModel] = useState<Model>('HEX')
    const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false)

    const handleDropdownContentItemClick = (value: Model) => {
        setModel(value)
        setDropdownVisibility(false)
    }

    const handleDropdownVisibility = () => {
        setDropdownVisibility(!dropdownVisibility)
    }

    const renderInput = () => {
        if (model === 'HEX') {
            return <HEXInput color={color} setColor={setColor} />
        }
        if (model == 'RGB') {
            return <RGBInput color={color} setColor={setColor} />
        }
        if (model == 'HSL') {
            return <HSLInput color={color} setColor={setColor} />
        }
        // Future: Add HSL and RGB inputs here
        return null
    }

    return (
        <section className={styles.container}>
            <Picker color={color} setColor={setColor} />

            <div className={styles.dropdown}>
                <Button
                    variant="secondary"
                    className={styles.dropdown__trigger}
                    onClick={handleDropdownVisibility}
                >
                    {model}
                    <ArrowDown01Icon />
                </Button>
                <AnimatePresence>
                    {dropdownVisibility && (
                        <motion.div
                            variants={DropdownContentVariants}
                            animate="visible"
                            initial="hidden"
                            exit="hidden"
                            className={clsx(
                                styles.dropdown__content,
                                'no-select'
                            )}
                        >
                            {MODELS.map((elem) => (
                                <div
                                    title={elem}
                                    className={clsx(
                                        styles.dropdown__content__item,
                                        elem === model && styles.active
                                    )}
                                    key={elem}
                                    onClick={() =>
                                        handleDropdownContentItemClick(elem)
                                    }
                                >
                                    {elem}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {renderInput()}
        </section>
    )
}

export default ColorInput
