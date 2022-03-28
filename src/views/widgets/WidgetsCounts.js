/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { CWidgetStatsD, CCol } from '@coreui/react'
import emojesData from '../../core/data/emojesData'

const WidgetsCounts = (counts) => {
  try {
    const newData = emojesData.map((item, i) => Object.assign({}, item, counts.counts[i]))
    return (
      newData &&
      newData.map((item) => (
        <>
          <CCol sm={6} lg={4} key={item.id}>
            <CWidgetStatsD
              className="mb-4"
              icon={<img src={item.img} height={52} className="my-4 text-white" />}
              values={[
                { title: 'Today', value: item.item2 },
                { title: 'All', value: item.item3 },
              ]}
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
export default WidgetsCounts
