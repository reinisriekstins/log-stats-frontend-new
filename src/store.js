import {
  observable,
  action,
  computed,
  useStrict } from 'mobx'
import { Observable } from 'rxjs/Rx'
import { mobxToRx } from 'rx-mobx'
import axios from 'axios'
import url from 'url'
import isObject from 'lodash/fp/isObject'
import isError from 'lodash/fp/isError'
import isString from 'lodash/fp/isString'
import difference from 'lodash/fp/difference'
import filter from 'lodash/fp/filter'
import reduce from 'lodash/fp/reduce'
import cappedArgMap from 'lodash/fp/map'
const map = cappedArgMap.convert({ cap: false })
import logUtils from './lib/logUtils'

useStrict(true)

export const store = {
  inputRows: observable([]),
  playerSelectPanel: observable({
    // flatten inputRows and only keep
    // elements that are objects
    get inputStates() {
      return reduce((a,b) => {
        b.forEach(x => isObject(x) && a.push(x))
        return a
      }, [])(store.inputRows)
    },
    get successful() {
      const { inputStates } =
        store.playerSelectPanel
      return filter(s =>
        s.status === 'success')(inputStates)
    },
    get pending() {
      const { inputStates } =
        store.playerSelectPanel
      return filter(s =>
        s.status === 'pending')(inputStates)
    },
    logs: [],
    players: {
      get all() {
        const { logs } = store.playerSelectPanel
        return logUtils.getPlayers(logs)
      },
      // unchosen: CreateStore(
      //   store.playerSelectPanel.players.all
      // ),
      // get chosen() {
      //   const { all, chosen } =
      //     store.playerSelectPanel.players
      //   return difference(all, selected)
      // }
    }
  })
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
        pathRegex = /^\/?\d+$/g,
        pathHashRegex = /^\/?\d+(#\d*)?$/g,
        hostRegex = /^(www\.)?logs\.tf$/g
        // hostPathHashRegex = /^((www\.)?logs\.tf)?\/?\d+(#\d*)?$/g

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
      return new Error(x)
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

      // stream of valid$ observables
      Observable
        .from(initial$)
        .filter(x => !isError(x))
        .switchMap(x => axios(`/log/${ x }`))
        .map(x => validateResponseData(x.data))
        ///.retry(2)
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

      // stream of invalid$ observables
      Observable
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

export const generateLogs = action(
  'generateLogs',
  () => {
    const { playerSelectPanel } = store
    playerSelectPanel.logs =
      map(s => s.log)(playerSelectPanel.successful)
  }
)

export const actions = Object.freeze({
  createInputRow,
  updateInputVal,
  updateInputLog,
  updateInputStatus,
  generateLogs
})
