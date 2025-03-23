import {
    CustomerService01Icon,
    Github01Icon,
    TelegramIcon,
} from '@/public/icons'

interface Item {
    title: string
    link: string
}

type NavigationItem = {
    title: string
    href: string
}

interface SocialItem extends Item {
    icon: React.ElementType
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
    socials: SocialItem[]
} = {
    socials: [
        {
            title: 'Github',
            link: 'https://github.com/rauanthesaint/huemeleon',
            icon: Github01Icon,
        },
        {
            title: 'Telegram',
            link: 'https://t.me/huemeleon',
            icon: TelegramIcon,
        },
    ],
    title: 'Huemeleon',
    navigation: [
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
            title: 'Converter',
            href: '/services/converter',
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
        {
            icon: CustomerService01Icon,
            href: 'https://t.me/rauanthesaint',
        },
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
