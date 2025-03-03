import { UseFormRegisterReturn } from 'react-hook-form'
import { GeneralProps } from '../lib/types'
import { InputHTMLAttributes, RefAttributes } from 'react'

export interface InputProps
    extends GeneralProps,
        InputHTMLAttributes<HTMLInputElement>,
        RefAttributes<HTMLInputElement> {
    name?: string
    type?: 'text' | 'password' | 'number'
    placeholder?: string
    defaultValue?: string | number
    hint?: React.ReactNode | string
    label?: React.ReactNode | string

    icon?: React.ReactNode

    action?: React.ReactNode

    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

    register?: UseFormRegisterReturn
    error?: string
}
