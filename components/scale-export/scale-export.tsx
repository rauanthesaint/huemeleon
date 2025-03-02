'use client'
import { Button, Modal } from '@/ui'
import { useState, Fragment, useRef } from 'react'

import styles from './scale-export.module.scss'

import { GeistMono } from '@/lib/font'
import Notification from '@/ui/notification/notification'
import { Copy01Icon } from '@/public/icons'
import Color from '@/lib/color.class'
import { generateShades } from '@/lib/color.utils'

type Tab = {
    title: string
}
const tabs: Tab[] = [
    {
        title: 'HEX',
    },
    {
        title: 'HSL',
    },
]

export default function ScaleExport({ data }: { data: Color }) {
    const shades = generateShades(data, 12)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const contentRef = useRef<HTMLUListElement>(null)
    const [copied, setIsCopied] = useState<boolean>(false)

    const [tab, setTab] = useState<number>(0)

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
                </header>

                <section>
                    {tabs.map((elem, index) => {
                        return (
                            <button onClick={() => setTab(index)} key={index}>
                                {elem.title}
                            </button>
                        )
                    })}
                </section>

                <section className={styles.body}>
                    <Button
                        isIcon
                        variant="secondary"
                        size="sm"
                        onClick={handleCopy}
                        className={styles.copy__button}
                    >
                        <Copy01Icon />
                    </Button>
                    <ul className={styles.content} ref={contentRef}>
                        {shades.map((color, index) => {
                            return (
                                <li key={index} className={GeistMono.className}>
                                    <span style={{ color: '#1a6aff' }}>
                                        --color-{index + 1}
                                    </span>
                                    :{' '}
                                    {tab === 0
                                        ? color.toHEX()
                                        : color.toCssHSL()}
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </Modal>
        </Fragment>
    )
}
