import React from 'react'
import { observer } from 'mobx-react'

import Table from './dragSelectTable/Table'
import TableBody from './dragSelectTable/TableBody'
import TableHead from './dragSelectTable/TableHead'

const AccordContent2 = ({ store, actions }) => {
  const { logs } = store.playerSelectPanel

  const createPlayerTable = logs => {
    return (
      <div className="row">
        <div className="large-5 columns">
          <h3>Unselected Players</h3>
          <table>
            <TableHead />
            <TableBody store={ store } actions={ actions } />
          </table>
        </div>
        <div className="large-2 columns" style={{ textAlign: 'center' }}>
          <button className="button secondary">
            <i
              className="material-icons"
              style={{fontSize:'2em'}}>
              swap_horiz
              {/* if viewport width is small enough, use swap_vert */}
            </i>
          </button>
        </div>
        <div className="large-5 columns">
          <h3>Selected Players</h3>
          <Table>
            <Table.Head />
            <Table.Body store={ store } actions={ actions } />
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="accordionContent" >
      { logs.length === 0 ? '' : createPlayerTable(logs) }
    </div>
  )
}

export default observer(AccordContent2)
