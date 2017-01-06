import React from 'react'
import { observer } from 'mobx-react'
import { createSelectable } from 'react-selectable-fast'

import cappedArgMap from 'lodash/fp/map'
const map = cappedArgMap.convert({ cap: false })

import TableRow from './TableRow'

const SelectRow = createSelectable(TableRow)

const TableBody = ({ store, actions }) => {
  const { unselected } =
    store.playerSelectPanel.players
  return (
    <tbody>
    {
      map((player, i) => {
        return <SelectRow key={ i } player={ player } i={ i } />
      })(unselected)
    }
    </tbody>
  )
}

export default observer(TableBody)