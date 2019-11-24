import { createContext } from 'react'
import { ITile } from './types'

export const HandAreaContext = createContext((tile: ITile) => {})