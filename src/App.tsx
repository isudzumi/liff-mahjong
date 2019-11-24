import React, { useState } from 'react';
import { TilesList } from './tiles-list'
import { TileImage } from './tile-image'
import { HandArea } from './hand-area'
import { HandAreaContext } from './contexts'
import { ITile } from './types'
import './App.css';

const App = () => {
  const [tiles, setTile] = useState<JSX.Element[]>([])
  const drawTile = (tile: ITile) => {
    if(tiles.length > 13) {
      return
    }
    tile.x = tiles.length * 30
    setTile(tiles.concat(<TileImage tile={tile} key={`${tile.name}-${tiles.length}`} />))
  }
  return (
    <div className="App">
      <HandAreaContext.Provider value={drawTile}>
        <HandArea tiles={tiles} />
        <TilesList />
      </HandAreaContext.Provider>
    </div>
  )
}

export default App;
