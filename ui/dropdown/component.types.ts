import { ReactNode } from 'react'

export interface DropdownProps {
    isActive: boolean
    onClose: () => void
    children: ReactNode
}
