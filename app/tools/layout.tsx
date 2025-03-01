import { Navigation } from './_components'

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="tools-layout">
            <Navigation />
            {children}
        </div>
    )
}
