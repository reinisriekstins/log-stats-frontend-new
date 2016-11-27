import React from 'react'
import { observer } from 'mobx-react'

const Accordion = observer(({ store, actions, children }) => {
  return (
    <div className="accordion">
      { children }
    </div>
  );
})

export default Accordion
