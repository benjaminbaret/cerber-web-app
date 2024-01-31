import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";


interface DDGroupProps {
    onGroupChange: (event: SelectChangeEvent<string>) => void;
}

const DDGroup: React.FC<DDGroupProps> = ({ onGroupChange }) => {

    const [group, setGroup] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setGroup(event.target.value);
        onGroupChange(event); // Appeler la fonction passée en prop avec l'événement

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

                // Extract unique groupeId values from the devicesData
                const uniqueGroupeIds = [...new Set(devicesData.map(device => device.groupeId))].filter(id => id !== null && id !== undefined);

                // Second query to get the names of groups based on the unique groupeId values
                const { data: groupsData, error: groupsError } = await supabase
                    .from('groups')
                    .select('*')
                    .in('id', uniqueGroupeIds);

                if (groupsError) {
                    console.error('Error fetching group names:', groupsError.message);
                    return;
                }
                setData(groupsData);
            } catch (error) {
                setError(error);
                //console.error('Erreur inattendue lors de la récupération des groupes :', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Box className="w-full" style={{ width: '100%' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">GROUP</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={group}
                    label="Group"
                    onChange={handleChange}
                >
                    {data?.map((groups) => (
                        <MenuItem key={groups.id} value={groups.id} >
                            {groups.name}
                        </MenuItem>
                    ))}
                    <MenuItem value="[No Group]">[no group]</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
export default DDGroup;