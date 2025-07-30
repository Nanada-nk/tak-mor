import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingDatePicker({ selectedDate, onChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      minDate={new Date()}
      inline
      calendarClassName="custom-calendar-header"
    />
  );
}

export default BookingDatePicker;
