'use client'
import { useEffect } from 'react'
export default function Page() {
    useEffect(() => {
        window.location.replace('/services/shader')
    }, [])
    return <main></main>
}
