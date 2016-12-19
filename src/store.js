import {
  observable,
  action,
  computed,
  useStrict } from 'mobx'
import { mobxToRx } from 'rx-mobx'
import axios from 'axios'
import url from 'url'

useStrict(true)

export const store = {
  inputRows: observable([])
}

export const updateInputVal = action(
  'updateInputVal',
  (inputState, event) => {
    const { value } = event.target
    inputState.value = value
  }
)

export const updateInputLog = action(
  'updateInputLog',
  (inputState, newLogState$) =>
    inputState.log = newLogState$
)

export const updateInputStatus = action(
  'updateInputStatus',
  (inputState, newStatus) =>
    inputState.status = newStatus
)

// possible statuses of ipnut state
;[
  {'initial': 'grey outline, no icon'},
  {'pending': 'grey outline, spinner'},
  {'success': 'green outline, no icon'},
  {'warning': 'yellow outline, refresh'},
  {'alert': 'red outline, refresh'}
]

export const createInputRow = action(
  'createInputRow',
  (amount) => {
    const InitialInputState = () => ({
      value: '',
      status: 'initial',
      log: null,
    })

    const validateLogUrl = s => {
      // validation step 1
      if (s.match(/^\/?\d{5,}$/g)) return s

      // check if starts with "http://", if not, add it,
      // otherwise the url module can't parse it properly
      s = !s.startsWith('http://') ? 'http://' + s : s

      const urlObj = url.parse(s)
      const { host, path } = urlObj

      // validation step 2
      if (( host === 'logs.tf' || host === 'www.logs.tf' ) &&
            path.match(/^\/?\d{5,}$/g) ) return path
    }

    const validateResult = () => true

    if (amount < 1)
      throw new Error('Invalid store input amount')

    const inputRow = []
    for (let i = 0; i < amount; i++) {
      let inputState = InitialInputState()

      // bind inputState.value to Rx.Observable
      mobxToRx(computed(() => inputState.value))
      .distinctUntilChanged()
      .debounceTime(300)
      /// if its not valid, user should receive
      /// a warning in the UI
      .filter(validateLogUrl)
      .map(validateLogUrl)
      .switchMap(x => axios(`/api/${ x }`))
      // .retry(5)
      // .catch('asdfasdfas')
      // .do(validateResult)
      // .do(updateInputStatus)
      .subscribe(x => updateInputLog(inputState, x), console.log)

      inputRow.push(inputState)
    }
    store.inputRows.push(inputRow)
    return inputRow
  }
)

export const actions = Object.freeze({
  createInputRow,
  updateInputVal,
  updateInputLog,
  updateInputStatus
})

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
