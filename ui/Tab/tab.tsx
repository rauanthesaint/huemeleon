'use client'

import { useState, ReactElement } from 'react'
import styles from './tab.module.scss'

interface TabProps {
    title: string
    children: ReactElement
}

interface TabsProps {
    children: ReactElement<TabProps>[]
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<number>(0)

    return (
        <div className={styles.container}>
            {/* Навигация */}
            <div className={styles.nav}>
                {children.map((tab, index) => (
                    <button
                        type="button"
                        title={tab.props.title}
                        key={index}
                        className={`${styles.tabButton} ${
                            activeTab === index ? styles.activeTab : ''
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.props.title}
                    </button>
                ))}
            </div>

            {/* Контент активной вкладки */}
            <div className={styles.content}>{children[activeTab]}</div>
        </div>
    )
}

export const Tab: React.FC<TabProps> = ({ children }) => {
    return <div>{children}</div>
}
