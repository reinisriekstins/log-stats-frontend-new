import React from 'react'
import { render } from 'react-dom'
import DevTools from 'mobx-react-devtools'

import './styles/foundation.css'

import { store, actions } from './store'
import Accordion from './components/Accordion'
import LogInputRow from './components/LogInputRow'

render(
  <div className="accordion-wrapper">
    <Accordion store={ store } actions={ actions }>
      <LogInputRow store={ store } actions={ actions } />
      <LogInputRow store={ store } actions={ actions } />
    </Accordion>
    <DevTools />
  </div>,
  document.querySelector('#root')
)

window.store = store
window.actions = actions
