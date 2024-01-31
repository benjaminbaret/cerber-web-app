import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { cp } from 'fs';

interface DDDeviceProps {
    onDeviceChange: (event: SelectChangeEvent<string>) => void;
}

const DDDevice: React.FC<DDDeviceProps> = ({ onDeviceChange }) => {
    
    const [device, setDevice] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setDevice(event.target.value);
        onDeviceChange(event); // Appeler la fonction passée en prop avec l'événement
    };

    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const userIdString = Cookies.get('userIdCerberUpdate')?.toString();
                const userId = parseInt(userIdString as string, 10);

                const { data: devicesData, error: devicesError } = await supabase
                    .from('devices')
                    .select('*')
                    .eq('userId', userId);


                if (devicesError) {
                    console.error('Error fetching groupeId values:', devicesError.message);
                    return;
                }
                console.log('Devices Data:', devicesData);
                setData(devicesData);
            } catch (error) {
                setError(error);
                //console.error('Erreur inattendue lors de la récupération des groupes :', error);
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
                            <MenuItem  key={device.id} value= {device.id}>
                                {device.name}
                            </MenuItem>
                            ))} 
                            </Select>
                        </FormControl>
                    </Box>            
    );
};

export default DDDevice;