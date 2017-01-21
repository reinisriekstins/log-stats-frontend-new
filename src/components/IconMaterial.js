import React from 'react'

const IconMaterial = props => {
  const {
    className = '',
    children,
    ...rest
  } = props

  return (
    <i className={ "material-icons" + className } {...rest} >
      { children }
    </i>
  )
}

export default IconMaterial