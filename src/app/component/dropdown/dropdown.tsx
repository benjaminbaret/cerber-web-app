import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
    const [option, setOption] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setOption(event.target.value);
    };

    return (
        <Box style={{ width: '100%' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Option</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={option}
                    label="Option"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Option1</MenuItem>
                    <MenuItem value={20}>Option2</MenuItem>
                    <MenuItem value={30}>Option3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
