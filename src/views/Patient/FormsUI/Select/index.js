import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const Select = ({ name, options, getOptionLabel, getOptionValue, onChangeCallback, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
    if (onChangeCallback) {
      onChangeCallback(value); // Call the callback with the selected value
    }
   
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    size: 'small', // Set the size to 'small' to make the text field smaller
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {options && options.length === 0 ? (
        <MenuItem value="">No data</MenuItem>
      ) : (
        <MenuItem value="">
          {name === 'title' ? 'Select Title' : name === 'PatientGender' ? 'Select Gender' : 'Select'}
        </MenuItem>
      )}
      {options && options.map((option) => (
        <MenuItem key={getOptionValue(option)} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;