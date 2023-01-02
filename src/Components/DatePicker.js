import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function DatePicker(onChange, value) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

        <DesktopDatePicker
          label="Date of Birth"
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}