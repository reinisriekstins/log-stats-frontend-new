import React from 'react'
import { observer } from 'mobx-react'
import { CreateStore } from 'react-drag-select-table'
import PlayerSelectTable from './PlayerSelectTable'
import PlayerSelectTableExtras from './PlayerSelectTableExtras'

const AccordContent2 = ({ store, actions }) => {
  const { all } = store.playerSelection.players
  const filterProps = [
    'steamId',
    'names[0].name',
    // 'names[1].name',
    // 'names[2].name'
  ]

  function CreateTableObj(...args) {
    const
      store = CreateStore(...args),
      selected = store.selected,
      emptySelected = store.actions.emptySelected,
      pushItem = store.actions.pushItemIntoStore,
      removeItem = store.actions.removeItemFromStore

    return {
      store,
      selected,
      emptySelected,
      pushItem,
      removeItem
    }
  }

  const
    unchosenTable = CreateTableObj(all, filterProps),
    chosenTable = CreateTableObj([], filterProps)

  actions.assignChosenPlayersTo(chosenTable.store.all)

  const transferPlayers = () => {
    if ( unchosenTable.selected.length ) {
      unchosenTable.selected.forEach(player => {
        chosenTable.pushItem(player)
        unchosenTable.removeItem(player)
      })
      unchosenTable.emptySelected()
    }
    else if ( chosenTable.selected.length ) {
      chosenTable.selected.forEach(player => {
        unchosenTable.pushItem(player)
        chosenTable.removeItem(player)
      })

      chosenTable.emptySelected()
    }
    else {
      /// show modal, saying that nothing is selected
      alert('No players selected.')
    }
  }

  if (all.length) return (
    <div className="row">
      <div className="large-5 columns">
        <PlayerSelectTableExtras
          store={ store }
          tableStore={ unchosenTable.store }/>
        <PlayerSelectTable
          store={ store }
          tableStore={ unchosenTable.store }
          onTrClick={ chosenTable.emptySelected }
          onTrMouseDown={ chosenTable.emptySelected } />
      </div>
      <div className="large-2 columns">
        <button
          onClick={ transferPlayers }
          className="button secondary expanded"
          title="Transfer Selected Players"
          type="button">
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
          tableStore={ chosenTable.store } />
        <PlayerSelectTable
          store={ store }
          actions={ actions }
          tableStore={ chosenTable.store }
          onTrClick={ unchosenTable.emptySelected }
          onTrMouseDown={ unchosenTable.emptySelected } />
      </div>
    </div>
  )
  return null
}

export default observer(AccordContent2)