import React from 'react'
import { observer } from 'mobx-react'

import LogInputRow from './LogInputRow'
import Panel from './Panel'

const AccordContent1 = ({ store, actions }) => {
  return (
    <div className="accordionContent" >
      <LogInputRow store={ store } actions={ actions } />
      <LogInputRow store={ store } actions={ actions } />
      <Panel store={ store } actions={ actions } />
    </div>
  )
}

export default observer(AccordContent1)
