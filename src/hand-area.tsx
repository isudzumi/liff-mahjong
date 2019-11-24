import React from 'react'
import { Stage, Layer } from 'react-konva'


export const HandArea = ({ tiles }: { tiles: JSX.Element[]}) => {
    return (
        <Stage width={30*15} height={100}>
            <Layer>
                {tiles}
            </Layer>
        </Stage>
    )
}