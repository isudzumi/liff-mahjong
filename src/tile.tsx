import React from 'react'

interface Tile {
    name: string;
    src: string;
    alt: string;
    types: string[];
}

interface Props {
    tile: Tile
}

export const Tile: React.FC<Props> = ({ tile }: { tile: Tile }) => {
    return <img src={tile.src} alt={tile.alt} />
}