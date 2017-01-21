import React from 'react'
import { observer } from 'mobx-react'
import LogInput from './LogInput'
import IconMaterial from './IconMaterial'

const InputRowButton = props => {
  const {
    style = {
      paddingTop: '0.4em',
      paddingBottom: '0.4em',
      marginRight: '10px'
    },
    className = "button primary",
    children,
    ...rest
  } = props

  return (
    <button
      type="button"
      className={ className }
      style={ style }
      { ...rest }>
      { children }
    </button>
  )
}

const LogInputRow = ({ actions, state, remove }) => {
  const { deleteInputRow, updateInputVal } = actions

  const clearRowValues = state => {
    state.map(input => updateInputVal(input, ''))
  }

  return (
    <div className='row' >
      {
        state.map((s, i) => (
          <LogInput
            actions={ actions }
            state={ s }
            key={ i }
            i={ i }
          />
        ))
      }
      <div className="large-2 columns">
        <InputRowButton
          title="Clear Row Values"
          onClick={ () => clearRowValues(state) }>
          <IconMaterial>remove</IconMaterial>
        </InputRowButton>
        {(() => {
          if ( remove === true ) return (
            <InputRowButton
              title="Remove Row"
              onClick={ () => deleteInputRow(state) }>
              <IconMaterial>clear</IconMaterial>
            </InputRowButton>
          )
        })()}
      </div>
    </div>
  )
}

export default observer(LogInputRow)