import React from 'react'
import { observer } from 'mobx-react'

import LogInput from './LogInput'

const LogInputRow = ({ store, actions }) => {
  const { createInputRow } = actions

  const createLogInputs = (amount = 6) => {
    const inputRowStore = createInputRow(amount)

    return inputRowStore.map((s, i) => (
      <LogInput
        actions={ actions }
        state={ s }
        key={ i }
        i={ i }
      />
    ))
  }

  return (
    <div className='log-input-row row' >
      { createLogInputs() }
    </div>
  )
}

export default observer(LogInputRow)