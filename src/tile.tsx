import React, { useContext } from 'react'
import { HandAreaContext } from './contexts'
import { ITile } from './types'

interface Props {
    tile: ITile
}

export const Tile: React.FC<Props> = ({ tile }: { tile: ITile }) => {
    const drawTile = useContext(HandAreaContext)
    const handleClick = () => drawTile(tile)
    return (
        <img src={tile.src} alt={tile.alt} onClick={handleClick} />
    )
}