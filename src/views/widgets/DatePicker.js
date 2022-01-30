/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const WidgetsDatePicker = ({ startDate, setStartDate }) => {
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      className="form-control"
    />
  )
}
export default WidgetsDatePicker
