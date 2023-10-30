import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const CustomSelect = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    size: 'small',
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  const menuItems = Object.keys(options).map((item, pos) => (
    <MenuItem key={pos} value={item}>
      {options[item]}
    </MenuItem>
  ));

  if (menuItems.length === 0) {
    menuItems.push(
      <MenuItem key="no-data-option" value="">
        No Data
      </MenuItem>
    );
  } else {
    menuItems.unshift(
      <MenuItem key="select-option" value="">
        Select
      </MenuItem>
    );
  }

  return (
    <TextField
      {...configSelect}
      value={field.value || ''}
    >
      {menuItems}
    </TextField>
  );
};

export default CustomSelect;
