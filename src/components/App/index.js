import React, { useState } from 'react'
import Table from '../Table'
import api from '../../lib/api'
import { updateFrom } from './actions.js'
import './index.css'

export default () => {
  const [ nameChanges, setNameChanges ] = useState([])
  const [ projectChanges, setProjectsChanges ] = useState([])
  const [ namesLoading, setNamesLoading ] = useState(false)
  const [ projectsLoading, setProjectsLoading ] = useState(false)
  const [ nameErrors, setNameErrors ] = useState(null)
  const [ projectErrors, setProjectErrors ] = useState(null)

  return (
    <div className="App">
      <div className="table-title">
        Users:
      </div>
      <Table
        rows={nameChanges}
        columns={columnConfig}
        loading={namesLoading}
        errors={nameErrors}
        reload={updateFrom(
          api.getUsersDiff,
          setNameChanges,
          setNamesLoading,
          setNameErrors
        )}
      />
      <div className="table-title">
        Projects:
      </div>
      <Table
        rows={projectChanges}
        columns={columnConfig}
        loading={projectsLoading}
        errors={projectErrors}
        reload={updateFrom(
          api.getProjectsDiff,
          setProjectsChanges,
          setProjectsLoading,
          setProjectErrors
        )}
      />
    </div>
  )
}

const columnConfig = [
  {
    key: 'Date',
    property: 'timestamp',
    sortWith: (a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
  },
  {
    key: 'User ID',
    property: 'id'
  },
  {
    key: 'Old Value',
    property: 'oldValue'
  },
  {
    key: 'New Value',
    property: 'newValue'
  }
]
