import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

function CustomAutocomplete({ id, label, options, value, onInputChange, onChange, fetchOptionsCallback }) {
  const [inputValue, setInputValue] = useState(value ? value.UhId : ''); // Initialize with UhId value if available

  useEffect(() => {
    if (inputValue !== '') { // Check if inputValue is not empty
      fetchOptionsCallback(inputValue); // Fetch options when inputValue changes
    }
  }, [inputValue, fetchOptionsCallback]);

  return (
    <Autocomplete
      id={id}
      options={options}
      getOptionLabel={(option) => option.UhId}
      value={value}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        onInputChange(newInputValue);
      }}
      onChange={(event, newValue) => {
        onChange(newValue);
        setInputValue(newValue ? newValue.UhId : ''); // Extract UhId property
      }}
      isOptionEqualToValue={(option, selectedValue) => option.UhId === selectedValue.UhId}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" fullWidth size='small' />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.UhId}>{option.UhId}</li>
      )}
    />
  );
}

export default CustomAutocomplete;
