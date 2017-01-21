import React from 'react'
import { observer } from 'mobx-react'

import LogInputRow from './LogInputRow'
import Panel from './Panel'

const AccordContent1 = ({ store, actions }) => {
  const { inputRows } = store

  return (
    <div className="accordionContent" >
      {(() => {
        return inputRows.map((state, i) => (
          <LogInputRow
            actions={ actions }
            state={ state }
            key={ i }
            remove={ i === 0 ? false : true }/>
        ))
      })()}
      <Panel store={ store } actions={ actions } />
    </div>
  )
}

export default observer(AccordContent1)
