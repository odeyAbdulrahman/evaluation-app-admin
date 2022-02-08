/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { CWidgetStatsB, CCol } from '@coreui/react'
import getwidgetsCountsData from '../../core/data/widgetsCountsData'

const WidgetStats = (counts) => {
  const newData = getwidgetsCountsData().map((item, i) => Object.assign({}, item, counts.counts[i]))
  return (
    newData &&
    newData.map((item) => (
      <CCol xs={6} key={item.id}>
        <CWidgetStatsB
          className="mb-3"
          color="primary"
          inverse
          progress={{ value: item.item3 }}
          text="All RATINGS"
          title={item.title}
        />
      </CCol>
    ))
  )
}
export default WidgetStats
