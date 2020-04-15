import { compose, map, sort, multiply, addIndex, prop } from 'ramda'

/* ---------- INTERNAL HELPERS ---------- */ 

const getSortNum = (sortTarget, reversed) => compose(
  multiply(reversed || -1),
  prop('sortWith', sortTarget)
)

/*--------------------------------------- */
/* ---------- EXTERNAL ACTIONS ---------- */

export const mapIndexed = addIndex(map)

export const asSorted = (reversed, sortTarget, rows) => sortTarget ?
  sort( getSortNum(sortTarget, reversed), rows ) :
  rows

// Unclean, Handle external operations here.
export const handleColumnHeaderClick = (
  column,
  sortTarget,
  setSortTarget,
  sortReversed,
  setSortReversed
) => () => {
  if (!column.sortWith) {
    return
  }
  if (column.key === sortTarget.key) {
    setSortReversed(!sortReversed)
  } else {
    setSortTarget(column)
  }
}