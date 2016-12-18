import {
  observable,
  action,
  computed,
  useStrict } from 'mobx'
import { mobxToRx } from 'rx-mobx'

useStrict(true)

export const store = {
  inputRows: observable([])
}

export const createInputRow = action(
  'createInputRow',
  (amount) => {
    if (amount < 1)
      throw new Error('Invalid store input amount')

    const inputRow = []
    for (let i = 0; i < amount; i++)
      inputRow.push(InitialInputState())

    store.inputRows.push(inputRow)

    return inputRow
  }
)

export const updateInputVal = action(
  'updateInputVal',
  (inputState, event) => {
    const { value } = event.target
    inputState.value = value
  }
)

export const updateInputLog = action(
  'updateInputLog',
  (inputState, observable$) =>
    inputState.log = observable$
)

export const actions = Object.freeze({
  createInputRow,
  updateInputVal,
  updateInputLog
})

/// change this to axios request to server
const getItems = title => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([title, 'item2', `Another ${ Math.random() }`])
    }, 500 + (Math.random() * 300))
  })
}
// axios.get(`/api/${ newVal }`).then(
//   action(
//     'updateInputData',
//     r => store.inputs[index].get = r.data
//   )
// )

function InitialInputState() {
  const inputState = {
    value: '',
    log: null,
  }

  bindInputValueToRxObs(inputState)

  return inputState
}

function bindInputValueToRxObs(inputState) {
  const mobxComputed = computed(() => inputState.value)
  return mobxToRx(mobxComputed)
    .distinctUntilChanged()
    .debounceTime(300)
    .switchMap(getItems)
    // .retry(5)
    // .catch('asdfasdfas')
    .subscribe(o$ => updateInputLog(inputState, o$), console.log)
}

// autorun for all inputs
// autorun(() => {
//   let slicedStore = store.inputRows
//     .slice()
//     .map(r => r
//       .slice()
//       .map(({value, log}) => ({
//         value,
//         log: (function () {
//           try {
//             return log.slice()
//           } catch (e) {
//             return log;
//           }
//         }())
//     })))
//   console.log(slicedStore)
// })
