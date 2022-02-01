/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import FilterComponent from 'src/core/utilities/utilitieFilterComponent'
const dataTableService = () => {
  //sort funcation
  const customSort = (rows, selector, direction) => {
    return rows.sort((a, b) => {
      const aField =
        selector === 'row => row.id' ? selector(a).toString() : selector(a).toString().toLowerCase()
      const bField =
        selector === 'row => row.id' ? selector(a).toString() : selector(b).toString().toLowerCase()

      let comparison = 0

      if (aField > bField) {
        comparison = 1
      } else if (aField < bField) {
        comparison = -1
      }

      return direction === 'desc' ? comparison * -1 : comparison
    })
  }
  //filter sub Header Component
  const subHeaderComponent = ({
    setResetPaginationToggle,
    setFilterText,
    filterText,
    resetPaginationToggle,
  }) => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }
  return { customSort, subHeaderComponent }
}
export default dataTableService
