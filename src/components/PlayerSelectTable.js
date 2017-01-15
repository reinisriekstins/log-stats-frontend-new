import React from 'react'
import { observer } from 'mobx-react'
import cappedArgMap from 'lodash/fp/map'
const map = cappedArgMap.convert({ cap: false })
import {
  CreateStore,
  Tbody,
  Tr
} from 'react-drag-select-table'

const PlayerSelectTable = ({ store, actions, tableStore }) => {
  const { all } = store.playerSelectPanel.players
  if (!tableStore) tableStore = CreateStore(all)

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Steam ID</th>
          <th>Name</th>
          <th>Maps Played</th>
        </tr>
      </thead>
      <Tbody store={ tableStore } >
      {(() => {
        const { filtered } = tableStore

        if ( filtered.length ) return (
          map((player, i) => {
            const {
              steamId,
              mapsPlayed,
              names
            } = player
            return (
              <Tr
                key={ i }
                store={ tableStore }
                state={ player }
                i={ i }>
                <td>{ i }</td>
                <td>{ steamId }</td>
                <td
                  title={ names.map(obj => obj.name).join(',\n') }>
                  { names[0].name }
                </td>
                <td>{ mapsPlayed }</td>
              </Tr>
            )
          })(filtered)
        )
        return (
          <tr>
            <td></td>
            <td>None found.</td>
            <td></td>
            <td></td>
          </tr>
        )
      })()}
      </Tbody>
    </table>
  )
}

export default observer(PlayerSelectTable)