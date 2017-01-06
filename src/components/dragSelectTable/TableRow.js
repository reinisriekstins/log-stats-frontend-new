import React from 'react'
import { observer } from 'mobx-react'

import reduce from 'lodash/fp/reduce'

const TableRow = ({ i, player }) => {
  const { steamId, names, mapsPlayed } = player
  return (
    <tr className="TableRow" >
      <td>{ i }</td>
      <td>{ steamId }</td>
      <td title={ reduce((acc, curr) =>
        acc+curr.name+'\n', '')(names) }>
      {
        /* join the first 3 names with commas in between */
        ((names) => {
          let combined = names[0].name
          if (names[1])
            combined += ', ' + names[1].name
          if (names[2])
            combined += ', ' + names[2].name
          return combined
        })(names)
      }
      </td>
      <td>{ mapsPlayed }</td>
    </tr>
  )
}

export default observer(TableRow)