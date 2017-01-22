import React from 'react'
import { observer } from 'mobx-react'
import flatten from 'lodash/fp/flatten'
import filter from 'lodash/fp/filter'
import cappedArgMap from 'lodash/fp/map'
const map = cappedArgMap.convert({ cap: false })
import flow from 'lodash/fp/flow'
import { saveAs } from 'file-saver'
import ImportButton from './ImportButton'

const Panel = ({ store, actions }) => {
  const { successful, pending } = store.playerSelection
  const { createInputRow, generateLogs } = actions
  let href = ''

  const tryGenerateLogs = () => {
    if ( successful.length < 2 )
      alert('There are less than 2 successfully found logs.')
    else if ( pending.length !== 0 )
      alert('Please wait for any pending inputs to resolve.')
    else {
      // open Accordion2, generate player data
      generateLogs()
    }
  }

  const handleExportClick = () => {
    const inputValues = flow(
      map(obsArr => [...obsArr]),
      flatten,
      map(x => x.value),
      filter(value => value !== '')
    )([...store.inputRows])


    const exportFile = new File(
      [JSON.stringify({ inputValues: inputValues })],
      `input_values_${ Date.now() }.json`,
      { type: 'application/json' }
    )

    saveAs(exportFile)
  }

  return (
    <div className="row">
      <button
        className="button"
        onClick={ tryGenerateLogs }>
        Generate
      </button>
      <button
        className="button"
        onClick={ () => createInputRow(5) }>
        Add Row
      </button>
      <ImportButton
        store={ store }
        actions={ actions }>
        Import
      </ImportButton>
      <button
        className="button"
        type="button"
        onClick={ handleExportClick }>
        Export
      </button>
    </div>
  )
}

export default observer(Panel)