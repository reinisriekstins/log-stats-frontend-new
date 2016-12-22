import {
  observable,
  action,
  computed,
  useStrict } from 'mobx'
import {
  isObject,
  isError,
  isString } from 'lodash'
import { Observable } from 'rxjs/Rx'
import { mobxToRx } from 'rx-mobx'
import axios from 'axios'
import url from 'url'

useStrict(true)

export const store = {
  inputRows: observable([])
}

export const updateInputVal = action(
  'updateInputVal',
  (inputState, e) => {
    if (isObject(e))
      inputState.value = e.target.value
    else if (isString(e))
      inputState.value = e
    // inputState.value = isObject(e) ? e.target.value : e
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

// possible statuses of input state
// ;[
//   {'initial': 'grey outline, no icon'},
//   {'pending': 'grey outline, spinner'},
//   {'success': 'green outline, no icon'},
//   {'warning': 'yellow outline, refresh'},
//   {'alert': 'red outline, refresh'}
// ]

export const createInputRow = action(
  'createInputRow',
  (amount) => {
    const InitialInputState = () => ({
      value: '',
      // filteredValue: '',
      status: 'initial',
      log: null,
    })

    // validates LogInput value if valid,
    // return the path part of the url else return a new Error
    const validateInputValue = s => {
      const
        pathRegex = /^\/?\d{5,}$/g,
        pathHashRegex = /^\/?\d{1,}(#\d*)?$/g,
        hostRegex = /^(www\.)?logs\.tf$/g,
        hostPathHashRegex = /^((www\.)?logs\.tf)?\/?\d{5,}(#\d*)?$/g

      // validation step 1
      if (pathHashRegex.test(s)) return s
      else {
        // check if starts with "http://", if not, add it,
        // otherwise the url module can't parse it properly
        if (!s.startsWith('http://')) s = 'http://' + s

        const parsedUrl = url.parse(s)
        const { host, path } = parsedUrl

        // validation step 2
        if (hostRegex.test(host) && pathRegex.test(path))
          return path
      }
      return new Error('Invalid input value:' + s)
    }

    const validateResponseData = x => {
      if (isObject(x)) return x
      else return new Error(x)
    }

    if (amount < 1)
      throw new Error('Invalid store input amount')

    const inputRow = []
    for (let i = 0; i < amount; i++) {
      let inputState = InitialInputState()

      // bind inputState.value to Rx.Observable
      const initial$ = mobxToRx(computed(() => inputState.value))
        .do(() => updateInputStatus(inputState, 'pending'))
        .debounceTime(500)
        .map(validateInputValue)

      const valid$ = Observable
        .from(initial$)
        .filter(x => !isError(x))
        .switchMap(x => axios(`/api/${ x }`))
        .map(x => validateResponseData(x.data))
        .retry(5)
        .subscribe(
          data => {
            updateInputLog(inputState, data)
            updateInputStatus(inputState, 'success')
          },
          err => {
            updateInputLog(inputState, null)
            updateInputStatus(inputState, 'warning')
            throw new Error(err)
          }
        )

      const invalid$ = Observable
        .from(initial$)
        .filter(isError)
        .subscribe(x => {
          updateInputLog(inputState, null)
          updateInputStatus(inputState, 'warning')
          console.warn(x)
        })

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
