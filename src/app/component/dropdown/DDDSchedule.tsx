import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const DDSchedule = () => {
    const [schedule, setSchedule] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSchedule(event.target.value);
    };

    return (
        <Box style={{ width: '100%' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">SCHEDULE</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={schedule}
                    label="Schedule"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Now</MenuItem>
                    <MenuItem value={2}>In 1H</MenuItem>
                    <MenuItem value={3}>In 2H</MenuItem>
                    <MenuItem value={4}>Tomorow </MenuItem>
                    <MenuItem value={5}>In a week </MenuItem>

                </Select>
            </FormControl>
        </Box>
    );
}
export default DDSchedule;