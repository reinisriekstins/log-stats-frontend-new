import React from 'react'
import { observer } from 'mobx-react'
import Spinner from 'react-spin'

const LogInput = ({ actions, state }) => {
  const {
    updateInputVal,
    updateInputStatus
  } = actions
  const { status } = state

  const colors = {
    success: '#3adb76',
    warning: '#ffae00',
    alert: '#cc4b37',
    lightgrey: '#d3d3d3'
  }

  const iconStyle = {
    position: 'relative',
    top: '-51px',
    right: '-80%',
    color: colors.lightgrey
  }

  const spinConfig = {
    lines: 13,               // The number of lines to draw
    length: 28,              // The length of each line
    width: 14,               // The line thickness
    radius: 42,              // The radius of the inner circle
    scale: 0.18,             // Scales overall size of the spinner
    corners: 1,              // Corner roundness (0..1)
    color: colors.lightgrey, // #rgb or #rrggbb or array of colors
    opacity: 0.25,           // Opacity of the lines
    rotate: 0,               // The rotation offset
    direction: 1,            // 1: clockwise, -1: counterclockwise
    speed: 1,                // Rounds per second
    trail: 60,               // Afterglow percentage
    fps: 20,                 // Frames per second when using setTimeout() as a fallback for CSS
    zIndex: 2e9,             // The z-index (defaults to 2000000000)
    className: 'spinner',    // The CSS class to assign to the spinner
    top: '-35px',            // Top position relative to parent
    left: '85%',             // Left position relative to parent
    shadow: false,           // Whether to render a shadow
    hwaccel: false,          // Whether to use hardware acceleration
    position: 'relative',    // Element positioning
  }

  const inputStyles = {
    initial: {},
    pending: {},
    success: {
      boxShadow: `0 0 3px ${ colors.success }`,
      borderColor: colors.success
    },
    warning: {
      boxShadow: `0 0 3px ${ colors.warning }`,
      borderColor: colors.warning
    },
    alert: {
      boxShadow: `0 0 3px ${ colors.alert }`,
      borderColor: colors.alert
    }
  }

  const handleClick = e => {
    updateInputStatus(state, 'pending')

    // a hacky way to make mobx reemit
    // the input value
    const value = state.value
    updateInputVal(state, Math.random().toString())
    updateInputVal(state, value)
  }

  return (
    <div className='large-2 columns'>
      <input
        className='log-input'
        type='text'
        value={ state.value }
        onChange={ e => updateInputVal(state, e) }
        style={ inputStyles[status] }/>
      {
      (status === 'warning' || status === 'alert') &&
      <button
        style={ iconStyle }
        title='Retry'
        onClick={ handleClick } >
        <i
          className="material-icons"
          style={{fontSize:'2em'}}>
          refresh
        </i>
      </button>
      }
      {
      status === 'pending' &&
      <Spinner config={ spinConfig } />
      }
    </div>
  )
}

export default observer(LogInput)