import clsx from 'clsx'
import { InputProps } from './input.types'
import styles from './input.module.scss'
import { cloneElement, isValidElement, ReactElement } from 'react'

const Input: React.FC<InputProps> = ({
    id,
    className,
    title,
    name,
    type = 'text',
    placeholder,
    defaultValue,
    icon: leading,
    label,
    hint,
    error,
    ref,
    value,
    action,
    readOnly,

    onChange,
}) => {
    const actionComponent =
        (isValidElement(action) &&
            cloneElement(action as ReactElement<{ className?: string }>, {
                className: styles.action,
            })) ||
        undefined
    return (
        <label className={styles.inputWrap} htmlFor={name}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={styles.inputContainer}>
                {leading}
                <input
                    id={id}
                    ref={ref}
                    title={title}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    type={type}
                    value={value}
                    className={clsx(styles.input, className)}
                    onChange={onChange}
                    readOnly={readOnly}
                />
                {actionComponent}
            </div>
            {hint && <p className={styles.hint}>{hint}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </label>
    )
}

export default Input
