import {
    // Book02Icon,
    CustomerService01Icon,
    Github01Icon,
    // News01Icon,
    TelegramIcon,
} from '@/public/icons'

type NavigationItem = {
    title: string
    href: string
}

type LinkItem = {
    title?: string
    href: string
    icon: React.ElementType
}

export const siteConfig: {
    title: string
    services: NavigationItem[]
    links: LinkItem[]
    navigation: NavigationItem[]
} = {
    title: 'Huemeleon',
    navigation: [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Services',
            href: '/services/shader',
        },
    ],
    services: [
        {
            title: 'Shader',
            href: '/services/shader',
        },
        {
            title: 'Picker',
            href: '/services/picker',
        },
        {
            title: 'Mixer',
            href: '/services/mixer',
        },
        {
            title: 'Extractor',
            href: '/services/extractor',
        },
        {
            title: 'Contrast',
            href: '/services/contrast',
        },
        {
            title: 'Palette',
            href: '/services/palette',
        },
    ],
    links: [
        // {
        //     title: 'Changelog',
        //     icon: News01Icon,
        //     href: '/change-log',
        // },
        {
            icon: CustomerService01Icon,
            href: 'https://t.me/rauanthesaint',
        },
        // {
        //     title: 'Wiki',
        //     icon: Book02Icon,
        //     href: 'https://github.com/rauanthesaint/huemeleon/wiki',
        // },
        {
            icon: Github01Icon,
            href: 'https://github.com/rauanthesaint/huemeleon',
        },
        {
            icon: TelegramIcon,
            href: 'https://t.me/huemeleon',
        },
    ],
}
