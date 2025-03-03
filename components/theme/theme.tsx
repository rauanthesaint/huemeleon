'use client'
import { Moon02Icon, Sun01Icon } from '@/public/icons'
import clsx from 'clsx'
import { useTheme } from 'next-themes'

const Theme = ({ className }: { className?: string }) => {
    const { theme, setTheme } = useTheme()

    const isLight = theme === 'light'

    const handle = () => {
        const current = isLight ? 'dark' : 'light'
        setTheme(current)
    }

    const icon = isLight ? <Moon02Icon /> : <Sun01Icon />

    return (
        <button
            className={clsx(className)}
            onClick={handle}
            title="Change theme"
            type="button"
        >
            {icon}
        </button>
    )
}

export default Theme
