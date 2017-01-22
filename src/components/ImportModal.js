import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class DropzoneDemo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
      fileContent: ''
    }
  }

  render() {
    const { store, actions } = this.props

    const handleDrop = (acceptedFiles) => {
      this.setState({ files: acceptedFiles })

      const reader = new FileReader()

      reader.readAsText(acceptedFiles[0])
      reader.onload = () => this.setState({
        fileContent: reader.result
      })
    }

    const handleOpenClick = () =>
      this.dropzone.open()

    const dropzoneStyle = {
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 5,
      height: '100%'
    }

    const activeStyle = {
      borderStyle: 'solid',
      backgroundColor: '#eee'
    }

    const rejectStyle = {
      borderStyle: 'solid',
      backgroundColor: '#ffdddd'
    }

    const height = {
      height: '360px'
    }

    return (
      <div>
        <div className="row">
          <Dropzone
            ref={ node => this.dropzone = node }
            onDrop={ handleDrop }
            multiple={ false }
            accept="application/json"
            className="large-6 columns"
            style={ dropzoneStyle }
            activeStyle={ activeStyle }
            rejectStyle={ rejectStyle }>
            <div style={{ ...height }}>
              <h3>Drag And Drop Your File Here</h3>
            </div>
          </Dropzone>
          <div
            className="large-6 columns">
          {(() => {
            if ( this.state.fileContent ) {
              return (
                <div>
                  <h3>Uploaded file:</h3>
                  <div style={{ overflow: 'scroll', ...height }}>
                    <pre>
                    { JSON.parse(JSON.stringify(this.state.fileContent, undefined, 2)) }
                    </pre>
                  </div>
                </div>
              )
            }
          })()}
          </div>
        </div>
        <div
          className="row"
          style={{ position: 'absolute', bottom: 0, width: '95%' }}>
          <div className="large-3 columns">
            <button
              type="button"
              className="button expanded"
              onClick={ handleOpenClick }>
              Choose File
            </button>
          </div>
          <div className="large-3 columns">
            <button
              type="button"
              className="button expanded">
              Import
            </button>
          </div>
          <div className="large-3 columns">
            <button
              type="button"
              className="button expanded">
              Add
            </button>
          </div>
          <div className="large-3 columns">
            <button
              type="button"
              className="button expanded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DropzoneDemo