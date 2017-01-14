import React from 'react'
import { observer } from 'mobx-react'
import {
  Tbody,
  Tr,
  SelectAllVisible,
  DeselectAll,
  Selected,
  Filter
 } from 'react-drag-select-table'

const AccordContent2 = ({ store, actions }) => {
  const { logs } = store.playerSelect



  return (
    <div className="accordionContent" >

    </div>
  )
}

export default observer(AccordContent2)
