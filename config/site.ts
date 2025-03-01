import { ElementType } from 'react'
import {
    Bookmark01Icon,
    ColorPickerIcon,
    ColorsIcon,
    PaintBoardIcon,
    Settings02Icon,
} from '@/public/icons' // Default icon

type NavigationItem = {
    title: string
    href: string
    icon: ElementType // Mark as optional
}

export const siteConfig: {
    navigation: NavigationItem[]
    title: string
    settings: NavigationItem[]
} = {
    title: 'Huemeleon',
    navigation: [
        {
            title: 'Picker',
            href: '/dashboard/picker',
            icon: ColorPickerIcon,
        },
        {
            title: 'Shader',
            href: '/dashboard/shader',
            icon: ColorsIcon,
        },
        {
            title: 'Palettes',
            href: '/dashboard/palettes',
            icon: PaintBoardIcon,
        },
    ],

    settings: [
        // {
        //     title: 'Saved Palettes',
        //     href: '/profile/palettes',
        //     icon: Bookmark01Icon,
        // },
        // {
        //     title: 'Settings',
        //     href: '/settings',
        //     icon: Settings02Icon,
        // },
    ],
}
