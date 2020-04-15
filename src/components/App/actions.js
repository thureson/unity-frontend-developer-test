import { compose, map, path, pick } from 'ramda'

/* ---------- INTERNAL HELPERS ---------- */ 

const liftDiff = obj => ({
  ...obj,
  ...path(['diff', 0], obj)
})

const fromMsToDate = _ =>
  new Date(_).toISOString().split("T")[0]

const timeStampToDate = _ => ({
  ..._,
  ...{ timestamp: fromMsToDate(_.timestamp) }
})

const dropUnneeded = pick(
  ['id', 'timestamp', 'oldValue', 'newValue']
)

const formatData = compose(
  map(dropUnneeded),
  map(timeStampToDate),
  map(liftDiff),
  _ => _.data
)

/*--------------------------------------- */
/* ---------- EXTERNAL ACTIONS ---------- */

// Unclean, Handle external operations here.
export const updateFrom = (
  getFn,
  setValue,
  setLoading,
  setErrors
) => async () => {
  setErrors(null)
  setLoading(true)
  try {
    const result = await getFn();
    setValue(formatData(result))
  } catch (err) {
    setErrors('We had problems fetching your data. Please try again.')
  }
  setLoading(false)
}


