'use client'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './overlay.module.scss'

interface OverlayProps {
    content?: React.ReactNode
    show: boolean
}

export default function Overlay({ content, show }: OverlayProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.overlay}
                >
                    {content}
                </motion.section>
            )}
        </AnimatePresence>
    )
}
