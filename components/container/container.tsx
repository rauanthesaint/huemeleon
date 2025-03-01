import { GeneralProps, WithChildrenProps } from '@/ui/lib/types'
import clsx from 'clsx'
import { CSSProperties, ElementType } from 'react'
import styles from './container.module.scss'

interface Props extends GeneralProps, WithChildrenProps {
    max?: number
    pref?: number
    as?: ElementType
}

const Container: React.FC<Props> = ({
    max = 1024,
    pref = 0.95,
    as: Component = 'section',
    children,
    className,
    id,
}) => {
    const style: CSSProperties = {
        width: `min(${pref * 100}%, ${max}px)`,
    }

    return (
        <Component
            id={id}
            className={clsx(styles.container, className)}
            style={style}
        >
            {children}
        </Component>
    )
}

export default Container
