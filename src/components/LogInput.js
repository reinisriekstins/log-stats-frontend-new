import React from 'react'
import { observer } from 'mobx-react'

const LogInput = observer(({ store, actions, index }) => {
  const { changeInputVal } = actions

  return (
    <div className="large-2 columns">
      <input
        className="log-input"
        type="text"
        value={ store.inputVals[index] }
        onChange={ e => changeInputVal(index, e.target.value) } />
    </div>
  )
})

export default LogInput