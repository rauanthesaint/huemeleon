'use client'

import Color from '@/lib/color/color.class'
import { Button, Modal } from '@/ui'
import { JSX, useCallback, useEffect, useRef, useState } from 'react'

import styles from './export.module.scss'
import { Cancel01Icon, Copy01Icon } from '@/public/icons'
import clsx from 'clsx'
import Notification from '@/ui/notification/notification'

const FORMATS = ['HEX', 'RGB', 'HSL', 'LCH']
const ENVS = ['Figma', 'SCSS', 'CSS']
const KEYS = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const Export = ({ shades, name }: { shades: Color[]; name: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [environment, setEnvironment] = useState<string>('CSS')
    const [format, setFormat] = useState<string>('HEX')
    const [formattedVariables, setFormattedVariables] = useState<JSX.Element[]>(
        []
    )
    const contentRef = useRef<HTMLUListElement>(null)
    const [copied, setIsCopied] = useState<boolean>(false)

    const handleClose = () => setIsOpen((prev) => !prev)
    name = name.toLowerCase()
    const detectFormat = useCallback(
        (format: string) => {
            return shades.map((color) => {
                switch (format) {
                    case 'RGB': {
                        const { red, green, blue } = color.toRGB()
                        return `rgb(${red}, ${green}, ${blue})`
                    }
                    case 'HSL': {
                        const { hue, saturation, lightness } = color.toHSL()
                        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
                    }
                    // case 'LCH': {
                    //     const { lightness, chroma, hue } = color.toLCH()
                    //     return `lch(${lightness}%, ${chroma}%, ${hue})`
                    // }
                    default:
                        return color.toHEX()
                }
            })
        },
        [shades]
    )

    const generateVariables = useCallback(
        (environment: string) => {
            switch (environment) {
                case 'SCSS':
                    return detectFormat(format).map((elem, index) => (
                        <li key={`${name}-${index}`} className="mono">
                            <span className={styles.variable__name}>
                                {`$color-${name}-${KEYS[index]}: `}
                            </span>
                            <span className={styles.variable__value}>
                                {elem}
                            </span>
                            ;
                        </li>
                    ))
                case 'Figma':
                    return [
                        <li style={{ display: 'none' }} key={`${name}-svg`}>
                            <svg
                                width="1200"
                                height="100"
                                viewBox="0 0 1200 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {shades.map((elem, index) => (
                                    <rect
                                        key={`${name}-${index}`}
                                        width="100"
                                        height="100"
                                        x={100 * index}
                                        fill={elem.toHEX()}
                                    />
                                ))}
                            </svg>
                        </li>,
                        <li className={styles.preview} key={'preview'}>
                            <span className="span muted centered">
                                No preview available
                            </span>
                        </li>,
                    ]

                default:
                    return detectFormat(format).map((elem, index) => (
                        <li key={`${name}-${index}`} className="mono">
                            <span className={styles.variable__name}>
                                {`--color-${name}-${KEYS[index]}: `}
                            </span>
                            <span className={styles.variable__value}>
                                {elem}
                            </span>
                            ;
                        </li>
                    ))
            }
        },
        [format, detectFormat, name, shades]
    )

    const handleCopy = () => {
        if (contentRef.current) {
            if (environment === 'Figma') {
                const textToCopy = Array.from(contentRef.current.children)
                    .map((li) => li.innerHTML.trim())
                    .join('\n')

                navigator.clipboard
                    .writeText(textToCopy || '')
                    .then(() => {
                        setIsCopied(true)
                    })
                    .catch((err) => {
                        console.error('Failed to copy:', err)
                    })
            } else {
                const textToCopy = Array.from(contentRef.current.children)
                    .map((li) => li.textContent?.trim())
                    .join('\n')

                navigator.clipboard
                    .writeText(textToCopy || '')
                    .then(() => {
                        setIsCopied(true)
                    })
                    .catch((err) => {
                        console.error('Failed to copy:', err)
                    })
            }
        }
    }

    useEffect(() => {
        setFormattedVariables(generateVariables(environment))
    }, [generateVariables, environment])

    return (
        <>
            <Button onClick={handleClose} variant="secondary">
                Export
            </Button>
            <Modal
                className={styles.container}
                isOpen={isOpen}
                onClose={handleClose}
            >
                <header className={styles.header}>
                    <span>
                        Export {name} color for {environment}
                    </span>
                    <Button
                        onClick={handleClose}
                        isIcon
                        size="sm"
                        variant="secondary"
                    >
                        <Cancel01Icon />
                    </Button>
                </header>
                <section className={styles.content}>
                    <div className={clsx(styles.list, styles.environments)}>
                        {ENVS.map((elem) => (
                            <button
                                key={elem}
                                type="button"
                                onClick={() => setEnvironment(elem)}
                                className={clsx(
                                    styles.item,
                                    environment === elem && styles.active
                                )}
                            >
                                {elem}
                            </button>
                        ))}
                    </div>
                    {environment !== 'Figma' && (
                        <div className={clsx(styles.list, styles.formats)}>
                            {FORMATS.map((elem) => (
                                <button
                                    key={elem}
                                    type="button"
                                    onClick={() => setFormat(elem)}
                                    className={clsx(
                                        styles.item,
                                        format === elem && styles.active
                                    )}
                                >
                                    {elem}
                                </button>
                            ))}
                        </div>
                    )}

                    <Notification
                        show={copied}
                        onHide={setIsCopied}
                        message={'Copied'}
                    />
                    <ul ref={contentRef} className={styles.result}>
                        {formattedVariables}
                        <Button
                            isIcon
                            size="sm"
                            className={styles.copyButton}
                            variant="secondary"
                            onClick={handleCopy}
                        >
                            <Copy01Icon />
                        </Button>
                    </ul>
                </section>
            </Modal>
        </>
    )
}

export default Export
