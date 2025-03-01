'use client'
import { Button, Modal } from '@/ui'
import { useState, Fragment, useRef } from 'react'

import styles from './scale-export.module.scss'
import { HEX } from '@/types'

import { GeistMono } from '@/lib/font'
import { generateShades } from '@/utils/color.class'
import Notification from '@/ui/notification/notification'

export default function ScaleExport({ data }: { data: HEX }) {
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
            <Modal
                className={styles.component}
                isOpen={isOpen}
                onClose={handleClose}
            >
                <header>
                    <span className="heading">Export</span>
                    <Button variant="secondary" size="sm" onClick={handleCopy}>
                        Copy
                    </Button>
                </header>
                <Notification
                    show={copied}
                    onHide={setIsCopied}
                    message={'Copied'}
                />

                <section className={styles.body}>
                    <ul className={styles.content} ref={contentRef}>
                        {shades.map((color, index) => {
                            return (
                                <li key={index} className={GeistMono.className}>
                                    <span style={{ color: '#1a6aff' }}>
                                        --color-{index + 1}
                                    </span>
                                    :{color}
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </Modal>
        </Fragment>
    )
}
