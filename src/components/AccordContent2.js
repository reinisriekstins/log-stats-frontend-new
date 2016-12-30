import React from 'react'
import { observer } from 'mobx-react'

const AccordContent2 = ({ store, actions }) => {
  const { logs } = store.playerSelectPanel

  const showSteamIds = logs => {
    return logs
      .map(log => Object.keys(log.players))
      .map(players => players.map((player, i) => (
        <div key={i}>
          { player }
          <br />
        </div>
      )))

  }

  return (
    <div className="accordionContent" >
      { logs.length === 0 ? 'empty' : showSteamIds(logs) }
    </div>
  )
}

export default observer(AccordContent2)
