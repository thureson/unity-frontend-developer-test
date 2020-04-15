import React, { useState } from 'react'
import './index.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import { map } from 'ramda'
import Row from './Row'
import ColumnHeaderItem from './ColumnHeaderItem'
import ErrorNotice from './ErrorNotice'
import { asSorted, mapIndexed } from './actions.js'

export default ({ reload, rows = [], columns = [], loading, defaultSortBy, errors }) => {
  const [ sortTarget, setSortTarget ] = useState(defaultSortBy || columns[0])
  const [ sortReversed, setSortReversed ] = useState(false)

  return (
    <div className="Table">
      <div className="table-container">
        <table className="table-element">
          <thead className="table-header">
            <tr className="table-row">
              { map(column => (
                <ColumnHeaderItem
                  key={column.key}
                  column={column}
                  sortTarget={sortTarget}
                  setSortTarget={setSortTarget}
                  sortReversed={sortReversed}
                  setSortReversed={setSortReversed} />
              ), columns)}
            </tr>
          </thead>
          <tbody className="table-body">
            { mapIndexed((row, index) => (
              <Row
                key={index}
                columns={columns}
                row={row} />
            ), asSorted(sortReversed, sortTarget, rows) )}
          </tbody>
        </table>
        <div className="table-footer" key={"table-footer"}>
          { errors && (
          <ErrorNotice errors={errors} /> )}
          { loading ?
          <CircularProgress style={{ color: '#2197f3' }} /> :
          <button
            className="table-button"
            onClick={reload}>
            {'Load more'}
          </button> }
        </div>
      </div>
    </div>
  )
}