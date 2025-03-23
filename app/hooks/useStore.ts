import { useContext } from 'react'
import { StoreContext } from '../providers/store'

export const useStore = () => {
    const context = useContext(StoreContext)
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider')
    }
    return context
}
