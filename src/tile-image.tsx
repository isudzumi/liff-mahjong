import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'
import { ITile } from './types'

export const TileImage = ({ tile }: { tile: ITile }) => {
    const [image] = useImage(tile.src)
    return <Image image={image} x={tile.x} />
}