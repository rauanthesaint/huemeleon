import { GeneralProps, WithChildrenProps } from '@/ui/lib/types'
import clsx from 'clsx'
import { CSSProperties, ElementType, forwardRef } from 'react'
import styles from './container.module.scss'

interface Props extends GeneralProps, WithChildrenProps {
    max?: number
    pref?: number
    as?: ElementType
}

// ✅ Use `forwardRef` to allow parent components to pass a ref
const Container = forwardRef<HTMLElement, Props>(
    (
        {
            max = 1024,
            pref = 0.95,
            as: Component = 'section',
            children,
            className,
            id,
        },
        ref
    ) => {
        const style: CSSProperties = {
            width: `min(${pref * 100}%, ${max}px)`,
        }

        return (
            <Component
                id={id}
                ref={ref} // ✅ Attach ref here
                className={clsx(styles.container, className)}
                style={style}
            >
                {children}
            </Component>
        )
    }
)

// ✅ Add display name for better debugging in React DevTools
Container.displayName = 'Container'

export default Container
