'use client'

import { useEffect, useState } from 'react'
import { ArrowUpDoubleIcon } from '@/public/icons'
import { Button } from '@/ui'

export default function ScrollTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const checkHeight = () => {
            setVisible(document.documentElement.scrollHeight > 1500)
        }

        checkHeight() // Check initially
        window.addEventListener('resize', checkHeight) // Recalculate on resize

        return () => window.removeEventListener('resize', checkHeight)
    }, [])

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return visible ? (
        <Button
            variant="secondary"
            size="sm"
            onClick={handleScrollTop}
            style={{
                borderRadius: 100,
                position: 'fixed',
                bottom: 12,
                right: 12,
            }}
            isIcon
        >
            <ArrowUpDoubleIcon />
        </Button>
    ) : null
}
