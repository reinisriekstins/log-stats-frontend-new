import { observable, action, useStrict } from 'mobx'

useStrict(true)

export const store = observable({
  inputs: []
})

export const addInputVal = action(
  'addInputVal',
  () => {
    store.inputs.push({value: ''})
    return store.inputs.length - 1
  }
)

export const changeInputVal = action(
  'changeInputVal',
  (index, newVal) => store.inputs[index].value = newVal
)

export const actions = Object.freeze({
  addInputVal,
  changeInputVal
})

// autorun for all inputs
// autorun(() => {
//   console.log(store.inputs.slice())
// })