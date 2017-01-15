import React from 'react'
import { observer } from 'mobx-react'

const Panel = ({ store, actions }) => {
  const { successful, pending } = store.playerSelectPanel

  const tryGenerateLogs = () => {
    if ( successful.length < 2 )
      alert('There are less than 2 successfully found logs.')
    else if ( pending.length !== 0 )
      alert('Please wait for any pending inputs to resolve.')
    else {
      // open Accordion2, generate player data
      actions.generateLogs()
    }
  }

  return (
    <div className="row">
      <button
        className="button"
        onClick={ tryGenerateLogs }>
        Generate
      </button>
      <button className="button">Import</button>
      <button className="button">Add Row</button>
    </div>
  )
}

export default observer(Panel)