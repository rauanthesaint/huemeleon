'use client'

import Color from '@/lib/color/color.class'
import { createContext, Dispatch, ReactNode, useReducer } from 'react'

type ColorResult = {
    color: string
    position: { x: number; y: number }
    frequency?: number
}

type StoreState = {
    converter: Color
    contrast: { text: Color; background: Color }
    shader: Color
    extractor: { image: string | null; colors: ColorResult[] }
}

type Action =
    | { type: 'UPDATE_CONVERTER'; payload: Color }
    | { type: 'UPDATE_CONTRAST'; payload: { text: Color; background: Color } }
    | { type: 'UPDATE_SHADER'; payload: Color }
    | {
          type: 'UPDATE_EXTRACTOR'
          payload: { image: string | null; colors: ColorResult[] }
      }

type StoreContextType = {
    state: StoreState
    dispatch: Dispatch<Action>
}

const initialState: StoreState = {
    converter: Color.fromHEX('ff0000'),
    contrast: {
        text: Color.fromHEX('D5D5B1'),
        background: Color.fromHEX('331002'),
    },
    shader: Color.fromHEX('39BF5F'),
    extractor: { image: null, colors: [] },
}

function reducer(state: StoreState, action: Action): StoreState {
    switch (action.type) {
        case 'UPDATE_CONVERTER':
            return { ...state, converter: action.payload }
        case 'UPDATE_CONTRAST':
            return { ...state, contrast: action.payload }
        case 'UPDATE_SHADER':
            return { ...state, shader: action.payload }
        case 'UPDATE_EXTRACTOR':
            return { ...state, extractor: action.payload }
        default:
            return state
    }
}

export const StoreContext = createContext<StoreContextType | undefined>(
    undefined
)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}
