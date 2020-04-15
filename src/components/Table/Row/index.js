import React from 'react'
import { map } from 'ramda'

export default ({ columns, row }) => (
  <tr className="table-row">
    { map((column) => (
      <td className="table-item" key={column.property}>
        { row[column.property] }
      </td>
    ), columns)}
  </tr>
)
