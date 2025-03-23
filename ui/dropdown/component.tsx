import { DropdownProps } from './component.types'
import styles from './component.styles.module.scss'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useEffect } from 'react'

const CONTENT_VARIANTS: Variants = {
    inactive: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
    active: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
}

const Dropdown: React.FC<DropdownProps> = ({ isActive, onClose, children }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isActive) window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isActive, onClose])

    return (
        <AnimatePresence>
            {isActive && (
                <>
                    {/* Content */}
                    <motion.div
                        variants={CONTENT_VARIANTS}
                        initial="inactive"
                        animate="active"
                        exit="inactive"
                        role="dialog"
                        aria-modal="true"
                        className={styles.content}
                    >
                        {children}
                    </motion.div>
                    {/* Curtain */}
                    <div className={styles.curtain} onClick={onClose} />
                </>
            )}
        </AnimatePresence>
    )
}

export default Dropdown
