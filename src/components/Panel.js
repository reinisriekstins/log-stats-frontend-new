import React from 'react'
import { observer } from 'mobx-react'
import isObject from 'lodash/fp/isObject'

const Panel = ({ store, actions, children }) => {
  const { inputRows } = store

  const getPendingInputCount = () => {
    // flatten inputRows and only keep
    // elements that are objects
    const inputStates = inputRows
      .reduce((a,b,i) => {
        b.forEach(x => isObject(x) && a.push(x))
        return a
      }, [])

    const successful = inputStates
      .filter(s => s.status === 'success')

    const pending = inputStates
      .filter(s => s.status === 'pending')

    // console.log('Successful: ' + successful.length)
    // console.log('Pending: ' + pending.length)

    if ( successful.length < 2 )
      alert('There are less than 2 successfully found logs.')
    else if ( pending.length !== 0 )
      alert('Please wait for any pending inputs to resolve.')
    else {
      // open Accordion2, generate player data
    }
  }

  return (
    <div>
      <button
        className="button"
        onClick={ getPendingInputCount }>
        Generate
      </button>
      <button className="button">Import</button>
      <button className="button">Add Row</button>
    </div>
  )
}

export default observer(Panel)