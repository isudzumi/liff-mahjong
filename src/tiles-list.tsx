import React from 'react'
import tilesMap from './config/tiles-map.json'

const layoutMap = [
    ['honor', 'red'],
    ['character'],
    ['dot'],
    ['bamboo']
]

export const TilesList = () => (
  <div className="tiles-list">
      {
          layoutMap.map((layoutRow, idx) => (
            <div className="tiles-list__row" key={idx}>
                {
                    layoutRow.map((type) => {
                        const tiles = tilesMap.filter(tile => tile.types.includes(type))
                        return tiles.map(tile => <img src={tile.src} alt={tile.alt} key={tile.name} />)
                    })
                }
            </div>
          ))
      }
  </div>
)