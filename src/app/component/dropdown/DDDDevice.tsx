import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';

const DDDevice = () => {
    const [device, setDevice] = React.useState<string>('');
    
    const handleChange = (event: SelectChangeEvent<string>) => {
            setDevice(event.target.value);
    };
    
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data, error } = await supabase.from('devices').select('*'); //Data en local

                setData(data);
            
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    if (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return null;
    }


    return (
                <Box className="w-full" style={{ width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">DEVICE</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={device}
                                label="Device"
                                onChange={handleChange}
                            >
                            {data?.map((device) => ( 
                            <MenuItem  key={device.id} value={device.name} >
                                {device.name}
                            </MenuItem>
                            ))} 
                            </Select>
                        </FormControl>
                    </Box>            
    );
};

export default DDDevice;