import React from 'react'
import { render } from 'react-dom'
import DevTools from 'mobx-react-devtools'

import './styles/foundation.css'
import 'material-design-icons/iconfont/material-icons.css'

import { store, actions } from './store'
import Accordion from './components/Accordion'
import AccordContent1 from './components/AccordContent1'
import AccordContent2 from './components/AccordContent2'

// for using in browser console
window.store = store
window.actions = actions

const { createInputRow } = actions

createInputRow(5)
createInputRow(5)

render(
  <div className="accordion-wrapper">
    <Accordion>
      <AccordContent1 store={ store } actions={ actions } />
    </Accordion>
    <Accordion>
      <AccordContent2 store={ store } actions={ actions } />
    </Accordion>
    { /*<DevTools />*/ }
  </div>,
  document.querySelector('#root')
)


