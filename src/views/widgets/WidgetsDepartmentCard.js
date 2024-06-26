/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { CWidgetStatsD, CCol } from '@coreui/react'
import emojesData from '../../core/data/emojesData'

const WidgetsDepartmentCard = (cardCounts) => {
  try {
    const newData = emojesData.map((item, i) => {
      return Object.assign({}, item, cardCounts.cardCounts[i])
    })
    return (
      newData &&
      newData.map((item) => (
        <>
          <CCol sm={3} key={item.id}>
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
  } catch {
    return ''
  }
}
export default WidgetsDepartmentCard
