import React from 'react'

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Steam ID</th>
        <th>
          Names
          <i
            className="material-icons"
            title="mouse over each cell to see more names"
            style={{fontSize:'1.1em'}}>
            help_outline
          </i>
        </th>
        <th>Maps played</th>
      </tr>
    </thead>
  )
}

export default TableHead