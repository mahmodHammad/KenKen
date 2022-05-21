import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({title,options,handleSelect,value}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    handleSelect(event.target.value);
  };

  return (
    <Box width="100%" >
      <FormControl fullWidth variant="filled">
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={value}
          onChange={handleChange}
        >
            {options.map(o=> <MenuItem key={o} value={o}>{o}</MenuItem>)} 
        </Select>
      </FormControl>
    </Box>
  );
}
