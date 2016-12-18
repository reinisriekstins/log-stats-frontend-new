import { observable, action, useStrict } from 'mobx'

useStrict(true)

export const store = observable({
  inputRows: []
})

export const createInputRow = action(
  'createInputRow',
  (amount) => {
    if (amount < 1)
      throw new Error('Invalid store input amount')

    const inputRow = []
    for (let i = 0; i < amount; i++)
      inputRow.push(getInitialInputState())

    store.inputRows.push(inputRow)

    return inputRow
  }
)

export const changeInputVal = action(
  'changeInputVal',
  (stateObj, event) => {
    const { value } = event.target
    stateObj.value = value
    // axios.get(`/api/${ newVal }`).then(
    //   action(
    //     'updateInputData',
    //     r => store.inputs[index].get = r.data
    //   )
    // )
  }
)

export const actions = Object.freeze({
  createInputRow,
  changeInputVal
})

function getInitialInputState() {
  return {
    value: ''
  }
}


// autorun for all inputs
// autorun(() => {
//   console.log(store.inputs.slice())
// })
