import clsx from 'clsx'
import { ButtonProps } from './button.types'

import styles from './button.module.scss'

const Button: React.FC<ButtonProps> = ({
    isIcon,
    isFullWidth,
    className,
    children,
    id,
    variant = 'primary',
    size = 'md',
    type = 'button',
    onClick,
    style,
}) => {
    return (
        <button
            id={id}
            style={style}
            className={clsx(
                styles.button,
                styles[size],
                styles[variant],
                isIcon && styles.icon,
                isFullWidth && styles.fullWidth,
                className
            )}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
