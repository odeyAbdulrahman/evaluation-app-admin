/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { CWidgetStatsB, CCol } from '@coreui/react'
import emojesData from '../../core/data/emojesData'

const WidgetStats = (counts) => {
  try {
    const newData = emojesData.map((item, i) => Object.assign({}, item, counts.counts[i]))
    return (
      newData &&
      newData.map((item) => (
        <CCol lg={4} xs={12} key={item.id}>
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
  } catch {
    return ''
  }
}
export default WidgetStats
