import clsx from 'clsx'
import { InputProps } from './input.types'
import styles from './input.module.scss'

const Input: React.FC<InputProps> = ({
    id,
    className,
    title,
    name,
    type = 'text',
    placeholder,
    defaultValue,
    leading,
    label,
    hint,
    error,
    ref,
    value,

    onChange,
}) => {
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
                />
            </div>
            {hint && <p className={styles.hint}>{hint}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </label>
    )
}

export default Input
