import React from 'react'
import { observer } from 'mobx-react'
import {
  Filter,
  Selected,
  SelectAllVisible,
  DeselectAll
} from 'react-drag-select-table'

const PlayerSelectTableExtras = ({ store, actions, tableStore }) => {
  return (
    <div>
      <div className="row">
        <div className="large-6 medium-6 columns">
          <label htmlFor="filter">
            <strong>Filter Players:</strong>
          </label>
          <Filter store={ tableStore } id="filter" />
        </div>
        <div className="large-3 medium-3 columns">
          <strong>
            <span>Total: </span>
            <span>{ tableStore.all.length }</span>
          </strong>
        </div>
        <div className="large-3 medium-3 columns">
          <Selected label="Selected: " store={ tableStore } />
        </div>
      </div>
      <div className="row">
        <div className="large-6 medium-6 columns">
          <SelectAllVisible store={ tableStore } className="button expanded success">
            Select All Visible
          </SelectAllVisible>
        </div>
        <div className="large-6 medium-6 columns">
          <DeselectAll store={ tableStore } className="button expanded alert">
            Deselect All
          </DeselectAll>
        </div>
      </div>
    </div>
  )
}

export default observer(PlayerSelectTableExtras)