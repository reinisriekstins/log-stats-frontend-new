import { observable, action, autorun, useStrict } from 'mobx'

useStrict(true)

export const store = observable({
  inputVals: []
})

export const addInputVal = action('addInputVal', () => {
  store.inputVals.push('')
  return store.inputVals.length - 1
})

export const changeInputVal = action(
  'changeInputVal',
  (index, newVal) => store.inputVals[index] = newVal
)

export const actions = Object.freeze({
  addInputVal,
  changeInputVal
})

// autorun for all inputs
autorun(() => {
  console.log(store.inputVals.slice())
})