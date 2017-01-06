import React from 'react'
import { SelectableGroup } from 'react-selectable-fast'

import TableHead from './TableHead'
import TableBody from './TableBody'

const Table = ({ children }) => {
  return (
    <SelectableGroup
      allowClickWithoutSelected={ true }
      whiteList={['.TableRow']}>
      <table>
        { children }
      </table>
    </SelectableGroup>
  )
}

Table.Head = TableHead
Table.Body = TableBody

export default Table

