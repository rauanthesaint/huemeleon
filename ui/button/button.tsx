import clsx from 'clsx'
import { ButtonProps } from './button.types'

import styles from './button.module.scss'

const Button: React.FC<ButtonProps> = ({
    isIcon,
    isFullWidth,
    className,
    disabled,
    children,
    id,
    variant = 'primary',
    size = 'md',
    type = 'button',
    onClick,
    as: Component = 'button',

    style,
}) => {
    return (
        <Component
            id={id}
            style={style}
            className={clsx(
                styles.button,
                styles[size],
                styles[variant],
                isIcon && styles.icon,
                isFullWidth && styles.fullWidth,
                className,
                'no-select'
            )}
            disabled={disabled}
            type={type}
            onClick={onClick}
        >
            {children}
        </Component>
    )
}

export default Button
