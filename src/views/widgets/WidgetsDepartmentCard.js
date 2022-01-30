/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { CWidgetStatsD, CCol } from '@coreui/react'
import getwidgetsCountsData from '../../core/data/widgetsCountsData'

const WidgetsDepartmentCard = (cardCounts) => {
  const newData = getwidgetsCountsData().map((item, i) => {
    return Object.assign({}, item, cardCounts.cardCounts[i])
  })
  return (
    newData &&
    newData.map((item) => (
      <>
        <CCol sm={2} key={item.id}>
          <CWidgetStatsD
            className="mb-4"
            icon={<img src={item.img} height={52} className="my-4 text-white" />}
            values={[{ title: 'Ratings', value: item.item2 }]}
            style={{
              '--cui-card-cap-bg': item.color,
            }}
          />
        </CCol>
      </>
    ))
  )
}
export default WidgetsDepartmentCard
