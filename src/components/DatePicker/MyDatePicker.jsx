import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const MyDatePicker = ({ field, form: { touched, errors, setFieldValue, setFieldTouched }, ...props }) => {
  const onChange = value => {
    setFieldValue(field.name, value);
  };
  const onBlur = () => {
    setFieldTouched(field.name, true);
  };
  return (
    <>
      <DatePicker
        selected={field.value}
        onChange={onChange}
        onBlur={onBlur}
        minDate={new Date()}
        todayButton={'Today'}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="d MMMM yyyy, h:mm aa"
        timeIntervals={30}
        {...props}
      />
      {touched[field.name] && errors[field.name] && <div>{errors[field.name]}</div>}
    </>
  );
};

export default MyDatePicker;
