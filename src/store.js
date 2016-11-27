import { observable, action, useStrict } from 'mobx'
import axios from 'axios'

useStrict(true)

export const store = observable({
  inputs: []
})

export const addInputVal = action(
  'addInputVal',
  () => {
    store.inputs.push({
      value: '',
      get: ''
    })
    return store.inputs.length - 1
  }
)

export const changeInputVal = action(
  'changeInputVal',
  (index, newVal) => {
    store.inputs[index].value = newVal
    axios.get(`/api/${ newVal }`).then(
      action(
        'updateInputData',
        r => store.inputs[index].get = r.data
      )
    )
  }
)

export const actions = Object.freeze({
  addInputVal,
  changeInputVal
})


// autorun for all inputs
// autorun(() => {
//   console.log(store.inputs.slice())
// })
