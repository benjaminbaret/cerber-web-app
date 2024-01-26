import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';

const DDUpdate= () => {
    const [update, setUpdate] = React.useState<string>('');
    
    const handleChange = (event: SelectChangeEvent<string>) => {
            setUpdate(event.target.value);
    };
    
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data, error } = await supabase.from('updates').select('*'); //Data en local

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
                            <InputLabel id="demo-simple-select-label">UPDATE</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={update}
                                label="Update"
                                onChange={handleChange}
                            >
                            {data?.map((update) => ( 
                            <MenuItem  key={update.id} value={update.name} >
                                {update.name}
                            </MenuItem>
                            ))} 
                            </Select>
                        </FormControl>
                    </Box>            
    );
};
export default DDUpdate;