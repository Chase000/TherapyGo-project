import React from 'react';
import { TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../colour';

const Input = (props) => {
  const { autoFocus, name, label, value, onChange, type, error = null, onClick } = props;
  let toggle = false;
  let errorMsg = null;
  if (error) {
    toggle = true;
    errorMsg = error;
  } else {
    toggle = false;
  }
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="outlined"
        size="small"
        margin="normal"
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onClick={onClick}
        error={toggle}
        helperText={errorMsg}
      />
    </ThemeProvider>
  );
};

export default Input;
