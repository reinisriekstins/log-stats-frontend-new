import React from 'react'
import { observer } from 'mobx-react'

import LogInput from './LogInput'

const LogInputRow = ({ store, actions }) => {
  const { addInputVal } = actions

  const generateLogInputs = amount => {
    let logInputs = []

    for (let i = 0; i < amount; i++) {
      const index = addInputVal()

      logInputs.push(
        <LogInput
          store={ store }
          actions={ actions }
          index={ index }
          key={ i }
          i={ i }
        />
      )
    }

    return logInputs
  }

  return (
  <div className="log-input-row row">
      { generateLogInputs(6) }
    </div>
  )
}

export default observer(LogInputRow)