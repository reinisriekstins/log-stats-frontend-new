import React from 'react'
import { observer } from 'mobx-react'
import axios from 'axios'
import Rx from 'rxjs/Rx'

const LogInput = ({ store, actions, stateObj }) => {
  const { changeInputVal } = actions

  const getItems = title => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([title, 'item2', `Another ${ Math.random() }`])
      }, 500 + (Math.random() * 300))
    })
  }

  const handleInputChange = e => {
    changeInputVal(stateObj, e)
  }
/*-------------------------------------*
 *
 * Traditional implementation of debounced AJAX requesting input
 *
 * Alternative with RxJS is to derive the AJAX request from
 * state of inputs by converting mobx observables to RxJS observables
 * and vice versa
 *
 *-------------------------------------*/
  let lastQuery = null
  let lastTimeout = null
  let nextQueryId = 0

  const handleKeyUp = e => {
    const title = e.target.value
    if (title === lastQuery) return
    lastQuery = title

    if (lastTimeout) clearTimeout(lastTimeout)

    let ourQueryId = ++nextQueryId
    lastTimeout = setTimeout(() => {
      getItems(title)
      .then(items => {
        if (ourQueryId !== nextQueryId) return

        console.log(items)
      })
    }, 500)
  }

  return (
    <div className="large-2 columns">
      <input
        className="log-input"
        type="text"
        value={ stateObj.value }
        onChange={ handleInputChange }
        onKeyUp={ handleKeyUp }
      />
    </div>
  )
}

export default observer(LogInput)