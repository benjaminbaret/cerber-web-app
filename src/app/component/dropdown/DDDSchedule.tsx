import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DDScheduleProps {
    onScheduleChange: (event: SelectChangeEvent<string>) => void;
}

const DDSchedule : React.FC<DDScheduleProps> = ({ onScheduleChange }) => {

    const [schedule, setSchedule] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSchedule(event.target.value);
        onScheduleChange(event); // Appeler la fonction passée en prop avec l'événement
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
                    <MenuItem value={'Now'}>Now</MenuItem>
                    <MenuItem value={'In 1H'}>In 1H</MenuItem>
                    <MenuItem value={'In 2H'}>In 2H</MenuItem>
                    <MenuItem value={'Tomorow'}>Tomorow </MenuItem>
                    <MenuItem value={'In a week'}>In a week </MenuItem>

                </Select>
            </FormControl>
        </Box>
    );
}
export default DDSchedule;