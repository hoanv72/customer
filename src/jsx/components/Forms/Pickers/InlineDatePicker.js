import React, { useState } from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const dateFns = new DateFnsUtils();

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function InlineDatePicker(props) {
  const { name, value } = props.field;
  const { setFieldValue } = props.form;
  const [selectedDate, handleDateChange] = useState(value);

  const handleChange = (date) => {
    handleDateChange(date);
    if (date === null) {
      setFieldValue(name, '');
      return;
    }
    if (date !== null && isValidDate(date)) {
      setFieldValue(name, dateFns.format(new Date(date), 'yyyy-MM-dd'));
    }
  };

  const submitDate = () => {
    if (selectedDate === null) {
      setFieldValue(name, '');
      return;
    }
    if (isValidDate(selectedDate)) {
      setFieldValue(name, dateFns.format(new Date(selectedDate), 'yyyy-MM-dd'));
    }
  };

  // handle user press Enter key -> set datetime before submit the parent form
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setFieldValue(name, dateFns.format(new Date(selectedDate), 'yyyy-MM-dd'));
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        variant='inline'
        inputVariant='outlined'
        format='dd-MM-yyyy'
        value={selectedDate}
        InputAdornmentProps={{ position: 'start' }}
        className={`custom-datepicker ${props.className}`}
        disableFuture={true} // can't select future date
        onChange={(date) => handleChange(date)}
        onBlur={submitDate}
        onKeyPress={(e) => handleKeyPress(e)}
        onAccept={(date) => handleChange(date)}
      />
    </MuiPickersUtilsProvider>
  );
}

export default InlineDatePicker;
