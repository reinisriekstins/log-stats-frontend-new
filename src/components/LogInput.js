import React from 'react'
import { observer } from 'mobx-react'
import '../fonts/font-awesome-4.7.0/css/font-awesome.css'

const LogInput = ({ actions, state }) => {
  const { updateInputVal } = actions
  const { status } = state

  const handleInputChange = e => {
    updateInputVal(state, e)
  }

  const iconStyle = {
    position: 'relative',
    top: '-50px',
    right: '-75%',
    color: 'lightgrey'
  }

  const foundation = {
    success: '#3adb76',
    warning: '#ffae00',
    alert: '#cc4b37'
  }

  const inputStyles = {
    initial: {},
    pending: {},
    success: {
      boxShadow: `0 0 3px ${ foundation.success }`,
      borderColor: foundation.success
    },
    warning: {
      boxShadow: `0 0 3px ${ foundation.warning }`,
      borderColor: foundation.warning
    },
    alert: {
      boxShadow: `0 0 3px ${ foundation.alert }`,
      borderColor: foundation.alert
    }
  }

  return (
    <div className='large-2 columns'>
      <input
        className='log-input'
        type='text'
        value={ state.value }
        onChange={ handleInputChange }
        style={ inputStyles[status] }
      />

      {
        (status === 'warning' || status === 'alert') &&
        <button
          style={ iconStyle }
          title='Click to retry sending the request'
          onClick={() => actions.updateInputStatus(state, 'pending')} >
          <i className='fa fa-refresh fa-2x' ></i>
        </button>
      }
      {
        status === 'pending' &&
        <i
          className='fa fa-circle-o-notch fa-spin fa-2x fa-fw'
          style={ iconStyle } >
        </i>
      }
    </div>
  )
}

export default observer(LogInput)