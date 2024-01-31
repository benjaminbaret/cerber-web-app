import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import supabase from '../../connexionDatabase/connectToDatabase';
import Cookies from 'js-cookie';

const DisplayContent = () => {
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    const fetchData = async () => {
        try {
            // Fetch devices
            const userIdString = Cookies.get('userIdCerberUpdate')?.toString();
            const userId = parseInt(userIdString as string, 10);

            const { data: devicesData, error: devicesError } = await supabase
                .from('devices')
                .select('*')
                .eq('userId', userId);

            if (devicesError) {
                console.error('Error fetching devices:', devicesError.message);
                return;
            }

            // Fetch groups
            const { data: groupsData, error: groupsError } = await supabase
                .from('groups')
                .select('*');

            if (groupsError) {
                console.error('Error fetching groups:', groupsError.message);
                return;
            }

            // Combine the results based on the common column (devices.groupeId = groups.id)
            const combinedData = devicesData.map(device => ({
                device_name: device.name,
                device_id: device.id,
                device_status: device.deviceStatus,
                device_type: device.type,
                group_column: groupsData.find(group => group.id === device.groupeId)?.name,
                device_update: device.updatedAt,
            }));

            setData(combinedData);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err.message);
        }
    };

    const check = () => {
        const inputElement = document.getElementById('selectAll') as HTMLInputElement;
        if (inputElement) {
            inputElement.checked = false;
        }
    };

    const processUpdate = (updatedAt: string, status: string) => {
        const now = new Date();
        const updatedTimeDate = new Date(updatedAt);
        const timeDifference = now.getTime() - updatedTimeDate.getTime();

        if (status === "pending") {
            return <CircleIcon fontSize="small" className="h-6" style={{ color: 'grey' }} />;
        } else if (status === "online" && timeDifference < 6000) {
            return <CircleIcon fontSize="small" className="h-6" style={{ color: 'green' }} />;
        } else {
            return <CircleIcon fontSize="small" className="h-6" style={{ color: 'red' }} />;
        }
    };

    useEffect(() => {
        // Appeler fetchData immédiatement
        fetchData();

        // Mettre en place une boucle avec setInterval pour appeler fetchData toutes les 100ms
        const intervalId = setInterval(() => {
            fetchData();
        }, 50);

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => {
            clearInterval(intervalId);
        };

    }, []);


    return (
        <tbody>
            {data?.map((device) => (
                <tr className="relative" key={device.device_id}>
                    <td className="text-center w-1/7">
                        <input type="checkbox" onChange={check} id={"select" + device.device_id} name={"select" + device.device_id} />
                    </td>
                    <td id={"Status" + device.id} className="pb-3 pt-3 flex items-center justify-center text-center w-1/7">
                        {processUpdate(device.device_update, device.device_status)}
                    </td>
                    <td className="text-center w-1/7">
                        {device.device_name}
                    </td>
                    <td className="text-center w-1/7">
                        {device.device_type}
                    </td>
                    <td className="text-center w-1/7">
                        {device.group_column || "/"}
                    </td>
                    <td className="text-center w-1/7">
                        Original
                    </td>
                    <td className="text-center w-1/7">
                        {device.device_update}
                    </td>
                    <style jsx>{`
              tr::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                background-color: #e2e8f0;
                opacity: 0.28;
              }
            `}</style>
                </tr>
            ))}
        </tbody>
    );
};

export default DisplayContent;
