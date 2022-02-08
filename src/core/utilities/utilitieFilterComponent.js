/* eslint-disable react/prop-types */
import React from 'react'
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="text"
      className="search-input"
      placeholder="Filter By"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button type="button" className="search-btn" onClick={onClear}>
      X
    </button>
  </>
)
export default FilterComponent
