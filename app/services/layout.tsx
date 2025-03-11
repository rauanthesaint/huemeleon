import { Navigation } from '@/components'
import { Fragment } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Fragment>
            <Navigation />
            {children}
        </Fragment>
    )
}
