import { Fragment } from 'react'
import styles from './modal.module.scss'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import clsx from 'clsx'

interface ModalProps {
    isOpen?: boolean
    onClose?: () => void
    children: React.ReactNode
    className?: string
}

const CurtainVariants: Variants = {
    active: { opacity: 1 },
    inactive: { opacity: 0 },
}

const ModalVariants: Variants = {
    active: { y: '-50%', x: '-50%', opacity: 1 },
    inactive: { y: 'calc(-50% + 20px)', x: '-50%', opacity: 0 },
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    children,
    onClose,
    className,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    <motion.div
                        variants={ModalVariants}
                        initial="inactive"
                        animate="active"
                        exit="inactive"
                        className={clsx(styles.modal, className)}
                    >
                        {children}
                    </motion.div>
                    <motion.div
                        variants={CurtainVariants}
                        initial="inactive"
                        exit="inactive"
                        animate="active"
                        onClick={onClose}
                        className={styles.curtain}
                    />
                </Fragment>
            )}
        </AnimatePresence>
    )
}

export default Modal
