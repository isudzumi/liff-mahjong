import React from 'react'
import { Stage, Layer, Rect } from 'react-konva'

export const HandArea = ({ tiles }: { tiles: JSX.Element[]}) => {
    return (
        <>
            <Stage width={30*15} height={100}>
                <Layer>
                    <Rect fill="white" width={30*15} height={100} />
                    {tiles}
                </Layer>
            </Stage>
            <button id="post-message">画像を投稿</button>
        </>
    )
}