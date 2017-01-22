import React, { Component } from 'react'
import ReactModal from 'react-modal'
import ImportModal from './ImportModal'

class ImportButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  render () {
    const { store, actions } = this.props

    const handleOpenModal = () =>
      this.setState({ showModal: true })

    const handleCloseModal = () =>
      this.setState({ showModal: false })

    const overlay = {
      backgroundColor: 'rgba(0, 0, 0, 0.60)'
    }

    const content = {
      position               : 'absolute',
      top                    : '100px',
      left                   : '100px',
      right                  : '100px',
      bottom                 : '100px',
      border                 : '1px solid #ccc',
      background             : '#fff',
      overflow               : 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius           : '4px',
      outline                : 'none',
      padding                : '20px'
    }

    return (
      <span>
        <button
          className="button"
          onClick={ handleOpenModal }>
          Import
        </button>
        <ReactModal
          isOpen={ this.state.showModal }
          contentLabel="onRequestClose Example"
          onRequestClose={ handleCloseModal }
          style={{ overlay, content }}>
          <ImportModal
            store={ store }
            actions={ actions }/>
        </ReactModal>
      </span>
    )
  }
}

export default ImportButton