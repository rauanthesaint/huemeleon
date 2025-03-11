import { CSSProperties, ElementType } from 'react'
import { GeneralProps, WithChildrenProps } from '../lib/types'

export interface ButtonProps extends GeneralProps, WithChildrenProps {
    type?: 'submit' | 'button' | 'reset'
    size?: 'sm' | 'md'
    variant?: 'primary' | 'secondary' | 'tertiary'

    // Booleans
    disabled?: boolean
    isIcon?: boolean
    isFullWidth?: boolean

    style?: CSSProperties
    as?: ElementType
    // Event Handlers
    onClick?: () => void
}
