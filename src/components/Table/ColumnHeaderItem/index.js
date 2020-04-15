import React from 'react'
import { handleColumnHeaderClick } from '../actions.js'

const DownArrow = ({ reversed }) => (
  <div style={{
    display: 'inline-block',
    transform: `rotate(${ reversed ? '0deg' : '180deg' })`
  }}>
   ▾
 </div>
)

export default ({
  column,
  sortTarget,
  setSortTarget,
  sortReversed,
  setSortReversed
}) => (
  <td
    className="table-item"
    onClick={handleColumnHeaderClick(
      column,
      sortTarget,
      setSortTarget,
      sortReversed,
      setSortReversed
    )}>
    { column.key + ' ' }
    { column.key === sortTarget.key && (
      <DownArrow reversed={sortReversed} /> 
    )}
  </td>
)


