'use client'

import { AnimatePresence, motion, Variants } from 'framer-motion'
import styles from './notification.module.scss'
import { Dispatch, SetStateAction, useEffect } from 'react'
import clsx from 'clsx'

interface NotificationProps {
    message: React.ReactNode
    show: boolean
    onHide: Dispatch<SetStateAction<boolean>>

    type?: 'info' | 'success' | 'danger'

    align?: 'left' | 'right'
    place?: 'top' | 'bottom'
}

const NotificationVariants: Variants = {
    active: { opacity: 1, top: 16 },
    inactive: { opacity: 0, top: -20 },
}

const Notification: React.FC<NotificationProps> = ({
    message,
    show,
    onHide,
}) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => onHide(false), 2000)
            return () => clearTimeout(timer)
        }
    }, [show, onHide])
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    variants={NotificationVariants}
                    initial="inactive"
                    animate="active"
                    exit="inactive"
                    className={clsx(styles.component)}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Notification
