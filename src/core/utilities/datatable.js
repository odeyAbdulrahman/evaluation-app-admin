import React from 'react'
import DataTable from 'react-data-table-component'

const utilDataTable = ({ columns, data, pending }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      selectableRows
      pagination
      progressPending={pending}
      highlightOnHover
      pointerOnHover
    />
  )
}
export default utilDataTable
