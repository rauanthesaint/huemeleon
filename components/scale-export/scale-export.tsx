'use client'
import { Button, Modal, Tab, Tabs } from '@/ui'
import { useState, Fragment, useRef } from 'react'

import styles from './scale-export.module.scss'

import { GeistMono } from '@/lib/font'
import Notification from '@/ui/notification/notification'
import { Copy01Icon } from '@/public/icons'
import Color from '@/lib/color.class'
import { generateShades } from '@/lib/color.utils'

export default function ScaleExport({ data }: { data: Color }) {
    const shades = generateShades(data, 12)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const contentRef = useRef<HTMLUListElement>(null)
    const [copied, setIsCopied] = useState<boolean>(false)

    const handleClose = () => setIsOpen(!isOpen)

    const handleCopy = () => {
        if (contentRef.current) {
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

    return (
        <Fragment>
            <Button onClick={handleClose}>Export</Button>
            <Notification
                show={copied}
                onHide={setIsCopied}
                message={'Copied'}
            />
            <Modal
                className={styles.component}
                isOpen={isOpen}
                onClose={handleClose}
            >
                <header>
                    <span className="heading">Export</span>
                    <Button
                        isIcon
                        variant="secondary"
                        size="sm"
                        onClick={handleCopy}
                    >
                        <Copy01Icon />
                    </Button>
                </header>

                <section className={styles.body}>
                    <Tabs>
                        <Tab title="HEX">
                            <ul className={styles.content} ref={contentRef}>
                                {shades.map((color, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={GeistMono.className}
                                        >
                                            <span style={{ color: '#1a6aff' }}>
                                                --color-{index + 1}
                                            </span>
                                            : {color.toHEX()}
                                        </li>
                                    )
                                })}
                            </ul>
                        </Tab>
                        <Tab title="HSL">
                            <ul className={styles.content} ref={contentRef}>
                                {shades.map((color, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={GeistMono.className}
                                        >
                                            <span style={{ color: '#1a6aff' }}>
                                                --color-{index + 1}
                                            </span>
                                            : {color.toCssHSL()}
                                        </li>
                                    )
                                })}
                            </ul>
                        </Tab>
                        <Tab title="RGB">
                            <ul className={styles.content} ref={contentRef}>
                                {shades.map((color, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={GeistMono.className}
                                        >
                                            <span style={{ color: '#1a6aff' }}>
                                                --color-{index + 1}
                                            </span>
                                            : {color.toCssRGB()}
                                        </li>
                                    )
                                })}
                            </ul>
                        </Tab>
                    </Tabs>
                </section>
            </Modal>
        </Fragment>
    )
}
