import React from 'react'
import { observer } from 'mobx-react'
import { CreateStore } from 'react-drag-select-table'
import PlayerSelectTable from './PlayerSelectTable'
import PlayerSelectTableExtras from './PlayerSelectTableExtras'

const AccordContent2 = ({ store, actions }) => {
  const { all } = store.playerSelectPanel.players
  const filterProps = [
    'steamId',
    'names[0].name',
    // 'names[1].name',
    // 'names[2].name'
  ]
  const
    unchosenPlayerTableStore = CreateStore(all, filterProps),
    chosenPlayerTableStore = CreateStore([], filterProps)

  window.unchosen = unchosenPlayerTableStore
  window.chosen = chosenPlayerTableStore

  const transferPlayers = () => {

  }

  if (all.length) return (
    <div className="row">
      <div className="large-5 columns">
        <PlayerSelectTableExtras
          store={ store }
          actions={ actions }
          tableStore={ unchosenPlayerTableStore } />
        <PlayerSelectTable
          store={ store }
          actions={ actions }
          tableStore={ unchosenPlayerTableStore } />
      </div>
      <div className="large-1 columns">
        <button
          onClick={ transferPlayers }
          className="button secondary"
          title="Transfer Selected Players">
          <i
            className="material-icons"
            style={{fontSize:'2em'}}>
            swap_horiz
          </i>
        </button>
      </div>
      <div className="large-5 columns">
        <PlayerSelectTableExtras
          store={ store }
          actions={ actions }
          tableStore={ chosenPlayerTableStore } />
        <PlayerSelectTable
          store={ store }
          actions={ actions }
          tableStore={ chosenPlayerTableStore } />
      </div>
    </div>
  )
  return null
}

export default observer(AccordContent2)
